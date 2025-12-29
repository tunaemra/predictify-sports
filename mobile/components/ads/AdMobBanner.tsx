/**
 * AdMob Banner Component
 * Displays banner ads at the bottom or top of mobile screens
 */

import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { User } from '../../../shared/types/ads';
import { ADMOB_IDS } from '../../constants/admob';

// Note: This is a mock implementation since we don't have react-native-google-mobile-ads installed
// In production, uncomment the import below:
// import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

interface AdMobBannerProps {
  user?: User | null;
  position?: 'top' | 'bottom';
}

export function AdMobBanner({ 
  user = null,
  position = 'bottom'
}: AdMobBannerProps) {
  // Don't show ads to Pro/VIP users
  if (user && user.subscription_tier !== 'free') {
    return null;
  }

  const adUnitId = Platform.select({
    ios: ADMOB_IDS.ios.banner,
    android: ADMOB_IDS.android.banner,
  });

  // Mock implementation - replace with actual BannerAd when react-native-google-mobile-ads is installed
  /*
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
  */

  // Placeholder return for now
  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
