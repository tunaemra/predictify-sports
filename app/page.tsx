import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Profesyonel İddaa Tahmin Platformu
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Maç tahminleri yapın, canlı skorları takip edin ve premium üyelik ile gelişmiş özelliklere erişin.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/signup">
            <Button size="lg" className="text-lg px-8">
              Hemen Başla
            </Button>
          </Link>
          <Link href="/matches">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Maçları Gör
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Özellikler</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚽ Canlı Maçlar
              </CardTitle>
              <CardDescription>
                Tüm liglerdeki canlı maçları anlık olarak takip edin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Football-Data.org API ile güncel maç verileri, skorlar ve istatistikler
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎯 Tahmin Sistemi
              </CardTitle>
              <CardDescription>
                Maç tahminleri yapın ve başarınızı takip edin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Maç sonucu, gol sayısı ve daha fazlası için tahmin yapın
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 İstatistikler
              </CardTitle>
              <CardDescription>
                Detaylı istatistikler ve analiz araçları
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Doğruluk oranı, form analizi, H2H verileri ve daha fazlası
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Premium Üyelik</h2>
        <p className="text-muted-foreground mb-8">
          Gelişmiş özelliklere erişin ve tahminlerinizi bir üst seviyeye taşıyın
        </p>
        <Link href="/pricing">
          <Button size="lg">
            Planları İncele
          </Button>
        </Link>
      </section>
    </div>
  );
}
