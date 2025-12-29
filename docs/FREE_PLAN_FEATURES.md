# Free Plan Features Configuration
# Complete feature set for free tier with ad monetization

## 🆓 Free Plan Features

```typescript
interface FreePlanFeatures {
  predictions: {
    daily_limit: 3,
    types: ['result', 'over_under', 'btts'],
  },
  matches: {
    access: 'basic_info_only',
    detailed_stats: false,
  },
  leaderboard: {
    view_only: true,
  },
  gamification: {
    levels: true,
    basic_achievements: true,
    advanced_achievements: false,
  },
  ai: {
    predictions: false,
    chat: false,
  },
  social: {
    friends: false,
    groups: false,
    sharing: false,
  },
  analytics: {
    basic_stats: true,
    advanced_dashboard: false,
    pdf_export: false,
  },
  ads: {
    web: {
      banners: true,
      native: true,
      interstitial: true,
      popunder: true,
    },
    mobile: {
      banners: true,
      interstitial: true,
      rewarded_available: true,
    },
  },
  bonus: {
    watch_ad_for_prediction: true,  // +1 tahmin
    watch_ad_for_xp: true,          // +50 XP
    watch_ad_for_ai: true,          // 1 AI tahmin
  }
}
```

## 💎 Pro Plan Features

```typescript
interface ProPlanFeatures {
  predictions: {
    daily_limit: 20,
    types: ['all'],
  },
  matches: {
    access: 'full_stats',
    detailed_stats: true,
  },
  leaderboard: {
    participate: true,
    private_leagues: true,
  },
  gamification: {
    levels: true,
    basic_achievements: true,
    advanced_achievements: true,
  },
  ai: {
    predictions: true,
    daily_limit: 5,
    chat: false,
  },
  social: {
    friends: true,
    groups: 'create_join',
    sharing: true,
  },
  analytics: {
    basic_stats: true,
    advanced_dashboard: true,
    pdf_export: true,
  },
  ads: {
    web: {
      banners: false,
      native: false,
      interstitial: false,
      popunder: false,
    },
    mobile: {
      banners: false,
      interstitial: false,
      rewarded_available: false,
    },
  },
  price: {
    monthly: '₺49.99',
    yearly: '₺499.99',
  }
}
```

## 👑 VIP Plan Features

```typescript
interface VIPPlanFeatures {
  predictions: {
    daily_limit: 'unlimited',
    types: ['all'],
  },
  matches: {
    access: 'full_stats',
    detailed_stats: true,
    live_data: true,
  },
  leaderboard: {
    participate: true,
    private_leagues: true,
    vip_badge: true,
  },
  gamification: {
    levels: true,
    basic_achievements: true,
    advanced_achievements: true,
    exclusive_achievements: true,
  },
  ai: {
    predictions: true,
    daily_limit: 'unlimited',
    chat: true,
    priority_support: true,
  },
  social: {
    friends: true,
    groups: 'unlimited',
    sharing: true,
    exclusive_features: true,
  },
  analytics: {
    basic_stats: true,
    advanced_dashboard: true,
    pdf_export: true,
    custom_reports: true,
  },
  ads: {
    web: {
      banners: false,
      native: false,
      interstitial: false,
      popunder: false,
    },
    mobile: {
      banners: false,
      interstitial: false,
      rewarded_available: false,
    },
  },
  price: {
    monthly: '₺149.99',
    yearly: '₺1,499.99',
  }
}
```

## 🎯 Conversion Funnel

```
Free User (with ads)
       ↓
Sees ads + limitations
       ↓
"Upgrade to Pro" prompts
       ↓
Pricing page
       ↓
Stripe checkout
       ↓
Pro/VIP User (no ads)
```

**Target Conversion Rate:** 2-5%
- 1,000 free users → 20-50 upgrade
- 20 × ₺49.99 = ~₺1,000/month

## 💰 Revenue Sources

```
Revenue Breakdown:
├── Ads (Free users):      $1,000-1,200/month
│   ├── Web (Monetag):     $450-600
│   └── Mobile (AdMob):    $600
├── Pro Subscriptions:     ₺1,000/month
│   └── 20 users × ₺49.99
└── VIP Subscriptions:     ₺750/month
    └── 5 users × ₺149.99

Total Monthly:             ~$2,000-2,500
```

## 📊 Ad Placement Strategy

### Web
- **Homepage**: Top banner (728x90) + sidebar (160x600)
- **Match List**: Native ad every 5 matches
- **Match Detail**: Bottom banner (728x90)
- **Interstitial**: After predictions, page transitions (max 1/5min)

### Mobile
- **Home Screen**: Top/bottom banner
- **Match List**: Native ads between matches
- **Interstitial**: After predictions (max 1/3min)
- **Rewarded**: Bonus features (+XP, +predictions, +AI)

## 🎁 Rewarded Ad Bonuses

Free users can watch ads to earn:
- **+50 XP**: Watch ad → gain experience
- **+1 Prediction**: Watch ad → extra prediction
- **+1 AI Credit**: Watch ad → 1 AI-powered prediction

This creates engagement while monetizing without forcing ads.
