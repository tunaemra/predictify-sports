/**
 * Example Web App Root Layout with Monetag Initialization
 * Demonstrates how to initialize Monetag in a Next.js layout
 */

// Example: app/layout.tsx

'use client';

import { useEffect } from 'react';
import { initMonetag } from '@/web/lib/monetag';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize Monetag on app load
    initMonetag();
  }, []);

  return (
    <html lang="tr">
      <head>
        {/* Add Monetag configuration if needed */}
      </head>
      <body>{children}</body>
    </html>
  );
}
