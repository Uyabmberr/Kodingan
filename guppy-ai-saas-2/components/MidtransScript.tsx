'use client';

import Script from 'next/script';

interface MidtransScriptProps {
  clientKey: string;
}

export default function MidtransScript({ clientKey }: MidtransScriptProps) {
  return (
    <Script
      src="https://app.sandbox.midtrans.com/snap/snap.js"
      data-client-key={clientKey}
      strategy="lazyOnload"
      onLoad={() => {
        console.log('✅ Midtrans Snap script loaded successfully');
      }}
      onError={() => {
        console.error('❌ Failed to load Midtrans Snap script');
      }}
    />
  );
}
