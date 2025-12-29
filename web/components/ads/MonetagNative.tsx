/**
 * Monetag Native Ad Component
 * Displays native ads integrated into content
 */

'use client';

import { useEffect, useRef } from 'react';
import { User } from '../../../shared/types/ads';

interface MonetagNativeProps {
  zoneId: string;
  user?: User | null;
  className?: string;
}

export function MonetagNative({ 
  zoneId, 
  user = null,
  className = ''
}: MonetagNativeProps) {
  const adRef = useRef<HTMLDivElement>(null);

  // Don't show ads to Pro/VIP users
  if (user && user.subscription_tier !== 'free') {
    return null;
  }

  useEffect(() => {
    if (!adRef.current) return;

    // Load native ad script
    const script = document.createElement('script');
    script.src = `//alwingulla.com/${zoneId}/invoke.js`;
    script.async = true;
    
    const adContainer = adRef.current.querySelector('.native-ad-content');
    if (adContainer) {
      adContainer.appendChild(script);
    }

    // Cleanup
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [zoneId]);

  return (
    <div 
      ref={adRef}
      className={`native-ad-container my-4 p-4 bg-gray-50 rounded-lg ${className}`}
      data-testid="monetag-native"
    >
      <span className="text-xs text-gray-500 mb-2 block">Sponsorlu</span>
      <div className="native-ad-content" id={`monetag-native-${zoneId}`} />
    </div>
  );
}
