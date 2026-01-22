import type { Metadata } from 'next';
import MidtransScript from '../components/MidtransScript';
import Cursor from '../components/Cursor';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Guppy AI - Buat Video AI & E-Course Otomatis',
  description:
    'Platform terlengkap untuk membuat video AI dan e-course otomatis. Mulai gratis hari ini!',
  icons: {
    icon: '🎬',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ⚠️ IMPORTANT: Replace with your actual Midtrans Client Key
  // Get your Client Key from: https://dashboard.midtrans.com/settings/config_info
  const midtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'YOUR_CLIENT_KEY_HERE';

  return (
    <html lang="id">
      <head>
        {/* Midtrans Snap Payment Gateway Script */}
        {/* This script is required for window.snap to be available */}
        <MidtransScript clientKey={midtransClientKey} />

        {/* Google Analytics (Optional) */}
        {/* <Script
          src={`https://www.googletagmanager.com/gtag/js?id=GA_ID`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_ID');
          `}
        </Script> */}
      </head>

      <body className="antialiased">
        <Cursor />
        {children}
        <Analytics />

        {/* Optional: Loading indicator for Midtrans */}
        <div
          id="snap-loading"
          className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="animate-spin">⏳</div>
            <p className="text-sm text-gray-600 mt-2">Loading payment...</p>
          </div>
        </div>
      </body>
    </html>
  );
}
