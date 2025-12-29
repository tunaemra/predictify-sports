import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Premium Üyelik Planları</h1>
        <p className="text-xl text-muted-foreground">
          Size en uygun planı seçin ve gelişmiş özelliklere erişin
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Ücretsiz</CardTitle>
            <CardDescription>Başlamak için ideal</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">₺0</span>
              <span className="text-muted-foreground">/ay</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                ✓ Günde 3 tahmin
              </li>
              <li className="flex items-center gap-2">
                ✓ Temel maç bilgileri
              </li>
              <li className="flex items-center gap-2">
                ✓ Sınırlı istatistikler
              </li>
            </ul>
            <Button variant="outline" className="w-full">
              Mevcut Plan
            </Button>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>Ciddi kullanıcılar için</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">₺49.99</span>
              <span className="text-muted-foreground">/ay</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                ✓ Sınırsız tahmin
              </li>
              <li className="flex items-center gap-2">
                ✓ Gelişmiş istatistikler
              </li>
              <li className="flex items-center gap-2">
                ✓ H2H analiz
              </li>
              <li className="flex items-center gap-2">
                ✓ Reklamsız deneyim
              </li>
            </ul>
            <Button className="w-full">
              Pro&apos;ya Geç
            </Button>
          </CardContent>
        </Card>

        {/* VIP Plan */}
        <Card>
          <CardHeader>
            <CardTitle>VIP</CardTitle>
            <CardDescription>Profesyoneller için</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">₺149.99</span>
              <span className="text-muted-foreground">/ay</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                ✓ Pro&apos;nun tüm özellikleri
              </li>
              <li className="flex items-center gap-2">
                ✓ AI destekli tahminler
              </li>
              <li className="flex items-center gap-2">
                ✓ Öncelikli destek
              </li>
              <li className="flex items-center gap-2">
                ✓ Özel VIP rozeti
              </li>
            </ul>
            <Button className="w-full">
              VIP&apos;e Geç
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
