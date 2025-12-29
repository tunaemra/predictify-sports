/**
 * Monetag Ad Integration for Web
 * Handles banner, native, interstitial, and popunder ads
 */

export const MONETAG_IDS = {
  banner_top: process.env.NEXT_PUBLIC_MONETAG_BANNER_TOP || 'YOUR_ZONE_ID_1',
  banner_bottom: process.env.NEXT_PUBLIC_MONETAG_BANNER_BOTTOM || 'YOUR_ZONE_ID_2',
  banner_side: process.env.NEXT_PUBLIC_MONETAG_BANNER_SIDE || 'YOUR_ZONE_ID_6',
  interstitial: process.env.NEXT_PUBLIC_MONETAG_INTERSTITIAL || 'YOUR_ZONE_ID_3',
  native: process.env.NEXT_PUBLIC_MONETAG_NATIVE || 'YOUR_ZONE_ID_4',
  popunder: process.env.NEXT_PUBLIC_MONETAG_POPUNDER || 'YOUR_ZONE_ID_5',
} as const;

/**
 * Initialize Monetag scripts globally
 * Call this in your app initialization (e.g., _app.tsx or layout.tsx)
 */
export function initMonetag(): void {
  if (typeof window === 'undefined') return;
  
  // Prevent double initialization
  if ((window as any).__monetag_initialized) return;
  
  const script = document.createElement('script');
  script.src = 'https://alwingulla.com/88/tag.min.js';
  script.setAttribute('data-zone', MONETAG_IDS.banner_top);
  script.async = true;
  document.head.appendChild(script);
  
  (window as any).__monetag_initialized = true;
}

/**
 * Load a specific Monetag ad zone
 */
export function loadMonetagZone(zoneId: string): void {
  if (typeof window === 'undefined') return;
  
  const script = document.createElement('script');
  script.src = `//alwingulla.com/${zoneId}/invoke.js`;
  script.async = true;
  document.body.appendChild(script);
}

/**
 * Check if Monetag is available
 */
export function isMonetagAvailable(): boolean {
  return typeof window !== 'undefined' && !!(window as any).atOptions;
}
