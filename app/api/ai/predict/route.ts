import { NextRequest, NextResponse } from 'next/server';
import { generateMatchPrediction } from '@/lib/openai';
import { getUserProfile, checkDailyLimit, incrementUsage, saveAIPrediction, getAIPrediction } from '@/lib/supabase';
import { MatchData } from '@/types/ai';
import { AI_LIMITS } from '@/types/ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { matchData, userId } = body as { matchData: MatchData; userId: string };

    if (!matchData || !userId) {
      return NextResponse.json(
        { error: 'Match data and user ID are required' },
        { status: 400 }
      );
    }

    // Check if OpenAI is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 503 }
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

    // Check if user has access to AI predictions
    if (subscriptionTier === 'free') {
      return NextResponse.json(
        { 
          error: 'AI predictions require Pro or VIP subscription',
          upgradeRequired: true,
          tier: 'pro'
        },
        { status: 403 }
      );
    }

    // Check daily limit for Pro users
    let todayUsage = 0;
    if (subscriptionTier === 'pro') {
      todayUsage = await checkDailyLimit(userId, 'predictions');
      const limit = AI_LIMITS.predictions.pro;
      
      if (todayUsage >= limit) {
        return NextResponse.json(
          { 
            error: `Daily prediction limit reached (${limit} predictions/day)`,
            upgradeRequired: true,
            tier: 'vip'
          },
          { status: 429 }
        );
      }
    }

    // Check if we have a recent prediction for this match (cache for 1 hour)
    const existingPrediction = await getAIPrediction(matchData.matchId);
    if (existingPrediction) {
      const predictionAge = Date.now() - new Date(existingPrediction.created_at).getTime();
      const oneHour = 60 * 60 * 1000;
      
      if (predictionAge < oneHour) {
        return NextResponse.json({
          prediction: existingPrediction.prediction_data,
          cached: true,
        });
      }
    }

    // Generate AI prediction
    const prediction = await generateMatchPrediction(matchData);

    // Save prediction to database
    await saveAIPrediction(matchData.matchId, prediction);

    // Increment usage counter
    await incrementUsage(userId, 'predictions');

    // Calculate remaining predictions
    const newUsage = todayUsage + 1;
    const limit = subscriptionTier === 'vip' ? AI_LIMITS.predictions.vip : AI_LIMITS.predictions.pro;
    const remaining = limit - newUsage;

    return NextResponse.json({
      prediction,
      cached: false,
      remainingToday: subscriptionTier === 'vip' ? 'unlimited' : remaining,
    });
  } catch (error) {
    console.error('Error in AI prediction endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to generate prediction' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const matchId = searchParams.get('matchId');

    if (!matchId) {
      return NextResponse.json(
        { error: 'Match ID is required' },
        { status: 400 }
      );
    }

    const prediction = await getAIPrediction(matchId);

    if (!prediction) {
      return NextResponse.json(
        { error: 'No prediction found for this match' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      prediction: prediction.prediction_data,
      createdAt: prediction.created_at,
    });
  } catch (error) {
    console.error('Error fetching AI prediction:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prediction' },
      { status: 500 }
    );
  }
}
