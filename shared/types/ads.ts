/**
 * Ad Integration Type Definitions
 * Shared types for web and mobile ad implementations
 */

export type AdType = 'banner' | 'interstitial' | 'rewarded' | 'native';
export type AdProvider = 'admob' | 'monetag';
export type SubscriptionTier = 'free' | 'pro' | 'vip';

export interface AdPlacement {
  type: AdType;
  location: string;
  frequency: string;
  provider: AdProvider;
}

export interface AdFrequencyLimits {
  interstitial: {
    minInterval: number; // minutes
    maxPerSession: number;
  };
  banner: {
    maxPerPage: number;
  };
}

export interface AdImpression {
  id?: string;
  user_id?: string;
  ad_type: AdType;
  ad_provider: AdProvider;
  placement: string;
  revenue?: number;
  created_at?: Date;
}

export interface AdReward {
  id?: string;
  user_id: string;
  reward_type: 'xp' | 'prediction' | 'ai_credit';
  reward_amount: number;
  created_at?: Date;
}

export interface User {
  id: string;
  subscription_tier: SubscriptionTier;
  email?: string;
  // Add other user properties as needed
}

export const AD_LIMITS: AdFrequencyLimits = {
  interstitial: {
    minInterval: 3, // 3 minutes between interstitials
    maxPerSession: 5, // Max 5 interstitials per session
  },
  banner: {
    maxPerPage: 3, // Max 3 banners per page
  },
};
