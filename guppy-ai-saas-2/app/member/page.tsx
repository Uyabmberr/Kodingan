'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BuyButton from "@/components/BuyButton"; // Panggil Tombol Bayar Disini

// --- KONFIGURASI ---
const SECRET_CODE = "GUPPY-VIP-2026"; 

const categories = [
  { id: 'business', label: 'PEMBISNIS', icon: '💼' },
  { id: 'breeder', label: 'BREEDER', icon: '🧬' },
  { id: 'newbie', label: 'AWAM', icon: '👶' },
];

const videos = {
  business: [
    {
      id: 1,
      title: "Mindset Bisnis Guppy 2026",
      desc: "Strategi fundamental mengubah hobi menjadi mesin uang.",
      youtubeId: "43M1sGYdBeE", 
      locked: false, 
    },
    { id: 2, title: "Ekspor Jalur VIP", desc: "Materi Premium", locked: true },
    { id: 3, title: "Branding & Marketing", desc: "Materi Premium", locked: true }
  ],
  breeder: [
    { id: 1, title: "Genetika Dasar", desc: "Coming Soon", locked: true },
    { id: 2, title: "Formula Pakan", desc: "Coming Soon", locked: true },
  ],
  newbie: [
    { id: 1, title: "Setup Tank Awal", desc: "Coming Soon", locked: true },
    { id: 2, title: "Penyakit Umum", desc: "Coming Soon", locked: true },
  ]
};

export default function MemberPage() {
  const [activeTab, setActiveTab] = useState('business');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Cek Login Tersimpan
  useEffect(() => {
    const savedAuth = localStorage.getItem('guppy_auth');
    if (savedAuth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode === SECRET_CODE) {
      setIsAuthenticated(true);
      localStorage.setItem('guppy_auth', 'true');
    } else {
      setErrorMsg('Kode Salah! Cek WA Anda atau Beli Akses di bawah.');
    }
  };

  // --- TAMPILAN 1: GATEWAY (LOGIN / BELI) ---
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-4 font-sans selection:bg-red-600">
         <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
         
         <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full z-10">
            
            {/* KOLOM KIRI: LOGIN (Jika sudah punya kode) */}
            <motion.div 
               initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
               className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 p-8 rounded-3xl"
            >
                <h2 className="text-2xl font-black text-white mb-6 uppercase">
                  Login <span className="text-red-600">Member</span>
                </h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-bold">Kode Akses (Dari WhatsApp)</label>
                    <input 
                      type="text" 
                      value={inputCode}
                      onChange={(e) => { setInputCode(e.target.value); setErrorMsg(''); }}
                      placeholder="GUPPY-VIP-XXXX"
                      className="w-full mt-2 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white font-bold tracking-widest focus:outline-none focus:border-red-600 uppercase"
                    />
                  </div>
                  {errorMsg && <p className="text-red-500 text-xs font-bold animate-pulse">{errorMsg}</p>}
                  <button type="submit" className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3 rounded-xl transition-all uppercase tracking-wide">
                    Masuk Kelas
                  </button>
                </form>
            </motion.div>

            {/* KOLOM KANAN: BELI (Jika belum punya kode) */}
            <motion.div 
               initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
               className="bg-red-900/20 backdrop-blur-xl border border-red-900/50 p-8 rounded-3xl flex flex-col justify-center text-center relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                  PREMIUM
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">BELUM JADI MEMBER?</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Dapatkan akses penuh ke video rahasia, grup WA, dan tools AI hanya dengan sekali bayar.
                </p>

                <div className="bg-black/50 rounded-xl p-4 mb-6 border border-red-900/30">
                  <span className="text-3xl font-black text-red-500">Rp 30.000</span>
                  <span className="text-xs text-gray-500 block">Investasi Sekali Seumur Hidup</span>
                </div>

                {/* TOMBOL MIDTRANS DISINI */}
                <BuyButton price={30000} productName="Guppy VIP Access" />
                
                <p className="mt-4 text-[10px] text-gray-500">
                  *Kode akses dikirim otomatis ke WA setelah bayar.
                </p>
            </motion.div>

         </div>
      </main>
    );
  }

  // --- TAMPILAN 2: MATERI E-COURSE (Sama seperti sebelumnya) ---

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      {/* Background Texture */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      
      {/* Header */}
      <header className="relative z-10 border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-bold text-xl tracking-tighter">
            GUPPY <span className="text-red-600">INSIDER.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-mono text-gray-400">STATUS: MEMBER AKTIF</span>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        
        {/* Judul Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black uppercase mb-2">
            CLASS <span className="text-red-600">DASHBOARD</span>
          </h1>
          <p className="text-gray-500">Pilih jalur pembelajaran Anda di bawah ini.</p>
        </div>

        {/* TABS NAVIGATION (PILIHAN KATEGORI) */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`relative px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all ${
                activeTab === cat.id 
                  ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                  : 'text-gray-500 hover:text-white bg-zinc-900 border border-zinc-800'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
              {activeTab === cat.id && (
                <motion.div layoutId="bubble" className="absolute inset-0 bg-white rounded-full -z-10" />
              )}
            </button>
          ))}
        </div>

        {/* CONTENT GRID */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* @ts-ignore */}
          {videos[activeTab].map((video: any, index: number) => (
            <div 
              key={index} 
              className={`group relative rounded-2xl overflow-hidden border ${video.locked ? 'border-zinc-800 bg-zinc-900/50' : 'border-red-900/30 bg-zinc-900'}`}
            >
              {/* VIDEO PLAYER / THUMBNAIL */}
              <div className="aspect-video bg-black relative flex items-center justify-center overflow-hidden">
                {!video.locked ? (
                   // --- VIDEO AKTIF (YOUTUBE EMBED) ---
                   <iframe 
                     className="w-full h-full"
                     src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0`}
                     title={video.title}
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   ></iframe>
                ) : (
                   // --- VIDEO TERKUNCI ---
                   <div className="flex flex-col items-center justify-center text-zinc-600">
                     <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                     <span className="text-xs font-bold uppercase tracking-widest">LOCKED</span>
                   </div>
                )}
              </div>

              {/* DESKRIPSI VIDEO */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg leading-tight group-hover:text-red-500 transition-colors">
                    {video.title}
                  </h3>
                  {video.locked && <span className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded">LOCKED</span>}
                </div>
                <p className="text-gray-500 text-sm mb-4">{video.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
