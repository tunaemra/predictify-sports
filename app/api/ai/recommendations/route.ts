import { NextRequest, NextResponse } from 'next/server';
import { analyzeUserPatterns } from '@/lib/openai';
import { getUserProfile, supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get user profile and check subscription tier
    const userProfile = await getUserProfile(userId);
    if (!userProfile) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const subscriptionTier = userProfile.subscription_tier;

    // Personalized recommendations are VIP-only
    if (subscriptionTier !== 'vip') {
      return NextResponse.json(
        {
          error: 'Personalized recommendations are a VIP-only feature',
          upgradeRequired: true,
          tier: 'vip',
        },
        { status: 403 }
      );
    }

    // Fetch user's past predictions (last 50)
    const { data: pastPredictions, error } = await supabase
      .from('predictions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching past predictions:', error);
      return NextResponse.json(
        { error: 'Failed to fetch user predictions' },
        { status: 500 }
      );
    }

    if (!pastPredictions || pastPredictions.length === 0) {
      return NextResponse.json({
        recommendations: [],
        message: 'Not enough prediction history for personalized recommendations',
        userStats: {
          bestLeague: 'N/A',
          bestBetType: 'N/A',
          avgAccuracy: 0,
        },
      });
    }

    // Analyze user patterns with AI
    const userPattern = await analyzeUserPatterns(pastPredictions) as { userStats?: { bestLeague: string; bestBetType: string; avgAccuracy: number } };

    // Get personalized recommendations from database
    const { data: recommendations } = await supabase
      .from('personalized_recommendations')
      .select('*')
      .eq('user_id', userId)
      .eq('shown', false)
      .order('created_at', { ascending: false })
      .limit(10);

    return NextResponse.json({
      recommendations: recommendations || [],
      userStats: userPattern?.userStats || {
        bestLeague: 'N/A',
        bestBetType: 'N/A',
        avgAccuracy: 0,
      },
      pattern: userPattern,
    });
  } catch (error) {
    console.error('Error in recommendations endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
