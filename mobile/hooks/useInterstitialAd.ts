/**
 * useInterstitialAd Hook
 * Manages interstitial ad loading and display
 */

import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { User } from '../../../shared/types/ads';
import { ADMOB_IDS } from '../../constants/admob';
import { canShowInterstitial } from '../../../shared/lib/ad-frequency';

// Note: This is a mock implementation since we don't have react-native-google-mobile-ads installed
// In production, uncomment the imports below:
// import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

interface UseInterstitialAdOptions {
  user?: User | null;
}

export function useInterstitialAd(options: UseInterstitialAdOptions = {}) {
  const { user } = options;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Don't load ads for Pro/VIP users
    if (user && user.subscription_tier !== 'free') {
      return;
    }

    // Mock implementation
    // In production, replace with actual AdMob initialization:
    /*
    const adUnitId = Platform.select({
      ios: ADMOB_IDS.ios.interstitial,
      android: ADMOB_IDS.android.interstitial,
    });

    const ad = InterstitialAd.createForAdRequest(adUnitId);
    
    const unsubscribe = ad.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    ad.load();

    return unsubscribe;
    */

    // Mock loaded state for development
    setLoaded(true);
  }, [user]);

  const showAd = async (): Promise<boolean> => {
    // Check frequency limits
    if (!canShowInterstitial()) {
      console.log('Interstitial ad blocked by frequency limit');
      return false;
    }

    // Mock implementation
    // In production, replace with actual ad display:
    /*
    if (loaded && interstitial) {
      await interstitial.show();
      return true;
    }
    */

    console.log('Showing interstitial ad (mock)');
    return true;
  };

  return { showAd, loaded };
}
