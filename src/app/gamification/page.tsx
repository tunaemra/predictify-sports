'use client';

import { useState } from 'react';
import { LevelDisplay } from '@/components/gamification/LevelDisplay';
import { AchievementsGrid } from '@/components/gamification/AchievementBadge';
import { StreakDisplay } from '@/components/gamification/StreakDisplay';
import { Leaderboard } from '@/components/gamification/Leaderboard';
import { UserLevel, Achievement, Streak, LeaderboardPeriod, LeaderboardEntry } from '@/types/gamification';

// Mock data for demonstration
const mockUserLevel: UserLevel = {
  userId: 'demo-user',
  level: 42,
  xp: 15000,
  xpToNextLevel: 12800,
  title: '🎯 Uzman',
};

const mockAchievements: Array<Achievement & { unlocked: boolean; unlockedAt?: string }> = [
  {
    id: '1',
    name: 'İlk Adım',
    description: 'İlk tahmini yap',
    icon: '🎪',
    rarity: 'common',
    xpReward: 25,
    condition: { type: 'predictions_made', value: 1 },
    unlocked: true,
    unlockedAt: '2024-12-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Ateş Topu',
    description: '5 üst üste doğru',
    icon: '🔥',
    rarity: 'rare',
    xpReward: 100,
    condition: { type: 'streak', value: 5 },
    unlocked: true,
    unlockedAt: '2024-12-15T14:30:00Z',
  },
  {
    id: '3',
    name: 'Şimşek',
    description: '10 üst üste doğru',
    icon: '⚡',
    rarity: 'epic',
    xpReward: 500,
    condition: { type: 'streak', value: 10 },
    unlocked: false,
  },
  {
    id: '4',
    name: 'Yıldız',
    description: 'Aylık %80+ doğruluk',
    icon: '🌟',
    rarity: 'epic',
    xpReward: 300,
    condition: { type: 'monthly_accuracy', value: 80 },
    unlocked: true,
    unlockedAt: '2024-12-20T09:00:00Z',
  },
  {
    id: '5',
    name: 'Altın Tahmin',
    description: '100 doğru tahmin',
    icon: '🏆',
    rarity: 'rare',
    xpReward: 250,
    condition: { type: 'correct_predictions', value: 100 },
    unlocked: false,
  },
  {
    id: '6',
    name: 'Mükemmeliyetçi',
    description: '%90+ doğruluk (min 50 tahmin)',
    icon: '💯',
    rarity: 'legendary',
    xpReward: 1000,
    condition: { type: 'accuracy_with_min', value: 90 },
    unlocked: false,
  },
  {
    id: '7',
    name: 'Sadık Kullanıcı',
    description: '7 gün üst üste giriş',
    icon: '📅',
    rarity: 'common',
    xpReward: 100,
    condition: { type: 'login_streak', value: 7 },
    unlocked: true,
    unlockedAt: '2024-12-10T08:00:00Z',
  },
  {
    id: '8',
    name: 'VIP Üye',
    description: 'VIP üyelik satın al',
    icon: '💎',
    rarity: 'rare',
    xpReward: 500,
    condition: { type: 'subscription', value: 3 },
    unlocked: false,
  },
];

const mockStreak: Streak = {
  userId: 'demo-user',
  current: 7,
  best: 12,
  lastPredictionDate: '2024-12-29',
};

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: '1',
    username: 'futbol_king',
    avatar: '',
    score: 15420,
    accuracyRate: 87.5,
    totalPredictions: 342,
    badges: ['🏆', '💎', '⚡'],
  },
  {
    rank: 2,
    userId: '2',
    username: 'tahmin_uzmani',
    avatar: '',
    score: 14850,
    accuracyRate: 85.2,
    totalPredictions: 298,
    badges: ['🏆', '🔥'],
  },
  {
    rank: 3,
    userId: '3',
    username: 'prediction_master',
    avatar: '',
    score: 13990,
    accuracyRate: 83.1,
    totalPredictions: 275,
    badges: ['🎯', '🔥'],
  },
  {
    rank: 4,
    userId: '4',
    username: 'sports_guru',
    avatar: '',
    score: 12750,
    accuracyRate: 81.4,
    totalPredictions: 256,
    badges: ['🎯'],
  },
  {
    rank: 5,
    userId: '5',
    username: 'data_scientist',
    avatar: '',
    score: 11200,
    accuracyRate: 79.8,
    totalPredictions: 234,
    badges: ['📊'],
  },
];

export default function GamificationDemo() {
  const [leaderboardPeriod, setLeaderboardPeriod] = useState<LeaderboardPeriod>('all-time');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🎮 Gamification Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Interactive demo of the gamification system components
          </p>
        </div>

        {/* Level & Streak Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LevelDisplay userLevel={mockUserLevel} />
          <StreakDisplay streak={mockStreak} />
        </div>

        {/* Achievements Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            🏆 Achievements
          </h2>
          <AchievementsGrid achievements={mockAchievements} />
        </div>

        {/* Leaderboard Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📊 Leaderboard
          </h2>
          <Leaderboard
            entries={mockLeaderboard}
            period={leaderboardPeriod}
            onPeriodChange={setLeaderboardPeriod}
          />
        </div>

        {/* Info Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ℹ️ About This Demo
          </h2>
          <div className="text-gray-600 dark:text-gray-300 space-y-4">
            <p>
              This page demonstrates the gamification components built for Predictify Sports.
              All data shown here is mock data for demonstration purposes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  Features Implemented:
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>User Level & XP System</li>
                  <li>Achievement Badges with Rarity</li>
                  <li>Streak Tracking</li>
                  <li>Multi-Period Leaderboards</li>
                  <li>Responsive Design</li>
                  <li>Dark Mode Support</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  Technical Stack:
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Next.js 14 + TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Supabase Backend</li>
                  <li>RESTful API Routes</li>
                  <li>Service Layer Architecture</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm">
                <strong>💡 Tip:</strong> To use these components with real data, connect them to the 
                API endpoints at <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                /api/gamification/*</code> and pass actual user data.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
