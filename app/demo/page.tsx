'use client';

import { useState } from 'react';
import AIPredictionCard from '@/components/AIPredictionCard';
import AIChatWidget from '@/components/AIChatWidget';
import { AIPrediction } from '@/types/ai';

export default function DemoPage() {
  const [subscriptionTier, setSubscriptionTier] = useState<'free' | 'pro' | 'vip'>('vip');

  // Sample AI prediction data
  const samplePrediction: AIPrediction = {
    matchId: 'demo-match-1',
    predictedOutcome: '1',
    confidence: 78,
    winProbabilities: {
      home: 45,
      draw: 28,
      away: 27,
    },
    recommendations: [
      {
        type: 'result',
        value: 'Ev Sahibi Kazanır (1)',
        confidence: 78,
        reasoning: 'Ev sahibi takım son 5 maçta 4 galibiyet aldı ve ev sahası performansı çok güçlü.',
      },
      {
        type: 'over_under',
        value: '2.5 Üst',
        confidence: 65,
        reasoning: 'Her iki takım da son maçlarda yüksek gol ortalamasına sahip.',
      },
      {
        type: 'btts',
        value: 'Evet (Her İki Takım da Gol Atar)',
        confidence: 72,
        reasoning: 'Deplasman takımı son 7 deplasman maçının tamamında gol attı.',
      },
    ],
    analysis: {
      strengths: [
        'Ev sahibi son 5 maçta 4 galibiyet aldı',
        'Ev sahası performansı çok güçlü (%80 galibiyet)',
        'Deplasman takımının savunma zayıf (maç başı 1.8 gol yiyor)',
      ],
      weaknesses: [
        'Ev sahibi son maçta 3 sarı kart gördü',
        'Deplasman takımı son 3 karşılaşmada sadece 1 mağlubiyet aldı',
        'H2H: Son 5 maçta 3 beraberlik',
      ],
      keyFactors: [
        'Ev sahibi takımın yıldız forvet sakatlıktan döndü',
        'Deplasman takımı Şampiyonlar Ligi maçı oynadı (yorgunluk faktörü)',
        'Hava koşulları: Yağmurlu (ev sahibine avantaj)',
      ],
    },
    reasoning:
      'Real Madrid - Barcelona maçı çok dengeli bir karşılaşma olacak. Real Madrid\'in ev sahibi avantajı ve son dönem formu göz önüne alındığında, ev sahibi galibiyeti %45 olasılıkla en muhtemel sonuç. Barcelona\'nın deplasman performansı iyi olsa da, Şampiyonlar Ligi maçı sonrası yorgunluk faktörü önemli. Her iki takımın da hücum gücü yüksek olduğu için maçta 2.5 üst gol bekleniyor. Risk seviyesi orta düzeyde çünkü Barcelona\'nın her zaman sürpriz yapma kapasitesi var.',
    riskLevel: 'medium',
    updatedAt: new Date().toISOString(),
  };

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
              <select
                value={subscriptionTier}
                onChange={(e) => setSubscriptionTier(e.target.value as 'free' | 'pro' | 'vip')}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="free">Ücretsiz</option>
                <option value="pro">Pro</option>
                <option value="vip">VIP</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Info */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-2xl">ℹ️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-blue-800">Demo Modu</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Bu sayfa AI özelliklerini göstermek için örnek verilerle çalışmaktadır.
                  Gerçek AI tahminleri için OpenAI API anahtarı gereklidir.
                </p>
                <p className="mt-1">
                  Üstteki menüden farklı üyelik seviyelerini deneyebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Match Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="text-center space-y-4">
            <div className="text-sm text-gray-600">La Liga - 29 Aralık 2025</div>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl mb-2">⚪</div>
                <div className="font-bold text-lg">Real Madrid</div>
                <div className="text-sm text-gray-600">Ev Sahibi</div>
              </div>
              <div className="text-4xl font-bold text-gray-400">VS</div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔴</div>
                <div className="font-bold text-lg">Barcelona</div>
                <div className="text-sm text-gray-600">Deplasman</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* AI Prediction */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">🤖 AI Tahmini</h2>
            {subscriptionTier === 'free' ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-2">AI Tahminleri</h3>
                <p className="text-gray-600 mb-4">
                  AI destekli tahminler Pro ve VIP üyelere özeldir.
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    Pro üyelikle günde 10, VIP üyelikle sınırsız AI tahmin hakkınız olacak!
                  </p>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all">
                  Pro Üye Ol
                </button>
              </div>
            ) : (
              <AIPredictionCard prediction={samplePrediction} />
            )}
          </div>

          {/* AI Chat */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">💬 AI Chat Assistant</h2>
            <AIChatWidget
              userId="demo-user"
              isVIP={subscriptionTier === 'vip'}
              onUpgradeClick={() => alert('VIP üyelik için yönlendiriliyorsunuz...')}
            />
          </div>
        </div>

        {/* Personalized Recommendations */}
        {subscriptionTier === 'vip' && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">🎯 Senin İçin Öneriler</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <RecommendationCard
                match="Manchester City vs Liverpool"
                reason="Normalde Premier League'de %82 başarılısın"
                confidence={85}
                league="Premier League"
              />
              <RecommendationCard
                match="Bayern Munich vs Dortmund"
                reason="Bundesliga'da yüksek skorlu maçlarda başarılısın"
                confidence={78}
                league="Bundesliga"
              />
              <RecommendationCard
                match="Inter Milan vs AC Milan"
                reason="Derby maçlarında güçlü tahminler yapıyorsun"
                confidence={72}
                league="Serie A"
              />
            </div>
          </div>
        )}

        {/* Features Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <InfoCard
            icon="📊"
            title="Detaylı Analiz"
            description="AI, takım formu, H2H geçmişi, ev/deplasman performansı ve daha fazlasını analiz eder."
          />
          <InfoCard
            icon="🎯"
            title="Güven Skoru"
            description="Her tahmin için 0-100 arası güven skoru ve risk seviyesi gösterilir."
          />
          <InfoCard
            icon="💡"
            title="Akıllı Öneriler"
            description="Sadece maç sonucu değil, üst/alt gol, KG var gibi farklı bahis önerileri."
          />
        </div>
      </div>
    </div>
  );
}

function RecommendationCard({
  match,
  reason,
  confidence,
  league,
}: {
  match: string;
  reason: string;
  confidence: number;
  league: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border-t-4 border-purple-500">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">
          AI ÖNERİYOR
        </span>
        <span className="text-sm font-bold text-gray-900">{confidence}%</span>
      </div>
      <h4 className="font-bold text-gray-900 mb-2">{match}</h4>
      <div className="text-xs text-gray-600 mb-2">{league}</div>
      <p className="text-sm text-gray-600">{reason}</p>
      <button className="mt-4 w-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-semibold py-2 px-4 rounded-lg hover:from-purple-200 hover:to-pink-200 transition-all text-sm">
        Detayları Gör
      </button>
    </div>
  );
}

function InfoCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
