# Supabase Configuration

This directory contains database migrations for the Predictify Sports platform.

## Running Migrations

### Option 1: Using Supabase CLI

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Link your project:
```bash
supabase link --project-ref your-project-ref
```

3. Run migrations:
```bash
supabase db push
```

### Option 2: Manual Execution

1. Log in to your Supabase dashboard
2. Go to SQL Editor
3. Run migrations in order:
   - `000_core.sql` - Core tables (users, matches, predictions)
   - `001_gamification.sql` - Gamification tables
   - `002_social.sql` - Social features tables
   - `003_tournament_referral.sql` - Tournament and referral tables
   - `004_seed_achievements.sql` - Seed achievement data

## Migration Files

### 000_core.sql
Creates core platform tables:
- `profiles` - User profiles extending auth.users
- `matches` - Match information
- `predictions` - User predictions

### 001_gamification.sql
Creates gamification system tables:
- `user_levels` - User XP and levels
- `achievements` - Achievement definitions
- `user_achievements` - Unlocked achievements
- `leaderboards` - Rankings by period
- `streaks` - Prediction streaks
- `weekly_challenges` - Weekly competitions
- `daily_quests` - Daily quest definitions
- `user_quest_progress` - User quest progress

### 002_social.sql
Creates social feature tables:
- `friendships` - Friend connections
- `shared_predictions` - Shared predictions
- `comments` - Prediction comments
- `groups` - User groups
- `group_members` - Group memberships

### 003_tournament_referral.sql
Creates tournament and referral tables:
- `referrals` - User referrals
- `tournaments` - Tournament definitions
- `tournament_participants` - Tournament entries
- `coupons` - Multi-prediction coupons

### 004_seed_achievements.sql
Seeds initial achievement data:
- Prediction achievements
- Time-based achievements
- Premium achievements
- League-specific achievements
- Special achievements

## Database Functions

### update_updated_at_column()
Automatically updates `updated_at` timestamp on row updates.

Applied to tables:
- user_levels
- streaks
- leaderboards
- friendships
- groups
- referrals
- tournaments
- coupons
- profiles
- matches

## Indexes

Performance indexes are created on:
- Foreign keys
- Frequently queried fields
- Leaderboard period and rank
- User lookups
- Date fields

## Row Level Security (RLS)

⚠️ **Important**: After running migrations, configure RLS policies in Supabase dashboard for production security.

Recommended policies:
- Users can read their own data
- Users can update their own profiles
- Public read for leaderboards
- Private write for sensitive operations

## Backup

Before running migrations in production:
```bash
# Create backup
supabase db dump > backup.sql

# Restore if needed
supabase db reset
psql -h db.your-project.supabase.co -U postgres -f backup.sql
```

## Troubleshooting

**Error: uuid_generate_v4() does not exist**
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

**Error: auth.users does not exist**
- Ensure Supabase Auth is enabled
- Run migrations after project initialization

**Foreign key constraint errors**
- Run migrations in correct order (000 → 004)
- Ensure referenced tables exist

## Local Development

For local development with Supabase:

```bash
# Start local Supabase
supabase start

# Run migrations
supabase db reset

# Stop local Supabase
supabase stop
```

## Environment Variables

Set in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Get these from: Supabase Dashboard → Settings → API
