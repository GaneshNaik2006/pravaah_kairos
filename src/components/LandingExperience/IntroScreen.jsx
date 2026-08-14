import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function IntroScreen({ onComplete }) {
  useEffect(() => {
    // Hold logo clearly for 4.4 seconds (+2s as requested), then trigger exit transition
    const timer = setTimeout(() => {
      onComplete();
    }, 4400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#020208] text-white"
    >
      <div className="relative flex flex-col items-center justify-center p-6 text-center">
        
        {/* Soft Ambient Cyan Radial Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.75, scale: 1.0 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-cyan-500/30 via-purple-500/20 to-transparent blur-3xl pointer-events-none"
        />

        {/* PRAVAAH Original Clean Emblem Logo */}
        {/* Entrance: Fades In (opacity 0 -> 1, scale 0.92 -> 1.0) */}
        {/* Exit: Fades Out in exact reverse manner (opacity 1 -> 0, scale 1.0 -> 0.92) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="relative z-10"
        >
          <img
            src="/pravaah_logo_clean.png"
            alt="PRAVAAH 2027 Logo"
            className="w-64 sm:w-80 md:w-96 h-auto object-contain drop-shadow-[0_0_40px_rgba(56,189,248,0.6)]"
          />
        </motion.div>

      </div>
    </motion.div>
  );
}
