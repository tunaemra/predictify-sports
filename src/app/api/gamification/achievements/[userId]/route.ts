import { NextRequest, NextResponse } from 'next/server';
import { gamificationService } from '@/services/gamification.service';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const achievements = await gamificationService.getUserAchievements(params.userId);
    return NextResponse.json(achievements);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch achievements' },
      { status: 500 }
    );
  }
}
