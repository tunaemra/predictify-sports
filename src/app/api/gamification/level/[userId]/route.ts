import { NextRequest, NextResponse } from 'next/server';
import { gamificationService } from '@/services/gamification.service';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userLevel = await gamificationService.getUserLevel(params.userId);
    
    if (!userLevel) {
      return NextResponse.json(
        { error: 'User level not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(userLevel);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user level' },
      { status: 500 }
    );
  }
}
