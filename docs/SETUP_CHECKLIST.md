# 🎯 Setup Checklist

Complete this checklist to deploy the advertisement integration.

## ✅ Prerequisites

- [ ] Node.js 18+ installed
- [ ] PostgreSQL or Supabase account
- [ ] Monetag account (for web ads)
- [ ] Google AdMob account (for mobile ads)
- [ ] Stripe account (for subscriptions)

## 🗄️ Database Setup

- [ ] Database created (PostgreSQL/Supabase)
- [ ] Run `database/schema-ads.sql` migration
- [ ] Verify tables created: `ad_impressions`, `ad_rewards`
- [ ] Test analytics views: `ad_analytics_daily`, `ad_analytics_monthly`
- [ ] Test helper functions: `track_ad_impression`, `add_bonus_xp`

## 🌐 Web Setup (Monetag)

### Account Setup
- [ ] Create Monetag account at https://monetag.com
- [ ] Create ad zones:
  - [ ] Banner 728x90 (top)
  - [ ] Banner 728x90 (bottom)
  - [ ] Banner 160x600 (sidebar)
  - [ ] Native ad zone
  - [ ] Interstitial zone
  - [ ] Pop-under zone
- [ ] Copy all zone IDs

### Code Setup
- [ ] Copy `web/.env.example` to `web/.env.local`
- [ ] Add Monetag zone IDs to `.env.local`
- [ ] Run `npm install` in web directory
- [ ] Add `initMonetag()` to app layout
- [ ] Integrate banner components
- [ ] Add native ads to content lists
- [ ] Add interstitial component
- [ ] Add upgrade prompts

### Testing
- [ ] Test ads showing for free users
- [ ] Test ads hidden for Pro/VIP users
- [ ] Test frequency limits working
- [ ] Check browser console for errors
- [ ] Verify analytics tracking

## 📱 Mobile Setup (AdMob)

### Account Setup
- [ ] Create Google AdMob account at https://admob.google.com
- [ ] Create iOS app in AdMob
- [ ] Create Android app in AdMob
- [ ] Create ad units for iOS:
  - [ ] Banner ad unit
  - [ ] Interstitial ad unit
  - [ ] Rewarded video ad unit
- [ ] Create ad units for Android:
  - [ ] Banner ad unit
  - [ ] Interstitial ad unit
  - [ ] Rewarded video ad unit
- [ ] Copy all app IDs and ad unit IDs

### Code Setup
- [ ] Copy `mobile/.env.example` to `mobile/.env`
- [ ] Add AdMob IDs to `.env`
- [ ] Update `app.config.js` with AdMob plugin
- [ ] Run `npx expo install react-native-google-mobile-ads`
- [ ] Integrate AdMobBanner component
- [ ] Add interstitial ad hook
- [ ] Add rewarded ad hook
- [ ] Integrate RewardedAdButton

### Testing
- [ ] Test on iOS simulator/device
- [ ] Test on Android emulator/device
- [ ] Test ads showing for free users
- [ ] Test ads hidden for Pro/VIP users
- [ ] Test rewarded ads granting bonuses
- [ ] Verify analytics tracking

## 🔐 Environment Variables

### Web (.env.local)
```env
NEXT_PUBLIC_MONETAG_BANNER_TOP=________
NEXT_PUBLIC_MONETAG_BANNER_BOTTOM=________
NEXT_PUBLIC_MONETAG_BANNER_SIDE=________
NEXT_PUBLIC_MONETAG_INTERSTITIAL=________
NEXT_PUBLIC_MONETAG_NATIVE=________
NEXT_PUBLIC_MONETAG_POPUNDER=________
```

### Mobile (.env)
```env
ADMOB_IOS_APP_ID=ca-app-pub-________~________
ADMOB_ANDROID_APP_ID=ca-app-pub-________~________
ADMOB_IOS_BANNER=ca-app-pub-________/________
ADMOB_ANDROID_BANNER=ca-app-pub-________/________
ADMOB_IOS_INTERSTITIAL=ca-app-pub-________/________
ADMOB_ANDROID_INTERSTITIAL=ca-app-pub-________/________
ADMOB_IOS_REWARDED=ca-app-pub-________/________
ADMOB_ANDROID_REWARDED=ca-app-pub-________/________
```

## 🧪 Testing Phase

### Development Testing
- [ ] Use test ad IDs (already configured)
- [ ] Test all ad types showing
- [ ] Test frequency limiting
- [ ] Test subscription tier filtering
- [ ] Test rewarded ad bonuses
- [ ] Test upgrade prompts

### Pre-Production Testing
- [ ] Replace test IDs with production IDs
- [ ] Test on staging environment
- [ ] Monitor analytics for test impressions
- [ ] Verify revenue tracking
- [ ] Test on multiple devices/browsers

## 📊 Analytics & Monitoring

- [ ] Set up analytics dashboard
- [ ] Monitor daily impressions
- [ ] Track revenue per ad type
- [ ] Monitor conversion rates (free → paid)
- [ ] Set up alerts for issues
- [ ] Review performance weekly

## 🚀 Production Deployment

### Final Checks
- [ ] All test IDs replaced with production
- [ ] Environment variables set in production
- [ ] Database migrations run in production
- [ ] SSL certificates valid
- [ ] Privacy policy updated
- [ ] Terms of service updated

### Launch
- [ ] Deploy web app
- [ ] Deploy mobile app to App Store
- [ ] Deploy mobile app to Play Store
- [ ] Monitor error logs
- [ ] Check ad impressions
- [ ] Verify revenue tracking

## 📈 Post-Launch

### Week 1
- [ ] Monitor ad performance daily
- [ ] Check error rates
- [ ] Review user feedback
- [ ] Adjust frequency limits if needed
- [ ] Optimize ad placements

### Month 1
- [ ] Review revenue vs. estimates
- [ ] Analyze conversion rates
- [ ] A/B test ad placements
- [ ] Optimize upgrade prompts
- [ ] Survey user satisfaction

### Ongoing
- [ ] Monthly revenue reports
- [ ] Quarterly optimization
- [ ] Update ad strategies
- [ ] Test new ad formats
- [ ] Monitor compliance

## 🔒 Compliance

- [ ] GDPR compliance checked
- [ ] Privacy policy includes ad disclosure
- [ ] Cookie consent for EU users
- [ ] Non-personalized ads option
- [ ] COPPA compliance (no ads to children)
- [ ] App store ad policies reviewed

## 📚 Documentation

- [ ] Team trained on ad system
- [ ] Documentation reviewed
- [ ] Examples tested
- [ ] Troubleshooting guide available
- [ ] Support team briefed

## 🎯 Success Metrics

Target metrics to track:
- [ ] Daily active free users: 1,000+
- [ ] Ad impressions/user: 10+
- [ ] Monthly ad revenue: $1,000+
- [ ] Conversion rate: 2-5%
- [ ] User satisfaction: 4+/5

---

**Complete all items before launching to production!** ✅
