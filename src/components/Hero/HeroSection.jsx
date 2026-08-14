import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Compass, Ticket, ArrowRight, Calendar, MapPin } from 'lucide-react';

export default function HeroSection({ onOpenRegister }) {
  const festDate = new Date('2027-02-12T00:00:00');

  const [timeLeft, setTimeLeft] = useState({
    days: 184,
    hours: 10,
    minutes: 42,
    seconds: 15,
  });

  // DYNAMIC MOUSE-TRACKING PARALLAX STATE (3D VIEWPORT DEPTH)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalized coordinates from -0.5 to +0.5
      const normX = (e.clientX / innerWidth) - 0.5;
      const normY = (e.clientY / innerHeight) - 0.5;
      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth Motion Springs for Title 3D Rotation & Offset
  const smoothMouseX = useSpring(mousePos.x, { stiffness: 120, damping: 20 });
  const smoothMouseY = useSpring(mousePos.y, { stiffness: 120, damping: 20 });

  // Scroll Parallax Controls
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 400], [0, -50]);
  const opacityFade = useTransform(scrollY, [0, 350], [1, 0]);

  // Countdown Interval
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = festDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center pt-28 pb-12 overflow-hidden z-10 min-h-[92vh] [perspective:1200px]"
    >
      {/* AMBIENT GLOW BACKLIGHT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(0,242,254,0.18)_0%,rgba(243,85,218,0.08)_45%,transparent_75%)] blur-3xl pointer-events-none" />

      <motion.div
        style={{
          y: titleY,
          opacity: opacityFade,
          x: smoothMouseX.get() * -40,
          y: smoothMouseY.get() * -30,
          rotateY: smoothMouseX.get() * -14,
          rotateX: smoothMouseY.get() * 14,
        }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center [transform-style:preserve-3d]"
      >
        
        {/* 1. FUTURISTIC CYAN BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-950/80 border border-[#00F2FE]/40 backdrop-blur-xl text-[#00F2FE] text-xs sm:text-sm font-mono tracking-widest uppercase shadow-[0_0_25px_rgba(0,242,254,0.25)] mb-6 hover:border-[#00F2FE] transition-all duration-300"
        >
          <Sparkles className="w-4 h-4 text-[#F355DA] animate-pulse" />
          <span>IIT BHUBANESWAR • ANNUAL FESTIVAL 2027</span>
          <div className="w-2 h-2 rounded-full bg-[#00F2FE] animate-ping ml-1" />
        </motion.div>

        {/* 2. CINEMATIC TITLE LOGO - PRAVAAH'27 100% FRAME-FREE (REMOVED DROP-SHADOW BUG ON BG-CLIP-TEXT) */}
        <div className="overflow-hidden mb-3 py-1 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 50, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase font-sans text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-[#00F2FE] flex items-center justify-center flex-wrap gap-1 sm:gap-3 select-none"
          >
            <span>PRAVAAH</span>
            <span>'27</span>
          </motion.h1>
        </div>

        {/* 3. THEME SUBTITLE - KAIROS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#F355DA]/80" />
            <span className="text-2xl sm:text-4xl font-extrabold font-mono tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-[#F355DA] via-purple-300 to-[#00F2FE] uppercase drop-shadow-[0_0_20px_rgba(243,85,218,0.6)]">
              K A I R O S
            </span>
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#F355DA]/80" />
          </div>
          <p className="mt-2.5 text-xs sm:text-sm italic font-mono text-cyan-200/90 tracking-widest uppercase">
            "THE MULTIVERSE OF MOMENTS"
          </p>
        </motion.div>

        {/* 1. DECONSTRUCTED FRAME-FREE COUNTDOWN TIMELINE STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-6 sm:gap-10 mb-12 py-3 px-6 rounded-full bg-slate-950/30 border border-[#00F2FE]/20 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds },
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-black font-mono text-[#00F2FE] drop-shadow-[0_0_20px_rgba(0,242,254,0.7)] tracking-tight">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="mt-1 text-[9px] sm:text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                  {item.label}
                </span>
              </div>

              {idx < 3 && (
                <span className="text-2xl sm:text-4xl font-mono font-bold text-[#F355DA]/60 -mt-3 animate-pulse">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* 3. CLEAN & SYMMETRICAL UNIFORM ACTION BUTTONS (CTA) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-lg mb-8"
        >
          {/* CTA 1: REGISTER NOW (UNIFORM GLASSMORPHIC PILL) */}
          <button
            onClick={onOpenRegister}
            className="group relative min-w-[210px] w-full sm:w-auto h-14 rounded-full bg-slate-950/80 border border-[#00F2FE]/60 text-white font-bold font-mono text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(0,242,254,0.25)] hover:shadow-[0_0_40px_rgba(0,242,254,0.6)] hover:border-[#00F2FE] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden flex items-center justify-center gap-2.5 px-8"
          >
            {/* Sliding Laser Sheen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F2FE]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            <Ticket className="w-4 h-4 text-[#00F2FE] group-hover:rotate-12 transition-transform" />
            <span>REGISTER NOW</span>
            <ArrowRight className="w-4 h-4 text-[#F355DA] group-hover:translate-x-1 transition-transform" />
          </button>

          {/* CTA 2: EXPLORE EVENTS (UNIFORM GLASSMORPHIC PILL) */}
          <a
            href="#events"
            className="group relative min-w-[210px] w-full sm:w-auto h-14 rounded-full bg-slate-950/80 border border-[#F355DA]/60 text-white font-bold font-mono text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(243,85,218,0.25)] hover:shadow-[0_0_40px_rgba(243,85,218,0.6)] hover:border-[#F355DA] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden flex items-center justify-center gap-2.5 px-8"
          >
            {/* Sliding Laser Sheen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F355DA]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            <Compass className="w-4 h-4 text-[#F355DA] group-hover:rotate-45 transition-transform" />
            <span>EXPLORE EVENTS</span>
          </a>
        </motion.div>

        {/* 4. EVENT INFO PILLS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-5 text-xs font-mono text-cyan-200/80"
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/60 border border-slate-800 backdrop-blur-md">
            <Calendar className="w-3.5 h-3.5 text-[#00F2FE]" />
            <span>FEB 3 - FEB 5, 2027</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/60 border border-slate-800 backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-[#F355DA]" />
            <span>IIT BHUBANESWAR CAMPUS</span>
          </div>
        </motion.div>

      </motion.div>

      {/* SEAMLESS BOTTOM GRADIENT TRANSITION BLENDING HERO INTO ABOUT SECTION */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#020208]/60 to-[#020208] pointer-events-none z-20" />
    </section>
  );
}
