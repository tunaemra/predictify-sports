# ⚽ Predictify Sports - Profesyonel İddaa Tahmin Platformu

Predictify Sports, kullanıcıların maç tahminleri yapabildiği, canlı skorları takip edebildiği ve premium üyelik ile gelişmiş özelliklere erişebildiği profesyonel bir iddaa tahmin platformudur.

## 🚀 Özellikler

### Kullanıcı Özellikleri
- ✅ **Kimlik Doğrulama**: E-posta/şifre ile kayıt, giriş ve şifre sıfırlama
- ⚽ **Maç Sistemi**: Canlı maçlar, yaklaşan maçlar, tamamlanan maçlar
- 🎯 **Tahmin Sistemi**: Maç sonucu, alt/üst gol, karşılıklı gol tahminleri
- 💳 **Premium Üyelik**: Ücretsiz, Pro ve VIP planları
- 📊 **İstatistikler**: Doğruluk oranı, form analizi, H2H verileri
- 🔔 **Bildirimler**: Maç başlangıcı, gol ve sonuç bildirimleri
- 👨‍💼 **Admin Paneli**: Kullanıcı yönetimi, içerik yönetimi, istatistikler

## 🏗️ Teknoloji Stack

### Frontend
- **Next.js 14** - React framework (App Router)
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - UI components
- **React Query** - Data fetching
- **Zustand** - State management

### Backend & Database
- **Supabase** - PostgreSQL database
- **Supabase Auth** - Authentication
- **Row Level Security** - Data security

### External APIs
- **Football-Data.org** - Live match data
- **Stripe** - Payment processing
- **Firebase Cloud Messaging** - Push notifications

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn
- Supabase hesabı
- Football-Data.org API key (opsiyonel)
- Stripe hesabı (opsiyonel)
- Firebase projesi (opsiyonel)

### Adım 1: Projeyi Klonlayın
\`\`\`bash
git clone https://github.com/tunaemra/predictify-sports.git
cd predictify-sports
\`\`\`

### Adım 2: Bağımlılıkları Yükleyin
\`\`\`bash
npm install
\`\`\`

### Adım 3: Environment Variables
\`.env.local\` dosyası oluşturun. Örnek için \`.env.local.example\` dosyasına bakın.

### Adım 4: Supabase Setup

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni bir proje oluşturun
3. SQL Editor'de \`supabase/migrations/001_initial_schema.sql\` dosyasını çalıştırın
4. API keys'leri kopyalayın ve \`.env.local\` dosyasına yapıştırın

### Adım 5: Development Server'ı Başlatın
\`\`\`bash
npm run dev
\`\`\`

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📋 Database Şeması

### Tables
- \`profiles\` - Kullanıcı profilleri (Supabase Auth'u extend eder)
- \`predictions\` - Kullanıcı tahminleri
- \`user_stats\` - Kullanıcı istatistikleri
- \`featured_matches\` - Öne çıkan maçlar
- \`notifications\` - Bildirimler
- \`audit_logs\` - Admin işlem logları

### Row Level Security (RLS)
Tüm tablolar RLS ile korunmaktadır. Kullanıcılar sadece kendi verilerini görebilir ve düzenleyebilir.

## 🎨 Proje Yapısı

\`\`\`
predictify-sports/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── matches/           # Matches pages
│   ├── predictions/       # Predictions pages
│   ├── pricing/           # Pricing page
│   ├── profile/           # Profile page
│   ├── admin/             # Admin panel
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── auth/             # Auth components
│   └── navbar/           # Navbar components
├── lib/                   # Utilities
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript types
│   └── index.ts          # Type definitions
└── supabase/             # Supabase files
    └── migrations/       # Database migrations
\`\`\`

## 🎯 Premium Planlar

### Ücretsiz Plan
- Günde 3 tahmin
- Temel maç bilgileri
- Sınırlı istatistikler

### Pro Plan (₺49.99/ay)
- Sınırsız tahmin
- Gelişmiş istatistikler
- H2H analiz
- Reklamsız deneyim

### VIP Plan (₺149.99/ay)
- Pro'nun tüm özellikleri
- AI destekli tahmin önerileri
- Öncelikli destek
- Özel VIP rozeti

## 📝 Geliştirme Roadmap

### Phase 1 - Foundation ✅
- [x] Next.js setup
- [x] Supabase integration
- [x] Authentication system
- [x] Basic UI components
- [x] Database schema
- [x] Landing page

### Phase 2 - Match System (Gelecek)
- [ ] Football-Data.org integration
- [ ] Match listing
- [ ] Match detail page
- [ ] Live score updates

### Phase 3 - Prediction System (Gelecek)
- [ ] Prediction form
- [ ] Prediction tracking
- [ ] Statistics calculation

### Phase 4 - Premium (Gelecek)
- [ ] Stripe integration
- [ ] Checkout flow
- [ ] Subscription management

### Phase 5 - Admin Panel (Gelecek)
- [ ] User management
- [ ] Featured matches
- [ ] Analytics dashboard

### Phase 6 - Notifications (Gelecek)
- [ ] Push notifications
- [ ] Email notifications

### Phase 7 - Polish (Gelecek)
- [ ] Testing
- [ ] Performance optimization
- [ ] SEO

## 📄 License

MIT License

## 👤 İletişim

Project Link: [https://github.com/tunaemra/predictify-sports](https://github.com/tunaemra/predictify-sports)
