# 🏆 Predictify Sports - Advertisement Integration

A complete advertisement monetization system for sports prediction platform with support for both web (Monetag) and mobile (AdMob) platforms.

## 💰 Features

### Web (Monetag)
- ✅ Banner Ads (728x90, 300x250, 160x600)
- ✅ Native Ads (integrated into content)
- ✅ Interstitial Ads (full-page with frequency control)
- ✅ Pop-under Ads
- ✅ Upgrade Prompts

### Mobile (AdMob)
- ✅ Banner Ads (320x50, smart banner)
- ✅ Interstitial Ads
- ✅ Rewarded Video Ads (for bonuses)
- ✅ Native Ads

### Core Features
- ✅ Frequency Limiting (prevent ad overload)
- ✅ Subscription-based Ad Control (no ads for Pro/VIP)
- ✅ Database Tracking & Analytics
- ✅ Reward System (XP, predictions, AI credits)
- ✅ TypeScript Support
- ✅ Complete Examples

## 📦 Project Structure

```
predictify-sports/
├── web/                    # Next.js web app with Monetag
│   ├── lib/               # Monetag integration
│   ├── components/ads/    # Ad components
│   └── examples/          # Usage examples
├── mobile/                # React Native/Expo app with AdMob
│   ├── constants/         # AdMob IDs
│   ├── components/ads/    # Ad components
│   ├── hooks/             # Ad hooks
│   └── examples/          # Usage examples
├── shared/                # Shared utilities
│   ├── types/            # TypeScript types
│   └── lib/              # Frequency control
├── database/             # SQL schema & migrations
└── docs/                 # Documentation
```

## 🚀 Quick Start

### 1. Database Setup

```bash
# Run the migration
psql -h your-db-host -U your-user -d your-database -f database/schema-ads.sql
```

### 2. Web Setup

```bash
cd web
npm install

# Copy environment template
cp .env.example .env.local

# Add your Monetag zone IDs to .env.local
```

### 3. Mobile Setup

```bash
cd mobile
npx expo install react-native-google-mobile-ads

# Copy environment template
cp .env.example .env

# Add your AdMob IDs to .env
```

## 📖 Documentation

- **[Quick Start Guide](docs/README.md)** - Get started in 30 minutes
- **[Full Documentation](docs/ADVERTISEMENT_INTEGRATION.md)** - Complete integration guide
- **[Database Setup](database/README.md)** - Database schema documentation

## 💡 Usage Examples

### Web Banner Ad
```tsx
import { MonetagBanner } from '@/web/components/ads/MonetagBanner';

<MonetagBanner 
  zoneId={MONETAG_IDS.banner_top}
  width={728}
  height={90}
  user={currentUser}
/>
```

### Mobile Rewarded Ad
```tsx
import { RewardedAdButton } from '@/mobile/components/ads/RewardedAdButton';

<RewardedAdButton
  userId={user.id}
  rewardType="xp"
/>
```

See `web/examples/` and `mobile/examples/` for complete implementations.

## 💰 Revenue Estimation

```
Web (Monetag):     $450-600/month
Mobile (AdMob):    $600/month
─────────────────────────────────
Total:             $1,050-1,200/month
```

Based on 1,000 free web users and 500 free mobile users per day.

## 🎯 Ad Strategy

### Free Tier
- All ads enabled
- Rewarded videos for bonuses
- Upgrade prompts

### Pro/VIP Tiers
- No ads
- Ad-free experience

### Frequency Control
- Interstitial: Max 1 per 3 minutes
- Session limit: 5 interstitials
- Banner: Max 3 per page

## 🛠️ Technology Stack

- **Web**: Next.js, React, TypeScript, Monetag
- **Mobile**: React Native, Expo, TypeScript, AdMob
- **Database**: PostgreSQL (Supabase compatible)
- **Analytics**: Built-in tracking system

## 📊 Analytics

Track and monitor:
- Ad impressions by type and placement
- Revenue per thousand impressions (RPM)
- User rewards and engagement
- Conversion rates (free → paid)

## 🔒 Privacy & Compliance

- GDPR compliant
- Non-personalized ads option
- Privacy policy disclosure
- User consent management

## 🧪 Testing

All components include Google's test ad IDs for development. Replace with production IDs before deployment.

## 📝 License

This project is part of Predictify Sports.

## 🤝 Support

For questions or issues, check:
- [Documentation](docs/ADVERTISEMENT_INTEGRATION.md)
- [Examples](web/examples/ and mobile/examples/)
- [Database Guide](database/README.md)

---

**Ready to monetize?** Follow the [Quick Start Guide](docs/README.md) to get started! 🚀
