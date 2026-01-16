'use client';

import { useState } from 'react';

// Declare Midtrans Snap on window object
declare global {
  interface Window {
    snap: {
      pay: (token: string, options: SnapPaymentOptions) => void;
      embed: (token: string, selector: string, options?: SnapEmbedOptions) => void;
    };
  }
}

interface SnapPaymentOptions {
  onSuccess?: (result: any) => void;
  onPending?: (result: any) => void;
  onError?: (result: any) => void;
  onClose?: () => void;
}

interface SnapEmbedOptions {
  onSuccess?: (result: any) => void;
  onPending?: (result: any) => void;
  onError?: (result: any) => void;
}

interface BuyButtonProps {
  productName: string;
  price: number;
}

export default function BuyButton({ productName, price }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Form validation
  const isFormValid =
    formData.name.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    formData.phone.trim().length > 0 &&
    formData.phone.startsWith('08');

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrorMessage(''); // Clear error when user starts typing
  };

  const handleBuy = async () => {
    // Validate form before proceeding
    if (!isFormValid) {
      setErrorMessage('Please fill all fields correctly. Phone must start with 08.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      // 1. Call backend API to get Midtrans token
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          price: price,
          productName: productName,
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to get payment token';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (!data.token) {
        throw new Error('No payment token received. Please try again.');
      }

      const { token, orderId } = data;

      console.log('✅ Payment token received:', orderId);

      // 2. Check if Midtrans Snap is loaded
      if (!window.snap) {
        throw new Error('Payment gateway not loaded. Please refresh the page.');
      }

      // 3. Trigger Midtrans Snap payment popup
      window.snap.pay(token, {
        onSuccess: function (result: any) {
          console.log('✅ Payment successful:', result);
          alert(
            `✅ Pembayaran Sukses!\n\nCek WhatsApp Anda untuk akses ${productName}. Terima kasih! 🎉`
          );
          // Redirect to dashboard or success page
          window.location.href = '/dashboard';
        },

        onPending: function (result: any) {
          console.log('⏳ Payment pending:', result);
          setErrorMessage('⏳ Pembayaran sedang diproses. Mohon tunggu...');
          setLoading(false);
        },

        onError: function (result: any) {
          console.error('❌ Payment error:', result);
          setErrorMessage('Pembayaran gagal. Silakan coba lagi atau gunakan metode pembayaran lain.');
          setLoading(false);
        },

        onClose: function () {
          console.log('❌ Payment dialog closed');
          setErrorMessage('Pembayaran dibatalkan. Silakan coba lagi jika ingin melanjutkan.');
          setLoading(false);
        },
      });
    } catch (error) {
      console.error('❌ Error:', error);
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Terjadi kesalahan sistem. Coba lagi atau hubungi support.'
      );
      setLoading(false);
    }
  };

  return (
    <>
      {/* Button: Show Form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Beli Sekarang
          <br />
          <span className="text-sm font-normal">Rp {price.toLocaleString('id-ID')}</span>
        </button>
      ) : (
        // Form Section: Data Input
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
          <h3 className="font-bold text-lg text-gray-800 mb-4">
            📝 Lengkapi Data Dulu
          </h3>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {errorMessage}
            </div>
          )}

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Contoh: Budi Santoso"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Contoh: budi@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Phone Input - CRITICAL */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nomor WhatsApp <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              placeholder="Contoh: 0812345678"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                formData.phone && !formData.phone.startsWith('08')
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-red-500'
              }`}
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              ℹ️ Gunakan format Indonesia (08xxx). Kami akan mengirim akses via WhatsApp.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowForm(false);
                setErrorMessage('');
              }}
              disabled={loading}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-all disabled:opacity-50"
            >
              Batal
            </button>

            <button
              onClick={handleBuy}
              disabled={loading || !isFormValid}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Memproses...
                </span>
              ) : (
                'Lanjut Bayar 👉'
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
