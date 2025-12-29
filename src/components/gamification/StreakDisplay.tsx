import React from 'react';
import { Streak } from '@/types/gamification';

interface StreakDisplayProps {
  streak: Streak;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ streak }) => {
  const fireIcons = '🔥'.repeat(Math.min(streak.current, 10));
  const progressPercentage = Math.min((streak.current / streak.best) * 100, 100);

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Current Streak</h3>
          <div className="text-4xl font-bold">
            {fireIcons} {streak.current}
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-90">Best Streak</p>
          <p className="text-2xl font-bold">🏆 {streak.best}</p>
        </div>
      </div>

      {/* Progress Bar */}
      {streak.best > 0 && (
        <div className="w-full bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
          <div
            className="bg-white h-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}

      <p className="text-sm opacity-90 mt-3">
        {streak.current === 0 ? 'Make a correct prediction to start your streak!' : 'Keep it up! 🔥'}
      </p>
    </div>
  );
};
