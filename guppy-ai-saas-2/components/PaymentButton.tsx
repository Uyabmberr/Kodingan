'use client';

import { useState } from 'react';

interface PaymentButtonProps {
  price: number;
  productName: string;
  phoneNumber?: string;
  className?: string;
}

export default function PaymentButton({ 
  price, 
  productName, 
  phoneNumber 
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get customer phone number if not provided
      let customerPhone: string | undefined = phoneNumber;
      if (!customerPhone) {
        const promptedPhone = prompt('Masukkan nomor WhatsApp Anda (contoh: 6281234567890):');
        if (!promptedPhone) {
          throw new Error('Nomor WhatsApp diperlukan');
        }
        customerPhone = promptedPhone;
      }

      // Call API to create Mayar payment
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: price,
          productName,
          customerPhone,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal membuat pembayaran');
      }

      const { paymentUrl } = await response.json();
      
      // Redirect to Mayar payment page
      window.location.href = paymentUrl;
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Terjadi kesalahan saat memproses pembayaran');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={initiatePayment}
        disabled={isLoading}
        className={`${className || 'w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold py-5 rounded-xl transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] uppercase tracking-[0.2em] text-sm relative overflow-hidden'} disabled:opacity-70`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            MEMPROSES...
          </span>
        ) : (
          <span>MAYAR.ID PAYMENT →</span>
        )}
      </button>
      {error && (
        <p className="text-red-500 text-xs mt-2 text-center animate-pulse">{error}</p>
      )}
    </div>
  );
}