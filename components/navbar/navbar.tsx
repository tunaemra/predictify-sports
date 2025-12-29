'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            ⚽ Predictify Sports
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/matches" className="text-sm font-medium hover:text-primary transition-colors">
              Maçlar
            </Link>
            {user && (
              <>
                <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link href="/predictions" className="text-sm font-medium hover:text-primary transition-colors">
                  Tahminlerim
                </Link>
                <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
                  Premium
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {loading ? (
              <div className="h-9 w-20 bg-gray-200 animate-pulse rounded-md" />
            ) : user ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    Profil
                  </Button>
                </Link>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Çıkış
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Giriş
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">
                    Kayıt Ol
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
