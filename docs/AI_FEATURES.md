# 🤖 AI Features Documentation

This document describes the AI-powered features implemented in Predictify Sports.

## Overview

Predictify Sports integrates OpenAI's GPT-4 Turbo to provide intelligent football match predictions, analysis, and personalized recommendations.

## Features

### 1. AI Prediction Engine 🎯

**Description:** Generates detailed match predictions using historical data, team form, and head-to-head statistics.

**Subscription Access:**
- ❌ Free: Not available
- ✅ Pro: 10 predictions per day
- ✅ VIP: Unlimited predictions

**API Endpoint:** `POST /api/ai/predict`

**Request Body:**
```json
{
  "userId": "user-uuid",
  "matchData": {
    "matchId": "match-123",
    "homeTeam": {
      "name": "Real Madrid",
      "form": "WWDWW",
      "homeStats": { "played": 10, "won": 7, "drawn": 2, "lost": 1 },
      "avgGoals": { "scored": 2.3, "conceded": 0.8 }
    },
    "awayTeam": {
      "name": "Barcelona",
      "form": "WLWDW",
      "awayStats": { "played": 10, "won": 5, "drawn": 3, "lost": 2 },
      "avgGoals": { "scored": 1.9, "conceded": 1.2 }
    },
    "h2h": {
      "homeWins": 3,
      "draws": 1,
      "awayWins": 1,
      "lastMatches": ["1-0", "2-2", "3-1", "0-1", "2-1"]
    },
    "league": "La Liga",
    "matchDate": "2025-12-29"
  }
}
```

### 2. AI Chat Assistant 💬

**Description:** Interactive chat bot for asking questions about matches, getting analysis, and receiving recommendations.

**Subscription Access:**
- ❌ Free: Not available
- ❌ Pro: Not available
- ✅ VIP: 100 messages per day

### 3. Personalized Recommendations 🎁

**Description:** ML-based recommendations based on user's prediction history and success patterns.

**Subscription Access:**
- ❌ Free: Not available
- ❌ Pro: Not available
- ✅ VIP: Unlimited access

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# OpenAI Configuration
OPENAI_API_KEY=sk-...
OPENAI_ORG_ID=org-...

# AI Configuration
AI_ENABLED=true
AI_MODEL=gpt-4-turbo-preview
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=2000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Database Setup

Run the migration file: `supabase/migrations/001_initial_ai_schema.sql`

**Tables Created:**
- `profiles` - User profiles with subscription tiers
- `ai_predictions` - Stored AI predictions (cached)
- `ai_chat_messages` - Chat conversation history
- `user_ai_usage` - Daily usage tracking
- `predictions` - User's own predictions
- `personalized_recommendations` - AI-generated recommendations

### 3. Install Dependencies

```bash
npm install openai @supabase/supabase-js
```

### 4. Run Development Server

```bash
npm run dev
```

Visit:
- Homepage: http://localhost:3000
- Demo: http://localhost:3000/demo

## Subscription Tiers

| Feature | Free | Pro (₺49.99/mo) | VIP (₺149.99/mo) |
|---------|------|-----------------|------------------|
| AI Predictions | ❌ | 10/day | ✅ Unlimited |
| AI Chat | ❌ | ❌ | ✅ 100/day |
| Personalized Recommendations | ❌ | ❌ | ✅ |
| Live Updates | ❌ | ❌ | ✅ |
| Advanced Analysis | ❌ | ✅ | ✅ |
| Priority Processing | ❌ | ❌ | ✅ |

## Rate Limiting

Rate limits are enforced per user per day:
- **Pro**: 10 AI predictions per day
- **VIP**: Unlimited predictions, 100 chat messages per day

Limits reset daily at midnight UTC.

## Testing

Visit the demo page at `/demo` to test all features with different subscription tiers.
