# Database Documentation

## Overview

Predictify Sports uses Supabase (PostgreSQL) as its database with Row Level Security (RLS) enabled for all tables.

## Schema

### Tables

#### profiles
User profile information extending Supabase Auth.

**RLS Policies:**
- Users can view their own profile
- Users can update their own profile

#### predictions
User predictions for matches.

**RLS Policies:**
- Users can view their own predictions
- Users can create their own predictions
- Users can update their own predictions

#### user_stats
User prediction statistics with automatic updates via triggers.

#### featured_matches
Admin-curated featured matches (public read).

#### notifications
User notifications.

#### audit_logs
Admin action audit trail.

## Security

All tables have Row Level Security (RLS) enabled. Users can only access their own data unless explicitly permitted.

## Running Migrations

1. Go to Supabase SQL Editor
2. Copy contents of `supabase/migrations/001_initial_schema.sql`
3. Run the SQL

See full schema details in `supabase/migrations/001_initial_schema.sql`
