// Gamification Types

export interface UserLevel {
  userId: string;
  level: number; // 1-100
  xp: number; // Experience points
  xpToNextLevel: number;
  title: string; // "Çaylak", "Uzman", "Master", "Legend"
}

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: AchievementRarity;
  xpReward: number;
  condition: {
    type: string;
    value: number;
  };
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  unlockedAt: string;
}

export type LeaderboardPeriod = 'daily' | 'weekly' | 'monthly' | 'all-time';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  score: number;
  accuracyRate: number;
  totalPredictions: number;
  badges: string[];
}

export interface Leaderboard {
  period: LeaderboardPeriod;
  rankings: LeaderboardEntry[];
}

export interface Streak {
  userId: string;
  current: number; // Current streak
  best: number; // Best streak
  lastPredictionDate: string;
}

export interface WeeklyChallenge {
  id: string;
  weekNumber: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  prize: {
    first: string; // "1 ay VIP ücretsiz"
    second: string; // "2 hafta Pro"
    third: string; // "1 hafta Pro"
  };
  participants: number;
  leaderboard: Leaderboard;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  progress: number;
  target: number;
  completed: boolean;
}

// XP Award Types
export const XP_AWARDS = {
  PREDICTION_MADE: 10,
  CORRECT_PREDICTION: 50,
  STREAK_3: 100,
  DAILY_LOGIN: 5,
  PROFILE_COMPLETE: 25,
  FIRST_VIP: 500,
  FRIEND_INVITE: 75,
} as const;

// Level Titles
export const LEVEL_TITLES = {
  BEGINNER: { min: 1, max: 10, title: '🌱 Çaylak' },
  PREDICTOR: { min: 11, max: 25, title: '⚽ Tahminci' },
  EXPERT: { min: 26, max: 50, title: '🎯 Uzman' },
  MASTER: { min: 51, max: 75, title: '🏆 Master' },
  LEGEND: { min: 76, max: 99, title: '👑 Legend' },
  GRANDMASTER: { min: 100, max: 100, title: '💎 Grandmaster' },
} as const;

// Calculate XP needed for next level
export function calculateXPForLevel(level: number): number {
  // Formula: 100 * level^1.5
  return Math.floor(100 * Math.pow(level, 1.5));
}

// Get title for level
export function getTitleForLevel(level: number): string {
  for (const [_, config] of Object.entries(LEVEL_TITLES)) {
    if (level >= config.min && level <= config.max) {
      return config.title;
    }
  }
  return LEVEL_TITLES.BEGINNER.title;
}
