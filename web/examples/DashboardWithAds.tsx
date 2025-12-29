/**
 * Example Web App Dashboard Page with Monetag Ads
 * Demonstrates how to integrate ads into a Next.js page
 */

// Example: app/(dashboard)/page.tsx or pages/dashboard.tsx

import { MonetagBanner } from '@/web/components/ads/MonetagBanner';
import { MonetagNative } from '@/web/components/ads/MonetagNative';
import { MonetagInterstitial } from '@/web/components/ads/MonetagInterstitial';
import { AdUpgradePrompt } from '@/web/components/ads/AdUpgradePrompt';
import { MONETAG_IDS } from '@/web/lib/monetag';

// Example hook for getting current user (implement based on your auth)
// import { useUser } from '@/hooks/useUser';

export default function DashboardPage() {
  // Get current user from your auth system
  // const { user } = useUser();
  
  // Mock user for example
  const user = { 
    id: '123', 
    subscription_tier: 'free' as const,
    email: 'user@example.com'
  };

  // Example match data
  const matches = [
    { id: '1', home: 'Team A', away: 'Team B' },
    { id: '2', home: 'Team C', away: 'Team D' },
    { id: '3', home: 'Team E', away: 'Team F' },
    { id: '4', home: 'Team G', away: 'Team H' },
    { id: '5', home: 'Team I', away: 'Team J' },
    { id: '6', home: 'Team K', away: 'Team L' },
  ];

  return (
    <div className="container mx-auto px-4">
      {/* Top Banner Ad */}
      <MonetagBanner 
        zoneId={MONETAG_IDS.banner_top}
        width={728}
        height={90}
        user={user}
      />

      {/* Upgrade Prompt */}
      <AdUpgradePrompt user={user} />

      <div className="grid grid-cols-12 gap-4">
        {/* Main Content Area */}
        <div className="col-span-12 lg:col-span-9">
          <h1 className="text-2xl font-bold mb-4">Maçlar</h1>

          {/* Match List with Native Ads */}
          <div className="space-y-4">
            {matches.map((match, index) => (
              <div key={match.id}>
                {/* Match Card */}
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="font-semibold">
                    {match.home} vs {match.away}
                  </p>
                </div>

                {/* Native Ad every 5 matches */}
                {(index + 1) % 5 === 0 && (
                  <MonetagNative 
                    zoneId={MONETAG_IDS.native}
                    user={user}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Bottom Banner Ad */}
          <MonetagBanner 
            zoneId={MONETAG_IDS.banner_bottom}
            width={728}
            height={90}
            user={user}
            className="mt-8"
          />
        </div>

        {/* Sidebar with Skyscraper Ad */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="sticky top-4">
            <h2 className="text-lg font-bold mb-4">Liderlik Tablosu</h2>
            
            {/* Sidebar Skyscraper Ad */}
            <MonetagBanner 
              zoneId={MONETAG_IDS.banner_side}
              width={160}
              height={600}
              user={user}
            />
          </div>
        </aside>
      </div>

      {/* Interstitial Ad - runs in background */}
      <MonetagInterstitial 
        zoneId={MONETAG_IDS.interstitial}
        user={user}
        intervalMinutes={5}
      />
    </div>
  );
}
