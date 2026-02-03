'use client';

import { useState } from 'react';

interface BuyButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  price: number;
  productName: string;
  phoneNumber?: string;
  className?: string;
}

export default function BuyButton({
  children,
  variant = 'primary',
  price,
  productName,
  phoneNumber,
  className = ''
}: BuyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get customer phone number if not provided
      let customerPhone = phoneNumber;
      if (!customerPhone) {
        const promptedPhone = prompt('Masukkan nomor WhatsApp Anda (contoh: 6281234567890):');
        if (!promptedPhone) {
          throw new Error('Nomor WhatsApp diperlukan');
        }
        customerPhone = promptedPhone;
      }

      // Call API to create payment
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Gagal membuat pembayaran');
      }

      const result = await response.json();

      // Handle both real and mock payment responses
      if (result.paymentUrl) {
        // Redirect to payment page
        window.location.href = result.paymentUrl;
      } else {
        throw new Error('Tautan pembayaran tidak ditemukan');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Terjadi kesalahan saat memproses pembayaran');
    } finally {
      setIsLoading(false);
    }
  };

  const baseClasses = "font-bold rounded-full overflow-hidden relative transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";

  const variantClasses = variant === 'primary'
    ? "bg-gradient-to-r from-[#0b0b0b] to-[#2b0b0b] text-white shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_40px_rgba(212,175,55,0.25)] border border-[#2b0b0b]"
    : "border border-red-700 bg-red-900/10 hover:bg-red-900/20 text-white";

  const combinedClasses = `${baseClasses} ${variantClasses} ${className} ${isLoading ? 'opacity-70' : ''}`;

  return (
    <div className="w-full">
      <button
        onClick={initiatePayment}
        disabled={isLoading}
        className={combinedClasses}
      >
        <span className="relative z-10">
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              MEMPROSES...
            </span>
          ) : (
            children
          )}
        </span>
      </button>
      {error && (
        <p className="text-red-500 text-xs mt-2 text-center animate-pulse">{error}</p>
      )}
    </div>
  );
}