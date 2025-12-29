# Deployment Guide

## Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details:
   - Project name: predictify-sports
   - Database password: (strong password)
   - Region: (closest to your users)

### 2. Run Migrations

1. Go to SQL Editor in Supabase Dashboard
2. Run migrations in order:
   ```
   supabase/migrations/000_core.sql
   supabase/migrations/001_gamification.sql
   supabase/migrations/002_social.sql
   supabase/migrations/003_tournament_referral.sql
   supabase/migrations/004_seed_achievements.sql
   ```

### 3. Configure Authentication

1. Go to Authentication → Settings
2. Enable email authentication
3. Configure email templates
4. Set up OAuth providers (optional):
   - Google
   - Facebook
   - Twitter/X

### 4. Set Up Storage (Optional)

1. Go to Storage
2. Create buckets:
   - `avatars` - User profile pictures
   - `match-images` - Match/team images

### 5. Configure Row Level Security

Enable RLS policies for security:

```sql
-- Profiles: Users can read all, update their own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Similar policies for other tables
```

## Vercel Deployment

### 1. Push to GitHub

```bash
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure:
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Environment Variables

Add in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these from Supabase Dashboard → Settings → API

### 4. Deploy

Click "Deploy" - Vercel will:
1. Install dependencies
2. Run build
3. Deploy to production

## Custom Domain (Optional)

### Vercel

1. Go to Project → Settings → Domains
2. Add your domain
3. Configure DNS:
   - Type: CNAME
   - Name: www (or @)
   - Value: cname.vercel-dns.com

### Supabase Custom Domain

1. Go to Supabase → Settings → Custom Domains
2. Add your API domain
3. Update environment variables with custom domain

## Environment Setup

### Development
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key
```

### Production
```env
# Vercel Environment Variables
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
```

## Post-Deployment Checklist

- [ ] Test all API routes
- [ ] Verify authentication works
- [ ] Check database migrations applied
- [ ] Test gamification features
- [ ] Verify environment variables
- [ ] Set up monitoring (Vercel Analytics)
- [ ] Configure error tracking (Sentry, optional)
- [ ] Test mobile responsiveness
- [ ] Check performance (Lighthouse)
- [ ] Set up backups (Supabase auto-backup)

## Monitoring

### Vercel Analytics

1. Go to Project → Analytics
2. View:
   - Page views
   - Performance metrics
   - Visitor data

### Supabase Monitoring

1. Go to Database → Logs
2. Monitor:
   - Query performance
   - Error logs
   - API usage

## Scaling

### Database

Supabase auto-scales, but for high traffic:
1. Upgrade to Pro plan
2. Enable connection pooling
3. Add read replicas
4. Optimize queries with indexes

### Frontend

Vercel scales automatically:
- Serverless functions
- Edge caching
- Global CDN

## Backup & Recovery

### Database Backups

Supabase Pro includes:
- Daily automated backups
- Point-in-time recovery
- Manual backup via CLI:
  ```bash
  supabase db dump > backup.sql
  ```

### Code Backups

- GitHub repository (version control)
- Vercel deployment history

## Security

### Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use Vercel secrets for sensitive data
   - Rotate keys regularly

2. **Database Security**
   - Enable RLS on all tables
   - Validate user input
   - Use prepared statements

3. **API Security**
   - Rate limiting
   - CORS configuration
   - Authentication on protected routes

4. **Frontend Security**
   - Content Security Policy
   - XSS protection
   - HTTPS only

## Troubleshooting

### Build Fails

```bash
# Local build test
npm run build

# Check TypeScript errors
npm run type-check

# Check linting
npm run lint
```

### Database Connection Issues

- Verify Supabase URL and key
- Check RLS policies
- Review API logs in Supabase

### Performance Issues

- Enable caching
- Optimize images (Next.js Image)
- Use CDN for assets
- Minimize bundle size

## CI/CD Setup (Optional)

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run type-check
```

## Support

For deployment issues:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)

---

Last updated: December 2025
