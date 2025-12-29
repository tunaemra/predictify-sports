import React from 'react';
import { Achievement } from '@/types/gamification';

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
  unlockedAt?: string;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  unlocked,
  unlockedAt,
}) => {
  const rarityColors = {
    common: 'bg-gray-400',
    rare: 'bg-blue-500',
    epic: 'bg-purple-600',
    legendary: 'bg-yellow-500',
  };

  const rarityBorderColors = {
    common: 'border-gray-400',
    rare: 'border-blue-500',
    epic: 'border-purple-600',
    legendary: 'border-yellow-500',
  };

  return (
    <div
      className={`relative p-4 rounded-lg border-2 ${rarityBorderColors[achievement.rarity]} ${
        unlocked ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-900 opacity-50'
      } transition-all hover:scale-105`}
    >
      {/* Rarity Badge */}
      <div className={`absolute top-2 right-2 ${rarityColors[achievement.rarity]} text-white text-xs px-2 py-1 rounded`}>
        {achievement.rarity.toUpperCase()}
      </div>

      {/* Icon */}
      <div className="text-4xl mb-2 text-center">
        {achievement.icon}
      </div>

      {/* Name */}
      <h3 className="font-bold text-center text-gray-800 dark:text-white mb-1">
        {achievement.name}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-2">
        {achievement.description}
      </p>

      {/* XP Reward */}
      <div className="text-center">
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
          +{achievement.xpReward} XP
        </span>
      </div>

      {/* Unlocked Date */}
      {unlocked && unlockedAt && (
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          Unlocked {new Date(unlockedAt).toLocaleDateString()}
        </p>
      )}

      {/* Lock Overlay */}
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
          <span className="text-4xl">🔒</span>
        </div>
      )}
    </div>
  );
};

interface AchievementsGridProps {
  achievements: Array<Achievement & { unlocked: boolean; unlockedAt?: string }>;
}

export const AchievementsGrid: React.FC<AchievementsGridProps> = ({ achievements }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {achievements.map((achievement) => (
        <AchievementBadge
          key={achievement.id}
          achievement={achievement}
          unlocked={achievement.unlocked}
          unlockedAt={achievement.unlockedAt}
        />
      ))}
    </div>
  );
};
