import React from 'react';
import { LeaderboardEntry, LeaderboardPeriod } from '@/types/gamification';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  period: LeaderboardPeriod;
  onPeriodChange: (period: LeaderboardPeriod) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  entries,
  period,
  onPeriodChange,
}) => {
  const periods: { value: LeaderboardPeriod; label: string }[] = [
    { value: 'daily', label: '📊 Daily' },
    { value: 'weekly', label: '📅 Weekly' },
    { value: 'monthly', label: '🗓️ Monthly' },
    { value: 'all-time', label: '🏆 All Time' },
  ];

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Period Selector */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => onPeriodChange(p.value)}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              period === p.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Leaderboard Entries */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {entries.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No entries yet. Be the first!
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.userId}
              className={`p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                entry.rank <= 3 ? 'bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20' : ''
              }`}
            >
              <div className="flex items-center space-x-4 flex-1">
                {/* Rank */}
                <div className="text-2xl font-bold w-16 text-center">
                  {getMedalEmoji(entry.rank)}
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {entry.avatar ? (
                    <img src={entry.avatar} alt={entry.username} className="w-12 h-12 rounded-full" />
                  ) : (
                    entry.username.charAt(0).toUpperCase()
                  )}
                </div>

                {/* Username & Stats */}
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 dark:text-white">
                    {entry.username}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>📊 {entry.totalPredictions} predictions</span>
                    <span>✅ {entry.accuracyRate.toFixed(1)}% accuracy</span>
                  </div>
                </div>
              </div>

              {/* Score */}
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {entry.score.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">points</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
