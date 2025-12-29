/**
 * AdMob Configuration Constants
 * Ad Unit IDs for iOS and Android platforms
 */

export const ADMOB_IDS = {
  ios: {
    banner: process.env.ADMOB_IOS_BANNER || 'ca-app-pub-3940256099942544/2934735716', // Test ID
    interstitial: process.env.ADMOB_IOS_INTERSTITIAL || 'ca-app-pub-3940256099942544/4411468910', // Test ID
    rewarded: process.env.ADMOB_IOS_REWARDED || 'ca-app-pub-3940256099942544/1712485313', // Test ID
  },
  android: {
    banner: process.env.ADMOB_ANDROID_BANNER || 'ca-app-pub-3940256099942544/6300978111', // Test ID
    interstitial: process.env.ADMOB_ANDROID_INTERSTITIAL || 'ca-app-pub-3940256099942544/1033173712', // Test ID
    rewarded: process.env.ADMOB_ANDROID_REWARDED || 'ca-app-pub-3940256099942544/5224354917', // Test ID
  },
} as const;

/**
 * AdMob App IDs for app.config.js
 */
export const ADMOB_APP_IDS = {
  ios: process.env.ADMOB_IOS_APP_ID || 'ca-app-pub-3940256099942544~1458002511', // Test App ID
  android: process.env.ADMOB_ANDROID_APP_ID || 'ca-app-pub-3940256099942544~3347511713', // Test App ID
} as const;

/**
 * NOTE: Replace these test IDs with your actual AdMob IDs before production deployment
 * Test IDs are provided by Google for testing purposes
 * Get your IDs from: https://apps.admob.com/
 */
