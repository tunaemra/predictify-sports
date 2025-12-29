/**
 * Ad Upgrade Prompt Component
 * Encourages free users to upgrade to remove ads
 */

'use client';

import { User } from '../../../shared/types/ads';

interface AdUpgradePromptProps {
  user?: User | null;
  className?: string;
}

export function AdUpgradePrompt({ 
  user = null,
  className = ''
}: AdUpgradePromptProps) {
  // Only show to free users
  if (user && user.subscription_tier !== 'free') {
    return null;
  }

  return (
    <div 
      className={`bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg my-4 ${className}`}
      data-testid="upgrade-prompt"
    >
      <h3 className="text-white font-bold mb-2">
        🚀 Reklamlardan Kurtul!
      </h3>
      <p className="text-white/90 text-sm mb-3">
        Pro üyeliğe geç, reklamsız deneyimin tadını çıkar
      </p>
      <a 
        href="/pricing" 
        className="inline-block bg-white text-purple-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
      >
        Planları Gör
      </a>
    </div>
  );
}
