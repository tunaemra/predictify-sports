import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">⚽</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Predictify Sports
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">🤖 AI-Powered</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-6">
          <h2 className="text-5xl font-bold text-gray-900">
            AI Destekli Futbol Tahmin Platformu
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Yapay zeka teknolojisi ile profesyonel maç analizleri, tahminler ve kişiselleştirilmiş öneriler
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link
              href="/demo"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
            >
              Demo&apos;yu Deneyin 🚀
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
          🤖 AI Özellikleri
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon="🎯"
            title="AI Tahmin Motoru"
            description="GPT-4 destekli detaylı maç analizleri ve tahminler"
            features={[
              "Form analizi",
              "H2H geçmişi",
              "Güven skoru",
              "Risk değerlendirmesi"
            ]}
          />
          <FeatureCard
            icon="💬"
            title="AI Chat Assistant"
            description="Doğal dil ile soru-cevap (VIP)"
            features={[
              "Maç analizleri",
              "Tahmin önerileri",
              "İstatistik sorguları",
              "100 mesaj/gün"
            ]}
          />
          <FeatureCard
            icon="🎁"
            title="Kişiselleştirilmiş Öneriler"
            description="Size özel maç önerileri (VIP)"
            features={[
              "Geçmiş analizi",
              "Başarı kategorileri",
              "Benzer maçlar",
              "Akıllı öneri sistemi"
            ]}
          />
          <FeatureCard
            icon="⚡"
            title="Canlı AI Güncellemeleri"
            description="Maç sırasında anlık tahminler"
            features={[
              "Momentum analizi",
              "Gol olasılıkları",
              "Canlı öneriler",
              "VIP bildirimler"
            ]}
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
          💎 Üyelik Planları
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard
            tier="Ücretsiz"
            price="₺0"
            features={[
              "❌ AI tahminleri yok",
              "ℹ️ Temel maç bilgileri",
              "ℹ️ AI özelliklerini görüntüleme"
            ]}
            cta="Şu An"
          />
          <PricingCard
            tier="Pro"
            price="₺49.99"
            period="/ay"
            features={[
              "✅ Günde 10 AI tahmin",
              "✅ Temel analiz",
              "✅ Güven skoru",
              "❌ AI Chat yok",
              "❌ Kişisel öneriler yok"
            ]}
            cta="Pro Ol"
            highlight={false}
          />
          <PricingCard
            tier="VIP"
            price="₺149.99"
            period="/ay"
            features={[
              "✅ Sınırsız AI tahmin",
              "✅ Gelişmiş analiz",
              "✅ AI Chat (100/gün)",
              "✅ Kişisel öneriler",
              "✅ Canlı güncellemeler",
              "✅ Öncelikli işleme"
            ]}
            cta="VIP Ol"
            highlight={true}
          />
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            🔧 Teknoloji Yığını
          </h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <TechItem name="Next.js 14" description="Frontend Framework" />
            <TechItem name="OpenAI GPT-4" description="AI Engine" />
            <TechItem name="Supabase" description="Database & Auth" />
            <TechItem name="TypeScript" description="Type Safety" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2025 Predictify Sports - AI-Powered Football Predictions</p>
            <p className="text-sm mt-2">Built with ❤️ using Next.js, OpenAI, and Supabase</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, features }: {
  icon: string;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-bold mb-2 text-gray-900">{title}</h4>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-700 flex items-start">
            <span className="mr-2">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PricingCard({ tier, price, period, features, cta, highlight }: {
  tier: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-8 ${highlight ? 'ring-2 ring-purple-600 shadow-2xl scale-105' : ''}`}>
      {highlight && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold py-1 px-3 rounded-full inline-block mb-4">
          En Popüler
        </div>
      )}
      <h4 className="text-2xl font-bold mb-2 text-gray-900">{tier}</h4>
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        {period && <span className="text-gray-600">{period}</span>}
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-700">{feature}</li>
        ))}
      </ul>
      <button
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
          highlight
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        {cta}
      </button>
    </div>
  );
}

function TechItem({ name, description }: { name: string; description: string }) {
  return (
    <div>
      <div className="font-semibold text-gray-900">{name}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
  );
}
