import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/openai';
import { getUserProfile, checkDailyLimit, incrementUsage, saveAIChatMessage } from '@/lib/supabase';
import { AIChatMessage } from '@/types/ai';
import { AI_LIMITS } from '@/types/ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, userId, conversationHistory } = body as {
      message: string;
      userId: string;
      conversationHistory?: AIChatMessage[];
    };

    if (!message || !userId) {
      return NextResponse.json(
        { error: 'Message and user ID are required' },
        { status: 400 }
      );
    }

    // Check if OpenAI is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI chat service not configured' },
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

    // AI Chat is VIP-only feature
    if (subscriptionTier !== 'vip') {
      return NextResponse.json(
        {
          error: 'AI Chat is a VIP-only feature',
          upgradeRequired: true,
          tier: 'vip',
        },
        { status: 403 }
      );
    }

    // Check daily limit (100 messages/day for VIP)
    const todayUsage = await checkDailyLimit(userId, 'chat');
    const limit = AI_LIMITS.chat.vip;

    if (todayUsage >= limit) {
      return NextResponse.json(
        {
          error: `Daily chat limit reached (${limit} messages/day)`,
          limit,
          used: todayUsage,
        },
        { status: 429 }
      );
    }

    // Generate AI response
    const history = conversationHistory || [];
    const response = await generateChatResponse(message, history);

    // Save chat message to database
    await saveAIChatMessage(userId, message, response);

    // Increment usage counter
    await incrementUsage(userId, 'chat');

    const newUsage = await checkDailyLimit(userId, 'chat');

    return NextResponse.json({
      response,
      remainingToday: limit - newUsage,
      used: newUsage,
      limit,
    });
  } catch (error) {
    console.error('Error in AI chat endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to generate chat response' },
      { status: 500 }
    );
  }
}
