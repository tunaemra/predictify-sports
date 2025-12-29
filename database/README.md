# Advertisement Integration - Database Setup

This directory contains the database schema for the advertisement integration system.

## Schema Files

### `schema-ads.sql`
Complete database schema for ad tracking and rewards including:
- **ad_impressions**: Tracks every ad shown to users
- **ad_rewards**: Records rewards from watching rewarded video ads
- **Analytics views**: Daily and monthly performance metrics
- **Helper functions**: Track impressions and add rewards

## Setup Instructions

### 1. Prerequisites
- PostgreSQL database (Supabase recommended)
- Access to run SQL migrations

### 2. Running the Migration

#### Using Supabase Dashboard
1. Navigate to SQL Editor in Supabase Dashboard
2. Copy contents of `schema-ads.sql`
3. Execute the SQL

#### Using psql
```bash
psql -h your-db-host -U your-user -d your-database -f database/schema-ads.sql
```

#### Using Supabase CLI
```bash
supabase db push
```

### 3. Post-Installation

After running the migration, update the following:

1. **Verify profiles table exists** with these columns (add if missing):
   - `subscription_tier` (text) - User's plan: 'free', 'pro', or 'vip'
   - `xp` (integer) - User experience points
   - `bonus_predictions` (integer) - Extra predictions from ads
   - `bonus_ai_credits` (integer) - Extra AI credits from ads

2. **Uncomment UPDATE statements** in reward functions once profiles structure is confirmed

## Usage Examples

### Track an Ad Impression
```sql
SELECT track_ad_impression(
  'user-uuid-here',
  'banner',
  'monetag',
  'home_top',
  0.001  -- estimated revenue in dollars
);
```

### Add Bonus XP
```sql
SELECT add_bonus_xp('user-uuid-here', 50);
```

### Add Bonus Prediction
```sql
SELECT add_bonus_prediction('user-uuid-here', 1);
```

### View Daily Analytics
```sql
SELECT * FROM ad_analytics_daily 
WHERE date >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY date DESC;
```

### View Monthly Revenue
```sql
SELECT 
  month,
  SUM(total_revenue) as monthly_revenue
FROM ad_analytics_monthly
WHERE month >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '12 months')
GROUP BY month
ORDER BY month DESC;
```

## Security Considerations

1. **Row Level Security (RLS)**: Enable RLS on tables and create appropriate policies
2. **User Privacy**: Consider GDPR compliance for tracking data
3. **Revenue Data**: Restrict access to revenue columns for admin users only

## Monitoring

Monitor these metrics:
- Daily impression counts by ad type
- Revenue per thousand impressions (RPM)
- Reward distribution patterns
- User engagement with rewarded ads
