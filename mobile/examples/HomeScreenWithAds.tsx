/**
 * Example Mobile Screen with AdMob Integration
 * Demonstrates how to use AdMob ads in a React Native screen
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AdMobBanner } from '@/mobile/components/ads/AdMobBanner';
import { RewardedAdButton } from '@/mobile/components/ads/RewardedAdButton';
import { useInterstitialAd } from '@/mobile/hooks/useInterstitialAd';
import { useRewardedAd } from '@/mobile/hooks/useRewardedAd';

export function HomeScreen() {
  const [predictionCount, setPredictionCount] = useState(0);
  const [userXP, setUserXP] = useState(0);

  // Mock user - replace with actual user from your auth
  const user = { 
    id: '123', 
    subscription_tier: 'free' as const,
    email: 'user@example.com'
  };

  // Initialize interstitial ad
  const { showAd: showInterstitial } = useInterstitialAd({ user });

  // Initialize rewarded ad for XP bonus
  const { showAd: showRewardedAd, loaded: rewardedLoaded } = useRewardedAd({
    onRewarded: (amount) => {
      // Add bonus XP
      setUserXP(prev => prev + 50);
      
      // Call backend to persist reward
      // await supabase.rpc('add_bonus_xp', { user_id: user.id, xp: 50 });
    },
  });

  const handlePredictionSubmit = async () => {
    // Save prediction logic here
    console.log('Prediction submitted');
    
    // Increment prediction count
    const newCount = predictionCount + 1;
    setPredictionCount(newCount);

    // Show interstitial ad every 3 predictions
    if (newCount % 3 === 0) {
      await showInterstitial();
    }
  };

  const handleWatchAdForXP = async () => {
    await showRewardedAd();
  };

  return (
    <View style={styles.container}>
      {/* Top Banner Ad */}
      <AdMobBanner user={user} position="top" />

      <ScrollView style={styles.content}>
        {/* User Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.statsText}>XP: {userXP}</Text>
          <Text style={styles.statsText}>Tahminler: {predictionCount}</Text>
        </View>

        {/* Rewarded Ad Button */}
        <RewardedAdButton
          userId={user.id}
          onReward={handleWatchAdForXP}
          rewardType="xp"
          disabled={!rewardedLoaded}
        />

        {/* Match List */}
        <View style={styles.matchList}>
          <Text style={styles.sectionTitle}>Günün Maçları</Text>
          
          {[1, 2, 3, 4, 5].map((matchId) => (
            <View key={matchId} style={styles.matchCard}>
              <Text style={styles.matchText}>
                Takım {matchId}A vs Takım {matchId}B
              </Text>
              <TouchableOpacity 
                style={styles.predictButton}
                onPress={handlePredictionSubmit}
              >
                <Text style={styles.predictButtonText}>Tahmin Yap</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Upgrade Prompt for Free Users */}
        {user.subscription_tier === 'free' && (
          <View style={styles.upgradeCard}>
            <Text style={styles.upgradeTitle}>🚀 Reklamlardan Kurtul!</Text>
            <Text style={styles.upgradeText}>
              Pro üyeliğe geç, reklamsız deneyimin tadını çıkar
            </Text>
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>Planları Gör</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bottom Banner Ad */}
      <AdMobBanner user={user} position="bottom" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  matchList: {
    marginTop: 16,
  },
  matchCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  matchText: {
    fontSize: 16,
    marginBottom: 8,
  },
  predictButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  predictButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  upgradeCard: {
    backgroundColor: '#a855f7',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  upgradeTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  upgradeText: {
    color: 'white',
    opacity: 0.9,
    marginBottom: 12,
  },
  upgradeButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#a855f7',
    fontWeight: 'bold',
  },
});
