'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA MATERI ---
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
      youtubeId: "43M1sGYdBeE", // Video Request Anda
      locked: false, // INI YANG BISA DIBUKA
    },
    {
      id: 2,
      title: "Ekspor Jalur VIP",
      desc: "Cara menembus pasar Eropa tanpa agen perantara.",
      youtubeId: "", 
      locked: true, // INI SLOT KOSONG
    },
    {
      id: 3,
      title: "Branding & Marketing",
      desc: "Teknik jualan mahal walau ikan standar.",
      youtubeId: "",
      locked: true,
    }
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
