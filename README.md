# ⚽ Predictify Sports

Dünyanın En Kapsamlı İddaa Tahmin Platformu

## 🚀 Özellikler

### 1. 🎮 Oyunlaştırma Sistemi (Gamification)

- **Seviye Sistemi (Level 1-100)**
  - XP kazanma ve seviye atlama
  - Seviye unvanları (Çaylak, Tahminci, Uzman, Master, Legend, Grandmaster)
  - Dinamik XP hesaplama formülü

- **Başarı Rozetleri (Achievements)**
  - Tahmin rozetleri (İlk Adım, Ateş Topu, Şimşek, vb.)
  - Zaman rozetleri (Sadık Kullanıcı, Aylık Aktif, Yıl Dönümü)
  - Premium rozetler (VIP Üye, Pro Üye, Erken Destekçi)
  - Lig rozetleri (Premier Uzmanı, La Liga Bilgesi, vb.)
  - Özel rozetler (Risk Avcısı, Dark Horse, Keskin Nişancı)

- **Liderlik Tablosu**
  - Günlük, Haftalık, Aylık ve Tüm Zamanlar sıralamaları
  - Doğruluk oranı ve skor bazlı sıralama
  - Kullanıcı profil rozetleri

- **Streak Sistemi**
  - Üst üste doğru tahmin takibi
  - Streak bonusları (3, 5, 10 üst üste)
  - Görsel streak göstergesi

- **Günlük Görevler**
  - Günlük tahmin hedefleri
  - XP ödüllü görevler
  - İlerleme takibi

### 2. 📱 Mobil Uygulama (Gelecek Sprint)

- React Native (Expo) ile native iOS ve Android uygulaması
- Push notifications
- Biometric authentication
- Offline mode
- Dark mode

### 3. 💬 Sosyal Özellikler (Gelecek Sprint)

- Arkadaş sistemi
- Sosyal feed
- Tahmin paylaşma
- Yorumlar ve beğeniler
- Özel gruplar

### 4. 📊 Gelişmiş Analitik (Gelecek Sprint)

- Chart.js entegrasyonu
- Detaylı istatistikler
- PDF raporlar
- Performans takibi

### 5. 🌍 Çoklu Dil Desteği (Gelecek Sprint)

- Türkçe, İngilizce, Almanca, İspanyolca, Fransızca
- next-i18next ile tam çeviri desteği

### 6. 🎁 Referral Program (Gelecek Sprint)

- Arkadaş davet sistemi
- Ödül mekanizması
- Referral dashboard

### 7. 🏆 Turnuva Sistemi (Gelecek Sprint)

- Haftalık yarışmalar
- Kupon sistemi
- Ödül havuzu

## 🛠️ Teknoloji Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Components** - Modular UI

### Backend
- **Supabase** - Backend as a Service
- **PostgreSQL** - Database
- **Supabase Auth** - Authentication
- **Supabase Storage** - File storage

### State Management
- **Zustand** - Lightweight state management

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm run dev

# Production build
npm run build

# Production server
npm start
```

## 🗄️ Database Setup

1. Supabase projesi oluştur
2. `.env.example` dosyasını `.env.local` olarak kopyala
3. Supabase credentials'ı ekle
4. Migrations'ları çalıştır:

```bash
# supabase/migrations/ klasöründeki SQL dosyalarını sırayla çalıştır:
# 000_core.sql
# 001_gamification.sql
# 002_social.sql
# 003_tournament_referral.sql
# 004_seed_achievements.sql
```

## 📁 Proje Yapısı

```
predictify-sports/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── gamification/  # Gamification endpoints
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   └── gamification/      # Gamification components
│   ├── lib/                   # Utilities
│   │   └── supabase.ts       # Supabase client
│   ├── services/              # Business logic
│   │   └── gamification.service.ts
│   └── types/                 # TypeScript types
│       ├── gamification.ts
│       ├── prediction.ts
│       ├── social.ts
│       └── tournament.ts
├── supabase/
│   └── migrations/            # Database migrations
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎯 API Endpoints

### Gamification

- `GET /api/gamification/level/[userId]` - Kullanıcı seviyesi
- `GET /api/gamification/achievements/[userId]` - Kullanıcı rozetleri
- `GET /api/gamification/leaderboard?period=daily` - Liderlik tablosu

## 🎨 UI Components

### Gamification Components

- **LevelDisplay** - Seviye ve XP göstergesi
- **AchievementBadge** - Başarı rozeti kartı
- **AchievementsGrid** - Rozetler grid'i
- **StreakDisplay** - Streak göstergesi
- **Leaderboard** - Liderlik tablosu

## 📝 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚀 Deployment

```bash
# Vercel'e deploy
vercel

# Veya manuel build
npm run build
npm start
```

## 📊 Database Schema

### Core Tables
- `profiles` - Kullanıcı profilleri
- `matches` - Maç bilgileri
- `predictions` - Kullanıcı tahminleri

### Gamification Tables
- `user_levels` - Kullanıcı seviyeleri
- `achievements` - Başarı rozetleri
- `user_achievements` - Kullanıcı rozetleri
- `leaderboards` - Liderlik tabloları
- `streaks` - Streak takibi
- `weekly_challenges` - Haftalık yarışmalar
- `daily_quests` - Günlük görevler
- `user_quest_progress` - Görev ilerlemeleri

### Social Tables
- `friendships` - Arkadaşlıklar
- `shared_predictions` - Paylaşılan tahminler
- `comments` - Yorumlar
- `groups` - Gruplar
- `group_members` - Grup üyeleri

### Tournament Tables
- `referrals` - Referanslar
- `tournaments` - Turnuvalar
- `tournament_participants` - Turnuva katılımcıları
- `coupons` - Kuponlar

## 🎯 XP Kazanma Yolları

- Tahmin yap: **+10 XP**
- Doğru tahmin: **+50 XP**
- 3 üst üste streak: **+100 XP**
- Günlük giriş: **+5 XP**
- Profil tamamla: **+25 XP**
- İlk VIP üyelik: **+500 XP**
- Arkadaş davet et: **+75 XP**

## 🏆 Seviye Unvanları

- Level 1-10: 🌱 **Çaylak**
- Level 11-25: ⚽ **Tahminci**
- Level 26-50: 🎯 **Uzman**
- Level 51-75: 🏆 **Master**
- Level 76-99: 👑 **Legend**
- Level 100: 💎 **Grandmaster**

## 📅 Roadmap

### ✅ Sprint 1 - Gamification (Tamamlandı)
- [x] Proje yapısı oluşturma
- [x] TypeScript type tanımlamaları
- [x] Database schema ve migrations
- [x] Gamification service layer
- [x] API endpoints
- [x] UI components
- [x] Ana sayfa

### 🔜 Sprint 2 - Mobile App
- [ ] React Native setup
- [ ] Auth screens
- [ ] Main navigation
- [ ] Core features
- [ ] Push notifications

### 🔜 Sprint 3 - Social Features
- [ ] Friend system
- [ ] Social feed
- [ ] Sharing functionality
- [ ] Comments
- [ ] Groups

### 🔜 Sprint 4 - Advanced Features
- [ ] Analytics dashboard
- [ ] Referral program
- [ ] Tournaments
- [ ] Multi-language
- [ ] Coupon system

## 🤝 Contributing

Katkıda bulunmak isterseniz pull request açabilirsiniz.

## 📄 License

MIT License

## 👨‍💻 Developer

Built with ❤️ by Predictify Sports Team

---

**Hedef:** Dünyanın en kapsamlı iddaa tahmin platformu! 🌍🚀
