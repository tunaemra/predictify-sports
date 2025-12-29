# ⚽ Predictify Sports

AI-Powered Football Prediction Platform

## 🤖 Features

- **AI Prediction Engine**: GPT-4 powered match analysis and predictions
- **AI Chat Assistant**: Interactive chat for match queries and recommendations (VIP only)
- **Personalized Recommendations**: ML-based suggestions based on user history (VIP only)
- **Live Updates**: Real-time AI analysis during matches (VIP only)
- **Multi-tier Subscriptions**: Free, Pro (₺49.99/mo), VIP (₺149.99/mo)

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (copy `.env.example` to `.env.local`):
   ```bash
   cp .env.example .env.local
   ```

4. Configure your OpenAI and Supabase credentials in `.env.local`

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to see the app
7. Visit [http://localhost:3000/demo](http://localhost:3000/demo) for a feature demo

## 📚 Documentation

- [AI Features Documentation](./docs/AI_FEATURES.md)
- Database migrations: `./supabase/migrations/`

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **AI**: OpenAI GPT-4 Turbo
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (recommended)

## 📋 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/ai/            # AI API routes
│   │   ├── predict/       # Match prediction endpoint
│   │   ├── chat/          # AI chat endpoint
│   │   └── recommendations/ # Personalized recommendations
│   ├── demo/              # Feature demo page
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── AIPredictionCard.tsx
│   └── AIChatWidget.tsx
├── lib/                   # Utility libraries
│   ├── openai.ts         # OpenAI integration
│   └── supabase.ts       # Supabase client
├── types/                 # TypeScript definitions
│   └── ai.ts             # AI-related types
├── supabase/             # Database
│   └── migrations/       # SQL migrations
└── docs/                 # Documentation
    └── AI_FEATURES.md
```

## 🔑 Environment Variables

Required environment variables:

```env
OPENAI_API_KEY=your_openai_api_key
AI_MODEL=gpt-4-turbo-preview
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=2000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 💎 Subscription Tiers

| Feature | Free | Pro | VIP |
|---------|------|-----|-----|
| AI Predictions | ❌ | 10/day | ✅ Unlimited |
| AI Chat | ❌ | ❌ | ✅ 100/day |
| Personalized Recommendations | ❌ | ❌ | ✅ |
| Live Updates | ❌ | ❌ | ✅ |

## 📄 License

MIT
