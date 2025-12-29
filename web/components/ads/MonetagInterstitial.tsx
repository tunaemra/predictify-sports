/**
 * Monetag Interstitial Ad Component
 * Shows full-page interstitial ads with frequency control
 */

'use client';

import { useEffect } from 'react';
import { User } from '../../../shared/types/ads';
import { canShowInterstitial } from '../../../shared/lib/ad-frequency';

interface MonetagInterstitialProps {
  zoneId: string;
  user?: User | null;
  intervalMinutes?: number; // Override default interval
}

export function MonetagInterstitial({ 
  zoneId,
  user = null,
  intervalMinutes = 5
}: MonetagInterstitialProps) {
  
  useEffect(() => {
    // Don't show ads to Pro/VIP users
    if (user && user.subscription_tier !== 'free') return;

    // Show interstitial at intervals with frequency control
    const interval = setInterval(() => {
      if (canShowInterstitial() && (window as any).atOptions) {
        const script = document.createElement('script');
        script.src = `//alwingulla.com/${zoneId}/invoke.js`;
        script.async = true;
        document.body.appendChild(script);
        
        // Remove script after loading to prevent memory leak
        setTimeout(() => {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
        }, 5000);
      }
    }, intervalMinutes * 60 * 1000); // Convert minutes to milliseconds

    return () => clearInterval(interval);
  }, [user, zoneId, intervalMinutes]);

  // This component renders nothing visible
  return null;
}
