export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            ⚽ Predictify Sports
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Dünyanın En Kapsamlı İddaa Tahmin Platformu
          </p>
        </header>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Gamification */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🎮</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Oyunlaştırma Sistemi
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Seviye sistemi, rozetler, liderlik tablosu ve daha fazlası
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>🌱 Level 1-100 sistem</li>
              <li>🏆 Başarı rozetleri</li>
              <li>🔥 Streak takibi</li>
              <li>📊 Liderlik tabloları</li>
            </ul>
          </div>

          {/* AI Predictions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🤖</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              AI Tahminler
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Yapay zeka destekli tahmin analizi ve öneriler
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>🎯 Yüksek doğruluk oranı</li>
              <li>📈 İstatistiksel analiz</li>
              <li>💡 Akıllı öneriler</li>
              <li>⚡ Gerçek zamanlı güncelleme</li>
            </ul>
          </div>

          {/* Social Features */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">👥</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Sosyal Özellikler
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Arkadaşlarınla yarış, tahminleri paylaş
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>🤝 Arkadaş sistemi</li>
              <li>📱 Sosyal feed</li>
              <li>💬 Yorum ve beğeni</li>
              <li>🏢 Özel gruplar</li>
            </ul>
          </div>

          {/* Mobile App */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📱</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Mobil Uygulama
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              iOS ve Android için native mobil uygulama
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>📲 Push bildirimleri</li>
              <li>🔔 Local bildirimler</li>
              <li>🔒 Biometric auth</li>
              <li>📴 Offline mode</li>
            </ul>
          </div>

          {/* Analytics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Gelişmiş Analitik
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Detaylı istatistikler ve raporlar
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>📈 Grafikler</li>
              <li>📄 PDF raporlar</li>
              <li>🎯 Performans takibi</li>
              <li>💹 Trend analizi</li>
            </ul>
          </div>

          {/* Tournaments */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Turnuvalar
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Haftalık yarışmalar ve ödüller
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>🎁 Haftalık ödüller</li>
              <li>🎯 Özel yarışmalar</li>
              <li>💎 VIP turnuvaları</li>
              <li>🎰 Kupon sistemi</li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Hemen Başla!</h2>
          <p className="text-xl mb-8 opacity-90">
            Ücretsiz hesap oluştur ve tahmin yapmaya başla
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              Kayıt Ol
            </button>
            <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors">
              Giriş Yap
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            🌍 Çoklu dil desteği • 🔒 Güvenli • ⚡ Hızlı
          </p>
          <p className="text-sm">
            © 2025 Predictify Sports. Tüm hakları saklıdır.
          </p>
        </footer>
      </div>
    </main>
  )
}
