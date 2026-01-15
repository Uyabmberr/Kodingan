'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Cek apakah mouse sedang menunjuk tombol atau link
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, []);

  return (
    <>
      {/* Titik Utama */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-red-600 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 0 : 1 // Hilang saat hover, ganti jadi lingkaran besar
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      
      {/* Lingkaran Luar (Ekor Halus) */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-white rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 2.5 : 1, // Membesar saat hover
          backgroundColor: isHovering ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0)"
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }} // Lebih lambat biar ada efek "mengayun"
      />
    </>
  );
}
