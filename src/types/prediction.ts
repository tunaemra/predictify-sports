// Core Prediction Types

export type PredictionType = 'match_result' | 'over_under' | 'both_teams_score' | 'correct_score';

export interface Prediction {
  id: string;
  userId: string;
  matchId: string;
  predictionType: PredictionType;
  predictedValue: string;
  odds: number;
  confidence: number; // 0-100
  status: 'pending' | 'correct' | 'incorrect';
  createdAt: string;
  resolvedAt?: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  startTime: string;
  homeScore?: number;
  awayScore?: number;
  status: 'scheduled' | 'live' | 'finished';
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: string;
  subscription?: 'free' | 'pro' | 'vip';
}
