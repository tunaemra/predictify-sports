/**
 * Ad Frequency Control
 * Prevents ad overload and manages frequency limits
 */

import { AD_LIMITS } from '../types/ads';

let lastInterstitialTime = 0;
let sessionInterstitialCount = 0;

/**
 * Check if an interstitial ad can be shown based on frequency limits
 */
export function canShowInterstitial(): boolean {
  const now = Date.now();
  const timeSinceLastAd = (now - lastInterstitialTime) / 1000 / 60; // minutes
  
  // Check minimum interval
  if (timeSinceLastAd < AD_LIMITS.interstitial.minInterval) {
    return false;
  }
  
  // Check session limit
  if (sessionInterstitialCount >= AD_LIMITS.interstitial.maxPerSession) {
    return false;
  }
  
  // Update tracking
  lastInterstitialTime = now;
  sessionInterstitialCount++;
  return true;
}

/**
 * Reset session counters (call on app/page restart)
 */
export function resetAdSession(): void {
  lastInterstitialTime = 0;
  sessionInterstitialCount = 0;
}

/**
 * Get time until next interstitial is allowed (in seconds)
 */
export function getTimeUntilNextInterstitial(): number {
  const now = Date.now();
  const timeSinceLastAd = (now - lastInterstitialTime) / 1000; // seconds
  const requiredInterval = AD_LIMITS.interstitial.minInterval * 60; // convert to seconds
  
  const timeRemaining = requiredInterval - timeSinceLastAd;
  return Math.max(0, timeRemaining);
}

/**
 * Check if session has reached interstitial limit
 */
export function hasReachedSessionLimit(): boolean {
  return sessionInterstitialCount >= AD_LIMITS.interstitial.maxPerSession;
}
