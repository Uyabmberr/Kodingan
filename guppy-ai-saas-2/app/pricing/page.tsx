import BuyButton from '../../components/BuyButton';
import Link from 'next/link';

export const metadata = {
  title: 'Harga - Guppy AI',
  description: 'Pilih paket harga terbaik untuk kebutuhan Anda. Mulai dari Basic hingga Pro.',
};

const pricingPlans = [
  {
    name: 'Basic',
    price: 200,
    description: 'Perfect untuk pemula',
    features: [
      '✅ 10 Video AI/bulan',
      '✅ 5 E-Course/bulan',
      '✅ 50 GB Storage',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: 200,
    description: 'Untuk content creator profesional',
    features: [
      '✅ 50 Video AI/bulan',
      '✅ 25 E-Course/bulan',
      '✅ 250 GB Storage',
      '✅ Support WhatsApp',
      '✅ API Access (Terbatas)',
      '✅ Priority Support',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 100,
    description: 'Untuk bisnis besar dan tim',
    features: [
      '✅ Unlimited Video AI',
      '✅ Unlimited E-Course',
      '✅ 1 TB Storage',
      '✅ Dedicated Support 24/7',
      '✅ Full API Access',
      '✅ Custom Integration',
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      {/* Background Texture */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative z-10">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            GUPPY <span className="text-red-600">INSIDER.</span>
          </Link>
          <Link href="/" className="text-white hover:text-red-500 font-medium transition">
            ← Kembali
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
            Pilih Paket <span className="text-red-600">TERBAIK</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Akses eksklusif materi breeding guppy premium dengan mentoring langsung.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl border overflow-hidden transition-all backdrop-blur-sm ${
                plan.highlighted
                  ? 'border-red-600/50 bg-red-950/20 shadow-[0_0_30px_rgba(220,38,38,0.2)] ring-1 ring-red-600/30 scale-105'
                  : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/50'
              }`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
                    ⭐ PALING POPULER
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <p className="text-5xl font-bold text-white">
                    Rp {plan.price.toLocaleString('id-ID')}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">/bulan</p>
                </div>

                {/* Buy Button */}
                <div className="mb-8">
                  <BuyButton productName={`${plan.name} Plan`} price={plan.price} />
                </div>

                {/* Features List */}
                <div className="space-y-3 border-t border-zinc-800 pt-8">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <span className="text-red-500 font-bold">{feature.split(' ')[0]}</span>
                      <span className="text-gray-300">{feature.substring(3)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 bg-zinc-900/30 border-t border-zinc-800 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Pertanyaan <span className="text-red-600">UMUM</span></h2>
            <p className="text-gray-400">Jawaban untuk pertanyaan yang sering diajukan</p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'Apakah ada biaya tersembunyi?',
                a: 'Tidak ada biaya tersembunyi. Harga yang Anda lihat adalah harga final yang Anda bayarkan setiap bulannya.',
              },
              {
                q: 'Bisakah saya mengubah paket kapan saja?',
                a: 'Ya, Anda dapat upgrade atau downgrade paket kapan saja. Perubahan akan berlaku pada tagihan berikutnya.',
              },
              {
                q: 'Apakah ada uji coba gratis?',
                a: 'Ya, Anda mendapatkan akses 7 hari gratis untuk mencoba semua fitur sebelum berlangganan.',
              },
              {
                q: 'Bagaimana cara membatalkan langganan?',
                a: 'Anda dapat membatalkan langganan kapan saja melalui dashboard. Akses akan berakhir pada akhir periode billing.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800 hover:border-red-600/50 transition">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-red-950/30 rounded-2xl p-12 border border-red-600/30 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-4">Butuh Bantuan Memilih?</h2>
          <p className="text-red-200 mb-6">
            Tim support kami siap membantu Anda menemukan paket yang sempurna
          </p>
          <a
            href="https://wa.me/YOUR_WHATSAPP_NUMBER"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all"
          >
            💬 Chat WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="text-2xl font-bold mb-4">GUPPY <span className="text-red-600">INSIDER.</span></p>
              <p className="text-gray-500 text-sm">
                Platform pembelajaran breeding guppy premium
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Produk</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="/member" className="hover:text-red-500 transition">
                    Member Dashboard
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-red-500 transition">
                    Kembali Ke Beranda
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-red-500 transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-red-500 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Guppy Insider. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
