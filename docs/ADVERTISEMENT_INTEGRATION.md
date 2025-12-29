# 💰 Advertisement Integration - Implementation Guide

Complete advertisement integration for Predictify Sports using Monetag (Web) and AdMob (Mobile).

## 📚 Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Web Implementation (Monetag)](#web-implementation-monetag)
4. [Mobile Implementation (AdMob)](#mobile-implementation-admob)
5. [Database Setup](#database-setup)
6. [Environment Configuration](#environment-configuration)
7. [Usage Examples](#usage-examples)
8. [Revenue Estimation](#revenue-estimation)
9. [Best Practices](#best-practices)

## Overview

This implementation provides:
- ✅ Banner ads (web & mobile)
- ✅ Native ads (integrated into content)
- ✅ Interstitial ads (full-page)
- ✅ Rewarded video ads (mobile bonus features)
- ✅ Frequency limiting (prevent ad overload)
- ✅ Upgrade prompts for free users
- ✅ Database tracking for analytics

## Project Structure

```
predictify-sports/
├── web/                          # Next.js web app
│   ├── lib/
│   │   └── monetag.ts           # Monetag initialization
│   ├── components/ads/
│   │   ├── MonetagBanner.tsx    # Banner ad component
│   │   ├── MonetagNative.tsx    # Native ad component
│   │   ├── MonetagInterstitial.tsx
│   │   └── AdUpgradePrompt.tsx  # Upgrade CTA
│   └── examples/
│       ├── DashboardWithAds.tsx
│       └── RootLayoutWithAds.tsx
├── mobile/                       # React Native/Expo app
│   ├── constants/
│   │   └── admob.ts             # AdMob IDs
│   ├── components/ads/
│   │   ├── AdMobBanner.tsx      # Banner ad component
│   │   └── RewardedAdButton.tsx # Rewarded ad UI
│   ├── hooks/
│   │   ├── useInterstitialAd.ts
│   │   └── useRewardedAd.ts
│   └── examples/
│       ├── HomeScreenWithAds.tsx
│       └── app.config.example.js
├── shared/                       # Shared utilities
│   ├── types/
│   │   └── ads.ts               # TypeScript types
│   └── lib/
│       └── ad-frequency.ts      # Frequency control
└── database/
    ├── schema-ads.sql           # Database schema
    └── README.md                # Database setup guide
```

## Web Implementation (Monetag)

### 1. Setup

#### Install Dependencies
```bash
cd web
npm install # or yarn install
```

#### Get Monetag Zone IDs
1. Sign up at [Monetag](https://monetag.com)
2. Create ad zones for:
   - Banner (728x90, 300x250, 160x600)
   - Native ads
   - Interstitial
   - Pop-under
3. Copy zone IDs to environment variables

#### Environment Variables
```env
# .env.local
NEXT_PUBLIC_MONETAG_BANNER_TOP=your_zone_id_1
NEXT_PUBLIC_MONETAG_BANNER_BOTTOM=your_zone_id_2
NEXT_PUBLIC_MONETAG_BANNER_SIDE=your_zone_id_6
NEXT_PUBLIC_MONETAG_INTERSTITIAL=your_zone_id_3
NEXT_PUBLIC_MONETAG_NATIVE=your_zone_id_4
NEXT_PUBLIC_MONETAG_POPUNDER=your_zone_id_5
```

### 2. Initialize Monetag

In your root layout (e.g., `app/layout.tsx`):
```tsx
import { initMonetag } from '@/web/lib/monetag';

export default function RootLayout({ children }) {
  useEffect(() => {
    initMonetag();
  }, []);
  
  return <html><body>{children}</body></html>;
}
```

### 3. Add Banner Ads

```tsx
import { MonetagBanner } from '@/web/components/ads/MonetagBanner';
import { MONETAG_IDS } from '@/web/lib/monetag';

<MonetagBanner 
  zoneId={MONETAG_IDS.banner_top}
  width={728}
  height={90}
  user={currentUser}
/>
```

### 4. Add Native Ads

```tsx
import { MonetagNative } from '@/web/components/ads/MonetagNative';

{/* Insert every 5 items in a list */}
{items.map((item, index) => (
  <>
    <ItemCard key={item.id} item={item} />
    {(index + 1) % 5 === 0 && (
      <MonetagNative zoneId={MONETAG_IDS.native} user={currentUser} />
    )}
  </>
))}
```

### 5. Add Interstitial Ads

```tsx
import { MonetagInterstitial } from '@/web/components/ads/MonetagInterstitial';

<MonetagInterstitial 
  zoneId={MONETAG_IDS.interstitial}
  user={currentUser}
  intervalMinutes={5}
/>
```

## Mobile Implementation (AdMob)

### 1. Setup

#### Install Dependencies
```bash
cd mobile
npx expo install react-native-google-mobile-ads
```

#### Configure App
Update `app.config.js`:
```javascript
export default {
  expo: {
    plugins: [
      [
        'react-native-google-mobile-ads',
        {
          androidAppId: 'ca-app-pub-XXXXX~XXXXX',
          iosAppId: 'ca-app-pub-XXXXX~XXXXX',
        }
      ]
    ]
  }
};
```

#### Get AdMob IDs
1. Sign up at [Google AdMob](https://admob.google.com)
2. Create an app for iOS and Android
3. Create ad units for:
   - Banner ads
   - Interstitial ads
   - Rewarded video ads
4. Update `mobile/constants/admob.ts` with your IDs

#### Environment Variables
```env
# .env
ADMOB_IOS_APP_ID=ca-app-pub-XXXXX~XXXXX
ADMOB_ANDROID_APP_ID=ca-app-pub-XXXXX~XXXXX
ADMOB_IOS_BANNER=ca-app-pub-XXXXX/XXXXX
ADMOB_ANDROID_BANNER=ca-app-pub-XXXXX/XXXXX
ADMOB_IOS_INTERSTITIAL=ca-app-pub-XXXXX/XXXXX
ADMOB_ANDROID_INTERSTITIAL=ca-app-pub-XXXXX/XXXXX
ADMOB_IOS_REWARDED=ca-app-pub-XXXXX/XXXXX
ADMOB_ANDROID_REWARDED=ca-app-pub-XXXXX/XXXXX
```

### 2. Add Banner Ads

```tsx
import { AdMobBanner } from '@/mobile/components/ads/AdMobBanner';

export function HomeScreen() {
  return (
    <View>
      <AdMobBanner user={currentUser} position="top" />
      {/* Your content */}
      <AdMobBanner user={currentUser} position="bottom" />
    </View>
  );
}
```

### 3. Add Interstitial Ads

```tsx
import { useInterstitialAd } from '@/mobile/hooks/useInterstitialAd';

function MyScreen() {
  const { showAd, loaded } = useInterstitialAd({ user });
  
  const handleAction = async () => {
    await performAction();
    if (actionCount % 3 === 0) {
      await showAd();
    }
  };
}
```

### 4. Add Rewarded Ads

```tsx
import { useRewardedAd } from '@/mobile/hooks/useRewardedAd';
import { RewardedAdButton } from '@/mobile/components/ads/RewardedAdButton';

function BonusScreen() {
  const { showAd, loaded } = useRewardedAd({
    onRewarded: async (amount) => {
      // Give user reward
      await grantBonus(userId, 'xp', 50);
    }
  });
  
  return (
    <RewardedAdButton
      userId={user.id}
      onReward={showAd}
      rewardType="xp"
      disabled={!loaded}
    />
  );
}
```

## Database Setup

### 1. Run Migration

```bash
# Using psql
psql -h your-db-host -U your-user -d your-database -f database/schema-ads.sql

# Using Supabase Dashboard
# Copy schema-ads.sql content and run in SQL Editor
```

### 2. Track Ad Impressions

```typescript
// Track when an ad is shown
await supabase.rpc('track_ad_impression', {
  p_user_id: user.id,
  p_ad_type: 'banner',
  p_ad_provider: 'monetag',
  p_placement: 'home_top',
  p_revenue: 0.001
});
```

### 3. Grant Rewards

```typescript
// XP Reward
await supabase.rpc('add_bonus_xp', {
  p_user_id: user.id,
  p_xp: 50
});

// Prediction Reward
await supabase.rpc('add_bonus_prediction', {
  p_user_id: user.id,
  p_count: 1
});
```

## Environment Configuration

### Web (.env.local)
```env
NEXT_PUBLIC_MONETAG_BANNER_TOP=zone_id_1
NEXT_PUBLIC_MONETAG_BANNER_BOTTOM=zone_id_2
NEXT_PUBLIC_MONETAG_BANNER_SIDE=zone_id_6
NEXT_PUBLIC_MONETAG_INTERSTITIAL=zone_id_3
NEXT_PUBLIC_MONETAG_NATIVE=zone_id_4
NEXT_PUBLIC_MONETAG_POPUNDER=zone_id_5
```

### Mobile (.env)
```env
ADMOB_IOS_APP_ID=ca-app-pub-XXXXX~XXXXX
ADMOB_ANDROID_APP_ID=ca-app-pub-XXXXX~XXXXX
ADMOB_IOS_BANNER=ca-app-pub-XXXXX/XXXXX
ADMOB_ANDROID_BANNER=ca-app-pub-XXXXX/XXXXX
ADMOB_IOS_INTERSTITIAL=ca-app-pub-XXXXX/XXXXX
ADMOB_ANDROID_INTERSTITIAL=ca-app-pub-XXXXX/XXXXX
ADMOB_IOS_REWARDED=ca-app-pub-XXXXX/XXXXX
ADMOB_ANDROID_REWARDED=ca-app-pub-XXXXX/XXXXX
```

## Usage Examples

See the `examples/` directory in both `web/` and `mobile/` folders for complete working examples:

- **Web**: `web/examples/DashboardWithAds.tsx`
- **Mobile**: `mobile/examples/HomeScreenWithAds.tsx`

## Revenue Estimation

### Monetag (Web)
```
CPM Rates:
- Banner: $0.50 - $2
- Native: $1 - $3
- Interstitial: $2 - $5
- Popunder: $3 - $8

Example (1000 free users/day):
- 10,000 impressions/day
- Banner: $10/day
- Native: $4/day
- Interstitial: $1.5/day
Monthly: ~$450-600
```

### AdMob (Mobile)
```
CPM Rates:
- Banner: $0.50 - $1.50
- Interstitial: $3 - $7
- Rewarded: $5 - $15

Example (500 mobile users/day):
- Banner: $2.5/day
- Interstitial: $12.5/day
- Rewarded: $5/day
Monthly: ~$600
```

**Total Estimated Revenue: $1,050 - $1,200/month**

## Best Practices

### 1. User Experience
- ✅ Respect frequency limits (max 1 interstitial/3-5 minutes)
- ✅ Don't show ads to Pro/VIP users
- ✅ Provide clear upgrade paths
- ✅ Use rewarded ads as bonuses, not requirements

### 2. Ad Placement
- ✅ Banner: Top, bottom, sidebar (max 3 per page)
- ✅ Native: Every 5th item in lists
- ✅ Interstitial: After actions, page transitions
- ✅ Rewarded: Optional bonuses for free users

### 3. Performance
- ✅ Lazy load ad scripts
- ✅ Clean up ad containers on unmount
- ✅ Track impressions asynchronously
- ✅ Cache ad load status

### 4. Analytics
- ✅ Track all impressions
- ✅ Monitor conversion rates (ad → upgrade)
- ✅ A/B test ad placements
- ✅ Review revenue daily/weekly

### 5. Compliance
- ✅ GDPR compliance (EU users)
- ✅ COPPA compliance (no ads to children)
- ✅ Privacy policy disclosure
- ✅ Non-personalized ads option

## Testing

### Test IDs (Development)
The code includes Google's test ad unit IDs by default. These show test ads that won't generate revenue but allow you to test implementation.

### Before Production
1. Replace all test IDs with your actual AdMob IDs
2. Set up Monetag zones and update zone IDs
3. Test on real devices
4. Verify tracking in database
5. Check analytics dashboards

## Support

For issues or questions:
1. Check the examples in `web/examples/` and `mobile/examples/`
2. Review [Monetag Documentation](https://monetag.com/docs)
3. Review [AdMob Documentation](https://developers.google.com/admob)
4. Check database setup in `database/README.md`

## License

This implementation is part of the Predictify Sports project.
