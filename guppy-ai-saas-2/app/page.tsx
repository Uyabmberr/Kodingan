'use client';

import BuyButton from "@/components/BuyButton";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { MouseEvent, useState, useRef, useEffect } from "react";

// --- KOMPONEN KARTU SENTER (SPOTLIGHT CARD) ---
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
      className={`group relative border border-red-900/30 bg-black/80 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      role="region"
      aria-label="Spotlight card with interactive effect"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(220, 38, 38, 0.3),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// --- KOMPONEN KATALOG DENGAN EFFECT 3D ---
function CatalogCard({ item, index }: { item: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Halo, saya ingin membeli ${item.name} (${item.price})`);
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="aspect-[9/16] bg-gradient-to-br from-black to-red-950/50 rounded-2xl mb-4 relative overflow-hidden border border-red-900/50 group-hover:border-red-600/80 transition-all shadow-2xl shadow-red-900/50"
        aria-label={`${item.name} - ${item.price}`}
      >
        {/* 3D GLASS EFFECT */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* PRODUCT IMAGE SIMULATION */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-6xl font-black text-red-900/50 group-hover:text-red-500 transition-colors">
            🐟
          </div>
        </div>

        {/* TAG POJOK KANAN ATAS */}
        <div
          className="absolute top-2 right-2 bg-gradient-to-r from-red-600 to-red-800 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg z-20 border border-red-500/50"
          aria-label={`Tag: ${item.tag}`}
        >
          {item.tag}
        </div>

        {/* HOVER EFFECT LAYER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-4"
        >
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-800 text-black py-3 rounded-xl font-bold hover:from-yellow-500 hover:to-yellow-700 transition-all shadow-lg transform hover:scale-105 shadow-yellow-600/50 border border-yellow-400/50"
          >
            BELI VIA WA →
          </button>
        </motion.div>
      </motion.div>

      {/* INFO PRODUK */}
      <div className="px-2">
        <h3 className="font-bold text-white text-sm uppercase truncate" aria-label={`Product name: ${item.name}`}>
          {item.name}
        </h3>
        <p className="text-red-500 font-mono text-xs mt-1">{item.price}</p>
      </div>
    </motion.div>
  );
}

// --- DATA ---
const features = [
  { title: "TEKNIK JUALAN", desc: "RAHASIA KAMI DALAM MENCAPAI TARGET" },
];

const catalog = [
  { name: "Albino Full Red", price: "Rp 150K", tag: "BEST SELLER", alt: "Albino Full Red Guppy Fish" },
  { name: "Topaz", price: "Rp 200K", tag: "KONTES", alt: "Blue Moscow Guppy Fish" },
  { name: "PRTDE", price: "Rp 100K", tag: "PEMULA", alt: "Black Moscow Guppy Fish" },
  { name: "Guppy Blue Diamondte", price: "Rp 120K", tag: "RARE", alt: "HB White Guppy Fish" },
];

// Lightweight placeholder for catalog items
function CatalogPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-6xl font-black text-red-900/50">
        🐟
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">

      {/* 1. BACKGROUND NOISE TEXTURE */}
      <div
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          backgroundSize: "300px",
          filter: "brightness(100%) contrast(150%)"
        }}
        aria-hidden="true"
      ></div>

      {/* 2. AMBIENT GLOW */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-900/20 blur-[120px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      ></div>

      {/* 3. UNIQUE LIQUID GLASS EFFECT */}
      <div
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,215,0,0.1) 0%, transparent 50%)",
          animation: "float 20s ease-in-out infinite"
        }}
        aria-hidden="true"
      ></div>

      {/* 4. PARTICLE EFFECT */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
          />
        ))}
      </div>

      {/* --- HERO SECTION --- */}
      <section
        className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 pb-24"
        aria-labelledby="hero-title"
      >

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="mb-6 flex justify-center">
            <span
              className="py-1 px-3 border border-white/20 rounded-full text-xs font-mono text-gray-400 tracking-widest uppercase bg-white/5 backdrop-blur-sm"
              aria-label="Community tag"
            >
              Komunitas Eksklusif
            </span>
          </div>

          <h1
            id="hero-title"
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 mb-6"
          >
            GUPPY <span className="text-red-600">INDONESIA.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Selamat datang di komunitas guppy terbesar No.3 di Indonesia. <br />
            Tempat para pecinta guppy berkumpul dan berbagi ilmu.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pricing"
              className="group relative px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-800 text-black font-bold rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-yellow-500"
            >
              <span className="relative z-10 group-hover:text-white transition-colors">GABUNG SEKARANG</span>
              <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </a>
            <a
              href="https://www.instagram.com/guppyindonesia111"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-red-500/50 rounded-full text-red-300 hover:bg-red-600/20 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500"
            >
              Lihat Bukti (Instagram)
            </a>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-gray-500 text-xs tracking-widest"
          aria-label="Scroll indicator"
        >
          SCROLL TO REVEAL
        </motion.div>
      </section>

      {/* --- SECTION 2: GRID SPOTLIGHT --- */}
      <section
        className="relative z-10 py-24 px-4 max-w-6xl mx-auto"
        aria-labelledby="features-heading"
      >
        <div className="mb-12 border-l-2 border-red-600 pl-6">
          <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold">MENGAPA KAMI?</h2>
          <p className="text-gray-500">Bukan sekadar teori. Ini praktik lapangan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feat, i) => (
            <SpotlightCard key={i} className="rounded-2xl p-8 hover:bg-zinc-900 transition-colors">
              <div className="w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center mb-6 text-red-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-wide">{feat.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* --- SECTION 3: KATALOG REELS & VIDEO (STOK TERBATAS) --- */}
      <section
        className="relative z-10 py-20 bg-zinc-950/50 border-y border-white/5"
        aria-labelledby="catalog-heading"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
            <div>
              <span className="text-red-500 font-bold tracking-widest text-xs uppercase mb-2 block animate-pulse">● Live Update</span>
              <h2 id="catalog-heading" className="text-2xl sm:text-3xl font-bold">STOK TERBATAS</h2>
            </div>
            <a
              href="https://www.instagram.com/guppyindonesia.katalog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-sm hover:text-white transition-colors border-b border-gray-600 hover:border-white pb-1 self-start"
            >
              Lihat Katalog Full →
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {catalog.map((item, i) => (
              <CatalogCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: PRICING (MENUJU MEMBER AREA) --- */}
      <section
        id="pricing"
        className="relative z-10 py-32 px-4 flex items-center justify-center"
        aria-labelledby="pricing-heading"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/10 to-transparent pointer-events-none"></div>

        <SpotlightCard className="w-full max-w-lg rounded-3xl p-1 bg-gradient-to-b from-white/10 to-transparent">
          <div className="bg-black/80 backdrop-blur-xl rounded-[1.4rem] p-10 text-center h-full border border-white/5">

            <span className="text-red-500 font-bold tracking-widest text-xs uppercase mb-4 block">Membership Premium</span>
            <h2 id="pricing-heading" className="text-3xl sm:text-4xl font-bold text-white mb-2">UNLOCK EVERYTHING</h2>
            <p className="text-gray-400 text-sm mb-8">Akses semua materi rahasia.</p>

            <div className="text-5xl sm:text-6xl font-bold text-white mb-8 tracking-tighter">
              30rb<span className="text-base sm:text-lg text-gray-500 font-normal">/SELAMANYA</span>
            </div>

            <div className="space-y-4 mb-10 text-left pl-4 border-l border-zinc-800">
              <div className="text-sm text-gray-300">✅ E-Course KHUSUS</div>
            </div>

            {/* TOMBOL PEMBAYARAN LANGSUNG */}
            <BuyButton
              price={30000}
              productName="Guppy VIP Access"
              className="w-full py-5 rounded-xl shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:shadow-[0_0_50px_rgba(255,215,0,0.6)] uppercase tracking-[0.2em] text-sm"
            >
              MASUK MEMBER AREA →
            </BuyButton>

            <p className="mt-6 text-[10px] text-gray-500 uppercase tracking-widest">
              Login atau Daftar di Halaman Selanjutnya
            </p>
          </div>
        </SpotlightCard>
      </section>

      <footer
        className="py-8 text-center text-zinc-700 text-xs relative z-10 border-t border-white/5 bg-black"
        aria-label="Footer with copyright information"
      >
        &copy; 2026 Guppy Indonesia. All Rights Reserved.
      </footer>
    </main>
  );
}
