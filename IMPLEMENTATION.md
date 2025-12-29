# Gamification System Implementation Guide

## Overview

This document provides a comprehensive guide to the gamification system implementation in Predictify Sports platform.

## Architecture

### Layer Structure

```
┌─────────────────────────────┐
│      UI Components          │
│   (React Components)        │
├─────────────────────────────┤
│      API Routes             │
│   (Next.js API)             │
├─────────────────────────────┤
│    Service Layer            │
│  (Business Logic)           │
├─────────────────────────────┤
│      Supabase               │
│  (Database & Auth)          │
└─────────────────────────────┘
```

## Key Components

### 1. Type Definitions (`src/types/`)

All TypeScript interfaces are defined for type safety:

- `gamification.ts` - Levels, achievements, leaderboards, streaks
- `prediction.ts` - Core prediction types
- `social.ts` - Social features
- `tournament.ts` - Tournaments and referrals

### 2. Service Layer (`src/services/`)

**GamificationService** handles all gamification business logic:

```typescript
// Key Methods:
- getUserLevel(userId) - Get user level info
- awardXP(userId, amount, reason) - Award XP and handle level ups
- getUserAchievements(userId) - Get unlocked achievements
- unlockAchievement(userId, achievementId) - Unlock new achievement
- updateStreak(userId, isCorrect) - Update prediction streak
- getLeaderboard(period, limit) - Get leaderboard rankings
- updateLeaderboard(userId, ...) - Update user's leaderboard entry
```

### 3. API Routes (`src/app/api/gamification/`)

RESTful API endpoints:

```
GET /api/gamification/level/[userId]
GET /api/gamification/achievements/[userId]
GET /api/gamification/leaderboard?period=daily&limit=100
```

### 4. UI Components (`src/components/gamification/`)

Reusable React components:

- **LevelDisplay** - Shows user level, XP, and progress
- **AchievementBadge** - Individual achievement card
- **AchievementsGrid** - Grid of all achievements
- **StreakDisplay** - Current and best streak with visual indicator
- **Leaderboard** - Rankings table with period selector

## Database Schema

### Core Tables

#### user_levels
Stores user progression data:
```sql
- user_id (PK)
- level (1-100)
- xp (current experience points)
- title (level title)
- created_at, updated_at
```

#### achievements
Master list of all achievements:
```sql
- id (PK)
- name
- description
- icon (emoji)
- rarity (common/rare/epic/legendary)
- xp_reward
- condition_type
- condition_value
```

#### user_achievements
Tracks unlocked achievements per user:
```sql
- user_id (FK)
- achievement_id (FK)
- unlocked_at
```

#### leaderboards
Rankings per period:
```sql
- id (PK)
- period (daily/weekly/monthly/all-time)
- user_id (FK)
- rank
- score
- accuracy_rate
- total_predictions
```

#### streaks
Tracks consecutive correct predictions:
```sql
- user_id (PK)
- current (current streak count)
- best (best streak ever)
- last_prediction_date
```

## XP System

### XP Formula

Level progression uses an exponential formula:
```
XP for Level N = 100 × N^1.5
```

Examples:
- Level 2: 282 XP
- Level 10: 3,162 XP
- Level 50: 35,355 XP
- Level 100: 100,000 XP

### XP Sources

```typescript
const XP_AWARDS = {
  PREDICTION_MADE: 10,
  CORRECT_PREDICTION: 50,
  STREAK_3: 100,
  DAILY_LOGIN: 5,
  PROFILE_COMPLETE: 25,
  FIRST_VIP: 500,
  FRIEND_INVITE: 75,
}
```

## Level Titles

```
1-10:   🌱 Çaylak
11-25:  ⚽ Tahminci
26-50:  🎯 Uzman
51-75:  🏆 Master
76-99:  👑 Legend
100:    💎 Grandmaster
```

## Achievement System

### Achievement Categories

1. **Prediction Achievements**
   - First prediction
   - Streaks (5, 10 consecutive)
   - Accuracy milestones
   - Total correct predictions

2. **Time-based Achievements**
   - Login streaks
   - Account age milestones

3. **Premium Achievements**
   - VIP/Pro subscriptions
   - Early adopter

4. **League Achievements**
   - League-specific prediction counts

5. **Special Achievements**
   - High-risk predictions
   - Underdog predictions
   - Over/under specialization

### Rarity System

- **Common** (Gray) - Easy to achieve
- **Rare** (Blue) - Moderate difficulty
- **Epic** (Purple) - Hard to achieve
- **Legendary** (Gold) - Very rare

## Streak System

### How It Works

1. User makes prediction
2. When match resolves:
   - If correct: Increment streak (if consecutive day)
   - If incorrect: Reset to 0
3. Update best streak if current > best
4. Award bonuses:
   - 3 streak: +100 XP
   - 5 streak: +100 XP + "Ateş Topu" badge
   - 10 streak: +500 XP + "Şimşek" badge

### Consecutive Day Logic

Streak continues if:
- Previous prediction was yesterday
- Current prediction is today
- Both predictions were correct

## Leaderboard System

### Periods

- **Daily** - Resets every 24 hours
- **Weekly** - Resets every Monday
- **Monthly** - Resets on 1st of month
- **All-time** - Never resets

### Score Calculation

```
Score = (Correct Predictions × 10) + Streak Bonuses + XP
```

### Ranking

Users are ranked by:
1. Score (primary)
2. Accuracy rate (tiebreaker)
3. Total predictions (tiebreaker)

## Integration Guide

### Adding Gamification to Predictions

```typescript
import { gamificationService } from '@/services/gamification.service';

// When user makes a prediction
await gamificationService.awardXP(
  userId, 
  XP_AWARDS.PREDICTION_MADE, 
  'Prediction made'
);

// When prediction is resolved
if (predictionCorrect) {
  await gamificationService.awardXP(
    userId, 
    XP_AWARDS.CORRECT_PREDICTION, 
    'Correct prediction'
  );
  
  // Update streak
  await gamificationService.updateStreak(userId, true);
  
  // Check for achievements
  await checkPredictionAchievements(userId);
}

// Update leaderboard
await gamificationService.updateLeaderboard(
  userId,
  score,
  accuracyRate,
  totalPredictions
);
```

### Using Components

```tsx
import { LevelDisplay } from '@/components/gamification/LevelDisplay';
import { StreakDisplay } from '@/components/gamification/StreakDisplay';
import { Leaderboard } from '@/components/gamification/Leaderboard';

function ProfilePage({ userId }) {
  const [userLevel, setUserLevel] = useState(null);
  const [streak, setStreak] = useState(null);
  
  // Fetch data
  useEffect(() => {
    fetch(`/api/gamification/level/${userId}`)
      .then(res => res.json())
      .then(setUserLevel);
  }, [userId]);
  
  return (
    <div>
      {userLevel && <LevelDisplay userLevel={userLevel} />}
      {streak && <StreakDisplay streak={streak} />}
    </div>
  );
}
```

## Best Practices

### 1. Performance

- Use database indexes on frequently queried fields
- Cache leaderboard data (update periodically)
- Batch XP updates when possible

### 2. Consistency

- Always use transactions for XP + level updates
- Validate achievement conditions server-side
- Keep UI and database in sync

### 3. User Experience

- Show visual feedback for XP gains
- Celebrate level ups with animations
- Display achievement unlock notifications
- Make progression feel rewarding

### 4. Scalability

- Use database functions for complex calculations
- Implement periodic jobs for leaderboard updates
- Consider caching for high-traffic endpoints

## Future Enhancements

### Phase 2
- Daily quests system
- Weekly challenges
- Quest chains
- Special events

### Phase 3
- Seasons/Leagues
- Battle pass
- Cosmetic rewards
- Profile customization

### Phase 4
- Clan/Team competitions
- Global tournaments
- Live events
- Prize pools

## Troubleshooting

### Common Issues

**XP not updating**
- Check Supabase connection
- Verify user_id exists in user_levels
- Check for database errors

**Achievements not unlocking**
- Verify condition logic
- Check achievement_id is correct
- Ensure not already unlocked

**Leaderboard showing wrong ranks**
- Run rank recalculation job
- Check period filter
- Verify score calculation

## Support

For issues or questions, please refer to:
- Main README.md
- Supabase documentation
- Next.js documentation

---

Last updated: December 2025
Version: 1.0.0
