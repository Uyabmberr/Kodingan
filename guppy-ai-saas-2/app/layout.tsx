import type { Metadata } from 'next';
import Cursor from '../components/Cursor';
import ServiceWorker from '../components/ServiceWorker';
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


  return (
    <html lang="id">
      <head>
        {/* Mayar.id Payment Gateway Integration */}
        {/* Payment processing handled via API routes */}

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


      </body>
    </html>
  );
}
