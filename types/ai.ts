// AI Prediction Types
export interface AIPrediction {
  matchId: string;
  predictedOutcome: '1' | 'X' | '2'; // Ev sahibi/Beraberlik/Deplasman
  confidence: number; // 0-100 güven skoru
  winProbabilities: {
    home: number;
    draw: number;
    away: number;
  };
  recommendations: {
    type: 'result' | 'over_under' | 'btts';
    value: string;
    confidence: number;
    reasoning: string;
  }[];
  analysis: {
    strengths: string[]; // Güçlü yönler
    weaknesses: string[]; // Zayıf yönler
    keyFactors: string[]; // Kilit faktörler
  };
  reasoning: string; // Detaylı açıklama (Türkçe)
  riskLevel: 'low' | 'medium' | 'high';
  updatedAt: string;
}

// Match Data for AI Analysis
export interface MatchData {
  matchId: string;
  homeTeam: {
    name: string;
    form: string; // e.g., "WWDLW"
    homeStats: {
      played: number;
      won: number;
      drawn: number;
      lost: number;
      goalsFor: number;
      goalsAgainst: number;
    };
    avgGoals: {
      scored: number;
      conceded: number;
    };
  };
  awayTeam: {
    name: string;
    form: string;
    awayStats: {
      played: number;
      won: number;
      drawn: number;
      lost: number;
      goalsFor: number;
      goalsAgainst: number;
    };
    avgGoals: {
      scored: number;
      conceded: number;
    };
  };
  h2h: {
    homeWins: number;
    draws: number;
    awayWins: number;
    lastMatches: string[]; // Recent results
  };
  league: string;
  matchDate: string;
}

// Personalized Recommendation
export interface PersonalizedRecommendation {
  userId: string;
  recommendations: {
    matchId: string;
    reason: string; // "Normalde Serie A'da %78 başarılısın"
    similarPastPredictions: string[]; // Benzer geçmiş tahminler
    expectedAccuracy: number;
  }[];
  userStats: {
    bestLeague: string;
    bestBetType: string;
    avgAccuracy: number;
  };
}

// AI Chat Message
export interface AIChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Subscription Tier
export type SubscriptionTier = 'free' | 'pro' | 'vip';

// User Profile
export interface UserProfile {
  id: string;
  subscription_tier: SubscriptionTier;
  created_at: string;
}

// AI Usage Limits
export interface AIUsageLimits {
  predictions: {
    free: number;
    pro: number;
    vip: number; // Use large number instead of 'unlimited'
  };
  chat: {
    free: number;
    pro: number;
    vip: number;
  };
}

export const AI_LIMITS: AIUsageLimits = {
  predictions: {
    free: 0,
    pro: 10,
    vip: 999999, // Effectively unlimited
  },
  chat: {
    free: 0,
    pro: 0,
    vip: 100,
  },
};
