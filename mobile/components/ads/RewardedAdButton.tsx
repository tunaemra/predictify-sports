/**
 * Rewarded Ad Button Component
 * Allows users to watch ads for rewards (XP, predictions, etc.)
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface RewardedAdButtonProps {
  userId: string;
  onReward?: (amount: number) => void;
  rewardType?: 'xp' | 'prediction' | 'ai_credit';
  disabled?: boolean;
}

export function RewardedAdButton({ 
  userId,
  onReward,
  rewardType = 'xp',
  disabled = false
}: RewardedAdButtonProps) {
  
  const handlePress = async () => {
    // In production, this would trigger the rewarded ad
    // For now, this is a placeholder
    console.log('Rewarded ad button pressed', { userId, rewardType });
  };

  const getRewardText = () => {
    switch (rewardType) {
      case 'xp':
        return '📺 Reklam İzle +50 XP Kazan';
      case 'prediction':
        return '📺 Reklam İzle +1 Tahmin Hakkı Kazan';
      case 'ai_credit':
        return '📺 Reklam İzle +1 AI Tahmin Kazan';
      default:
        return '📺 Reklam İzle Ödül Kazan';
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.button,
        disabled && styles.buttonDisabled
      ]}
    >
      <Text style={styles.buttonText}>
        {getRewardText()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
