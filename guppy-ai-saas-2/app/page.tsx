'use client';

import BuyButton from "@/components/BuyButton";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

// --- KOMPONEN KARTU SENTER (SPOTLIGHT CARD) ---
// Ini rahasianya: Border akan menyala mengikuti mouse
function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className={`group relative border border-white/10 bg-zinc-900/50 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(220, 38, 38, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// --- DATA ---
const features = [
  { title: "GENETIK MURNI", desc: "Database indukan juara dunia yang terjaga kemurniannya." },
  { title: "RAHASIA DAPUR", desc: "Formulasi pakan & perawatan air yang tidak dishare di Youtube." },
  { title: "MARKET DISRUPTOR", desc: "Strategi menjual guppy di harga tinggi ke pasar internasional." },
  { title: "FULL MENTORING", desc: "Bimbingan langsung via WhatsApp sampai balik modal." },
];

const catalog = [
  { name: "Albino Full Red", price: "Rp 150K", tag: "BEST SELLER" },
  { name: "Blue Moscow", price: "Rp 200K", tag: "KONTES" },
  { name: "Black Moscow", price: "Rp 100K", tag: "PEMULA" },
  { name: "HB White", price: "Rp 120K", tag: "RARE" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      
      {/* 1. BACKGROUND NOISE TEXTURE (Kesan Film Dokumenter/Mahal) */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      
      {/* 2. AMBIENT GLOW (Cahaya Merah Redup di Pojok) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-900/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Logo Text Kecil */}
          <div className="mb-6 flex justify-center">
            <span className="py-1 px-3 border border-white/20 rounded-full text-xs font-mono text-gray-400 tracking-widest uppercase bg-white/5 backdrop-blur-sm">
              The Underground Community
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 mb-6">
            GUPPY <span className="text-red-600">INSIDER.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Selamat datang di sisi lain industri Guppy. <br />
            Tempat di mana rahasia breeding & bisnis dibongkar tanpa sensor.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#pricing" className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden">
              <span className="relative z-10 group-hover:text-white transition-colors">GABUNG SEKARANG</span>
              <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </a>
            <a href="https://www.instagram.com/guppyindonesia111" target="_blank" className="px-8 py-4 border border-white/20 rounded-full text-gray-300 hover:bg-white/5 transition-all font-medium">
              Lihat Bukti (Instagram)
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-gray-500 text-xs tracking-widest"
        >
          SCROLL TO REVEAL
        </motion.div>
      </section>

      {/* --- SECTION 2: GRID SPOTLIGHT (THE WOW FACTOR) --- */}
      <section className="relative z-10 py-24 px-4 max-w-6xl mx-auto">
        <div className="mb-12 border-l-2 border-red-600 pl-6">
          <h2 className="text-3xl font-bold">MENGAPA KAMI?</h2>
          <p className="text-gray-500">Bukan sekadar teori. Ini praktik lapangan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feat, i) => (
            <SpotlightCard key={i} className="rounded-2xl p-8 hover:bg-zinc-900 transition-colors">
              <div className="w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center mb-6 text-red-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-wide">{feat.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* --- SECTION 3: KATALOG ELEGANT --- */}
      <section className="relative z-10 py-20 bg-zinc-950/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-bold">STOK TERBATAS</h2>
            <a href="https://www.instagram.com/guppyindonesia.katalog" className="text-red-500 text-sm hover:text-white transition-colors">Lihat Semua →</a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {catalog.map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-square bg-zinc-900 rounded-xl mb-4 relative overflow-hidden border border-white/5 group-hover:border-red-600/50 transition-all">
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-black text-2xl group-hover:scale-110 transition-transform duration-500">
                    IMG
                  </div>
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.tag}
                  </div>
                </div>
                <h3 className="font-bold text-white text-sm">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: PRICING (GLASS EFFECT) --- */}
      <section id="pricing" className="relative z-10 py-32 px-4 flex items-center justify-center">
        {/* Latar Belakang Cahaya Fokus */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/10 to-transparent pointer-events-none"></div>

        <SpotlightCard className="w-full max-w-lg rounded-3xl p-1 bg-gradient-to-b from-white/10 to-transparent">
          <div className="bg-black/80 backdrop-blur-xl rounded-[1.4rem] p-10 text-center h-full border border-white/5">
            
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase mb-4 block">Membership Premium</span>
            <h2 className="text-4xl font-bold text-white mb-2">Buka Semuanya</h2>
            <p className="text-gray-400 text-sm mb-8">Akses semua materi rahasia dan komunitas.</p>

            <div className="text-6xl font-bold text-white mb-8 tracking-tighter">
              30rb<span className="text-lg text-gray-500 font-normal">/bln</span>
            </div>

            <div className="space-y-4 mb-10 text-left pl-4 border-l border-zinc-800">
              <div className="text-sm text-gray-300">✅ E-Course Breeding Lengkap</div>
              <div className="text-sm text-gray-300">✅ Akses AI Guppy Tools</div>
              <div className="text-sm text-gray-300">✅ Grup WhatsApp Exclusive</div>
            </div>

            <a 
              href="/member" 
              className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-red-900/50 uppercase tracking-widest"
            >
              MASUK MEMBER AREA
            </a>
            
            <p className="mt-4 text-[10px] text-gray-600 uppercase">
              Sudah punya akun? Login di dalam.
            </p>
          </div>
        </SpotlightCard>
      </section>

      <footer className="py-8 text-center text-zinc-700 text-xs relative z-10 border-t border-white/5 bg-black">
        &copy; 2026 Guppy Indonesia. All Rights Reserved.
      </footer>
    </main>
  );
}
