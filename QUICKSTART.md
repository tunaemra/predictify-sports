# Quick Start Guide

Get Predictify Sports running in 5 minutes! ⚡

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account (free tier works)

## Step 1: Clone & Install (1 min)

```bash
# Clone the repository
git clone https://github.com/tunaemra/predictify-sports.git
cd predictify-sports

# Install dependencies
npm install
```

## Step 2: Set Up Supabase (2 min)

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Name it: `predictify-sports`
4. Choose region closest to you
5. Set a strong database password
6. Click "Create new project"

### Get Your Credentials

1. Wait for project to be created (~2 minutes)
2. Go to **Settings** → **API**
3. Copy:
   - `Project URL`
   - `anon public` key

### Configure Environment

```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local and add your credentials
# NEXT_PUBLIC_SUPABASE_URL=your_project_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Step 3: Set Up Database (1 min)

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste migration files in order:

```sql
-- Run these one by one:
1. supabase/migrations/000_core.sql
2. supabase/migrations/001_gamification.sql
3. supabase/migrations/002_social.sql
4. supabase/migrations/003_tournament_referral.sql
5. supabase/migrations/004_seed_achievements.sql
```

4. Click **Run** for each file

**OR** use the Supabase CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## Step 4: Start Development Server (30 sec)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## Step 5: Explore the App (30 sec)

### Main Pages

- **Home**: [http://localhost:3000](http://localhost:3000)
  - Overview of all features
  
- **Gamification Demo**: [http://localhost:3000/gamification](http://localhost:3000/gamification)
  - Interactive demo of all gamification components
  - See levels, achievements, streaks, leaderboard

### API Endpoints

Test the API routes:

```bash
# Get user level (replace USER_ID with a real UUID)
curl http://localhost:3000/api/gamification/level/USER_ID

# Get achievements
curl http://localhost:3000/api/gamification/achievements/USER_ID

# Get leaderboard
curl http://localhost:3000/api/gamification/leaderboard?period=all-time
```

## Common Issues & Solutions

### Issue: "Module not found"

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: "Supabase connection error"

1. Check your `.env.local` file exists
2. Verify credentials are correct
3. Ensure no extra spaces in env vars
4. Restart dev server

### Issue: "Database error"

1. Make sure all migrations ran successfully
2. Check table exists in Supabase Dashboard → Table Editor
3. Verify RLS policies (may need to disable for development)

### Issue: TypeScript errors

```bash
# Type check
npm run type-check

# Fix auto-fixable issues
npm run lint --fix
```

## Next Steps

### Development

1. **Read the docs**:
   - [README.md](README.md) - Full documentation
   - [IMPLEMENTATION.md](IMPLEMENTATION.md) - Architecture details
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy to production

2. **Start building**:
   - Add authentication (Supabase Auth)
   - Create match prediction features
   - Implement social features

3. **Customize**:
   - Modify components in `src/components/`
   - Add new API routes in `src/app/api/`
   - Create new services in `src/services/`

### Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

### Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick deploy to Vercel**:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## File Structure Guide

```
predictify-sports/
├── src/
│   ├── app/                  # Pages & routes
│   │   ├── page.tsx         # Home page
│   │   ├── gamification/    # Demo page
│   │   └── api/             # API routes
│   ├── components/          # React components
│   ├── services/            # Business logic
│   ├── lib/                 # Utilities
│   └── types/               # TypeScript types
├── supabase/
│   └── migrations/          # Database schema
├── public/                  # Static files
└── [config files]           # Various configs
```

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server

# Code Quality
npm run type-check       # TypeScript check
npm run lint             # ESLint check
npm run format           # Format code (if prettier installed)

# Database
supabase db push         # Run migrations
supabase db reset        # Reset database
supabase db dump         # Backup database
```

## Getting Help

### Documentation
- [Full README](README.md)
- [Implementation Guide](IMPLEMENTATION.md)
- [Deployment Guide](DEPLOYMENT.md)

### Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

### Community
- Open an issue on GitHub
- Check existing documentation
- Review code comments

## Congratulations! 🎉

You now have a fully functional gamification system running locally!

**What's next?**
- Explore the [demo page](http://localhost:3000/gamification)
- Read the [implementation guide](IMPLEMENTATION.md)
- Start building your features
- Have fun! ⚽🎮

---

**Quick Start completed!** You're ready to build the world's best sports prediction platform! 🚀
