import React from 'react';
import { UserLevel } from '@/types/gamification';

interface LevelDisplayProps {
  userLevel: UserLevel;
}

export const LevelDisplay: React.FC<LevelDisplayProps> = ({ userLevel }) => {
  const progressPercentage = (userLevel.xp / (userLevel.xp + userLevel.xpToNextLevel)) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Level {userLevel.level}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {userLevel.title}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">XP</p>
          <p className="text-xl font-bold text-blue-600">
            {userLevel.xp} / {userLevel.xp + userLevel.xpToNextLevel}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {userLevel.xpToNextLevel} XP to next level
      </p>
    </div>
  );
};
