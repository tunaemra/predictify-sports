import { NextRequest, NextResponse } from 'next/server';
import { gamificationService } from '@/services/gamification.service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') as 'daily' | 'weekly' | 'monthly' | 'all-time' || 'all-time';
    const limit = parseInt(searchParams.get('limit') || '100');

    const leaderboard = await gamificationService.getLeaderboard(period, limit);
    return NextResponse.json(leaderboard);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
