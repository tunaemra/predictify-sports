/**
 * Monetag Banner Ad Component
 * Displays banner ads for free tier users
 */

'use client';

import { useEffect, useRef } from 'react';
import { User } from '../../../shared/types/ads';

interface MonetagBannerProps {
  zoneId: string;
  width?: number;
  height?: number;
  className?: string;
  user?: User | null;
}

export function MonetagBanner({ 
  zoneId, 
  width = 728, 
  height = 90,
  className = '',
  user = null
}: MonetagBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  // Don't show ads to Pro/VIP users
  if (user && user.subscription_tier !== 'free') {
    return null;
  }

  useEffect(() => {
    if (!adRef.current) return;
    
    // Load Monetag script for this zone
    const script = document.createElement('script');
    script.src = `//alwingulla.com/${zoneId}/invoke.js`;
    script.async = true;
    
    adRef.current.appendChild(script);
    
    // Cleanup
    return () => {
      if (adRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [zoneId]);

  return (
    <div 
      ref={adRef}
      className={`monetag-ad ${className}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        margin: '20px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
      data-testid="monetag-banner"
    >
      {/* Monetag script will inject ad content here */}
    </div>
  );
}
