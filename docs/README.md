# 🎯 Advertisement Integration - Quick Start Guide

Complete ad monetization system for free tier users using Monetag (Web) and AdMob (Mobile).

## ⚡ Quick Links

- 📖 [Full Documentation](./ADVERTISEMENT_INTEGRATION.md)
- 🗄️ [Database Setup](../database/README.md)
- 💻 [Web Examples](../web/examples/)
- 📱 [Mobile Examples](../mobile/examples/)

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Supabase)
- Monetag account for web ads
- Google AdMob account for mobile ads

### 1. Database Setup (5 minutes)

```bash
# Run the SQL migration
psql -h your-db-host -U your-user -d your-database -f database/schema-ads.sql
```

Or use Supabase Dashboard SQL Editor to run `database/schema-ads.sql`

### 2. Web Setup (10 minutes)

```bash
cd web
npm install

# Add to .env.local
NEXT_PUBLIC_MONETAG_BANNER_TOP=your_zone_id
NEXT_PUBLIC_MONETAG_BANNER_BOTTOM=your_zone_id
NEXT_PUBLIC_MONETAG_INTERSTITIAL=your_zone_id
NEXT_PUBLIC_MONETAG_NATIVE=your_zone_id
```

Add to your layout:
```tsx
import { initMonetag } from '@/web/lib/monetag';
useEffect(() => initMonetag(), []);
```

### 3. Mobile Setup (15 minutes)

```bash
cd mobile
npx expo install react-native-google-mobile-ads

# Add to .env
ADMOB_IOS_APP_ID=ca-app-pub-XXXXX~XXXXX
ADMOB_ANDROID_APP_ID=ca-app-pub-XXXXX~XXXXX
```

Update `app.config.js`:
```javascript
plugins: [
  ['react-native-google-mobile-ads', {
    androidAppId: process.env.ADMOB_ANDROID_APP_ID,
    iosAppId: process.env.ADMOB_IOS_APP_ID,
  }]
]
```

## 📦 What's Included

### Web Components (Monetag)
- ✅ `MonetagBanner` - Banner ads (728x90, 300x250, 160x600)
- ✅ `MonetagNative` - Native ads in content
- ✅ `MonetagInterstitial` - Full-page ads with frequency control
- ✅ `AdUpgradePrompt` - Conversion prompts

### Mobile Components (AdMob)
- ✅ `AdMobBanner` - Banner ads (320x50, smart banner)
- ✅ `useInterstitialAd` - Interstitial ad hook
- ✅ `useRewardedAd` - Rewarded video hook
- ✅ `RewardedAdButton` - Bonus reward UI

### Shared Utilities
- ✅ `ad-frequency.ts` - Frequency limiting
- ✅ `ads.ts` - TypeScript types
- ✅ Database schema with analytics views
- ✅ Reward system (XP, predictions, AI credits)

## 💡 Usage Examples

### Web Banner Ad
```tsx
<MonetagBanner 
  zoneId={MONETAG_IDS.banner_top}
  width={728}
  height={90}
  user={currentUser}
/>
```

### Mobile Interstitial
```tsx
const { showAd } = useInterstitialAd({ user });
await showAd(); // Show after prediction
```

### Rewarded Video
```tsx
<RewardedAdButton
  userId={user.id}
  rewardType="xp"
/>
```

## 📊 Ad Strategy

### Free Tier Users
- ✅ All ads enabled
- ✅ Banner + Native + Interstitial
- ✅ Rewarded videos for bonuses
- ✅ Upgrade prompts

### Pro/VIP Users
- ❌ No ads shown
- ✅ Ad-free experience

### Frequency Limits
- Interstitial: Max 1 per 3 minutes
- Session limit: 5 interstitials max
- Banner: Max 3 per page

## 💰 Expected Revenue

```
Web (Monetag):     $450-600/month
Mobile (AdMob):    $600/month
─────────────────────────────────
Total:             $1,050-1,200/month
```

Based on:
- 1,000 free web users/day
- 500 free mobile users/day
- Standard CPM rates

## 📚 Full Documentation

For complete implementation details, API reference, and advanced features, see:
- [Advertisement Integration Guide](./ADVERTISEMENT_INTEGRATION.md)
- [Database Schema Documentation](../database/README.md)

## 🔧 Configuration Files

```
.env.local (Web)              # Monetag zone IDs
.env (Mobile)                 # AdMob app and unit IDs
app.config.js                 # Expo AdMob plugin config
database/schema-ads.sql       # Database migration
```

## ✅ Checklist

### Web
- [ ] Monetag account created
- [ ] Zone IDs obtained
- [ ] Environment variables set
- [ ] Components integrated
- [ ] initMonetag() called

### Mobile
- [ ] AdMob account created
- [ ] App IDs obtained
- [ ] Ad unit IDs created
- [ ] react-native-google-mobile-ads installed
- [ ] app.config.js configured

### Database
- [ ] Migration run
- [ ] Tables created
- [ ] Functions tested
- [ ] Analytics views verified

### Testing
- [ ] Test ads showing
- [ ] Frequency limits working
- [ ] Pro users see no ads
- [ ] Rewards granting correctly
- [ ] Analytics tracking

## 🎯 Next Steps

1. ✅ Complete setup following this guide
2. 📖 Read full documentation for advanced features
3. 🧪 Test with Google's test ad IDs
4. 🚀 Deploy with production ad IDs
5. 📊 Monitor analytics and revenue

## 🆘 Troubleshooting

**Ads not showing?**
- Check environment variables
- Verify zone/unit IDs
- Check user subscription tier
- Review browser console for errors

**Frequency issues?**
- Check `canShowInterstitial()` return value
- Verify session hasn't reached limit
- Reset with `resetAdSession()`

**Mobile build errors?**
- Ensure react-native-google-mobile-ads is properly installed
- Check app.config.js plugin configuration
- Verify app IDs format

---

**Ready to monetize?** Follow the setup steps above and start earning from your free tier users! 🚀
