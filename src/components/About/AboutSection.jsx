import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Sparkles, Trophy, Users, Globe, Zap, ArrowRight, X } from 'lucide-react';

export default function AboutSection() {
  // Active focused face: null (spinning ambiently) or 1, 2, 3
  const [activeFace, setActiveFace] = useState(null);

  const loreData = {
    1: {
      tag: '01 // THE ESSENCE',
      title: 'WHAT IS PRAVAAH?',
      subtitle: 'THE GRAND FESTIVAL CONVERGENCE',
      badgeColor: 'bg-[#00F2FE] text-slate-950',
      borderGlow: 'border-[#00F2FE] shadow-[0_0_50px_rgba(0,242,254,0.6)] ring-2 ring-[#00F2FE]/50',
      description:
        'PRAVAAH is the premier annual socio-cultural and techno-management festival of IIT Bhubaneswar. A multi-dimensional 3-day extravaganza uniting over 50,000+ students, deep-tech innovators, roboticists, and collegiate performers from across the nation.',
      highlights: [
        '50,000+ Student Footfall Across India',
        '36-Hour Flagship AI & Hardware Hackathons',
        'International EDM DJ Star Pronites',
        'National Esports 5v5 Tactical LAN Arenas',
      ],
    },
    2: {
      tag: '02 // THE MOTIF',
      title: 'THE KAIROS THEME',
      subtitle: 'TEMPORAL MULTIVERSE CONVERGENCE',
      badgeColor: 'bg-[#F355DA] text-slate-950',
      borderGlow: 'border-[#F355DA] shadow-[0_0_50px_rgba(243,85,218,0.6)] ring-2 ring-[#F355DA]/50',
      description:
        'Derived from Ancient Greek, KAIROS symbolizes the critical, opportune moment where past legacy, present velocity, and futuristic vision align. Our theme encapsulates temporal multidimensional timelines and cybernetic aesthetics.',
      highlights: [
        'Multiverse Time-Chamber Installations',
        'Cyberpunk Avant-Garde Runway Shows',
        'Venture Pitch & Angel Seed Summit',
        'Live Broadcast 4K Arena Streaming',
      ],
    },
    3: {
      tag: '03 // THE DATA',
      title: 'FESTIVAL METRICS',
      subtitle: 'HIGH-IMPACT HUD TRANSMISSION',
      badgeColor: 'bg-purple-500 text-white',
      borderGlow: 'border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.6)] ring-2 ring-purple-500/50',
      metrics: [
        { label: 'NATIONAL FOOTFALL', value: '50,000+', icon: Users, color: '#00F2FE' },
        { label: 'TOTAL PRIZE POOL', value: '₹15,00,000+', icon: Trophy, color: '#F355DA' },
        { label: 'COLLEGES & INSTITUTES', value: '150+', icon: Globe, color: '#a855f7' },
        { label: 'FLAGSHIP STAGES', value: '45+', icon: Zap, color: '#f59e0b' },
      ],
    },
  };

  const handleFaceClick = (faceId) => {
    if (activeFace === faceId) {
      setActiveFace(null); // Un-snap face
    } else {
      setActiveFace(faceId); // Snap-lock active face
    }
  };

  return (
    /* 1. VIEWPORT 3D CANVAS CONTEXT */
    <section
      id="about"
      className="relative min-h-[90vh] sm:min-h-[100vh] w-full bg-[#020208] text-white py-8 sm:py-20 px-4 sm:px-8 flex flex-col justify-between items-center overflow-hidden [perspective:1500px] z-10"
    >
      {/* SEAMLESS TOP GRADIENT BLEND WITH HERO SECTION */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#020208] via-[#020208]/80 to-transparent pointer-events-none z-10" />

      {/* HIGH-CONTRAST NEON AMBIENT GLOW BACKDROP */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(ellipse_at_center,rgba(0,242,254,0.16)_0%,rgba(243,85,218,0.12)_40%,transparent_75%)] blur-3xl pointer-events-none" />

      {/* BACKGROUND GRID */}
      <div
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 242, 254, 0.15) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        className="absolute inset-0 opacity-20 pointer-events-none"
      />

      {/* SECTION HEADER */}
      <div className="relative z-20 text-center max-w-4xl mx-auto space-y-1 sm:space-y-2 pt-1 sm:pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-950/90 border border-[#00F2FE]/40 text-[#00F2FE] text-[11px] sm:text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(0,242,254,0.25)]">
          <Layers className="w-3.5 h-3.5 text-[#F355DA] animate-pulse" />
          <span>3D LORE PRISM // FESTIVAL PILLARS</span>
        </div>

        <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F2FE] to-[#F355DA] drop-shadow-[0_0_30px_rgba(0,242,254,0.35)]">
          ABOUT THE FEST
        </h2>

        <p className="text-slate-400 font-mono text-[11px] sm:text-sm tracking-widest uppercase max-w-lg mx-auto">
          {activeFace
            ? 'PRISM LORE FACE FOCUSED. Click face or button to release 3D rotation.'
            : 'Click or hover any 3D Lore Face to snap-lock and project festival details.'}
        </p>
      </div>

      {/* 2. 3D CRYSTALLINE LORE PRISM CONTAINER (REDUCED MOBILE MARGIN & HEIGHT) */}
      <div className="relative w-full max-w-4xl h-[310px] sm:h-[440px] flex items-center justify-center my-1 sm:my-6 z-20 [transform-style:preserve-3d]">
        
        {/* ROTATING 3D PRISM CORE STAGE */}
        <motion.div
          animate={
            activeFace === null
              ? { rotateY: [0, 360] }
              : { rotateY: activeFace === 1 ? 0 : activeFace === 2 ? -120 : -240 }
          }
          transition={
            activeFace === null
              ? { duration: 30, ease: 'linear', repeat: Infinity }
              : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }
          className="relative w-[280px] sm:w-[380px] h-[340px] sm:h-[360px] flex items-center justify-center [transform-style:preserve-3d]"
        >
          {/* FACE 01: THE ESSENCE (0deg, translateZ(210px)) */}
          <div
            onClick={() => handleFaceClick(1)}
            style={{
              transform: `rotateY(0deg) translateZ(${typeof window !== 'undefined' && window.innerWidth < 640 ? 150 : 210}px) ${activeFace === 1 ? 'scale(1.12)' : 'scale(1)'}`,
            }}
            className={`absolute inset-0 rounded-3xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-2xl bg-slate-950/85 border-2 transition-all duration-500 cursor-pointer select-none ${
              activeFace === 1
                ? 'border-[#00F2FE] shadow-[0_0_60px_rgba(0,242,254,0.75)] ring-2 ring-[#00F2FE]/60 z-50 bg-slate-950/95'
                : 'border-slate-800 hover:border-[#00F2FE]/70 hover:shadow-[0_0_35px_rgba(0,242,254,0.4)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#00F2FE] text-slate-950 font-mono text-xs font-bold uppercase tracking-wider">
                {loreData[1].tag}
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#00F2FE] animate-ping" />
            </div>

            <div className="space-y-1.5 my-2">
              <span className="text-[10px] font-mono text-[#F355DA] font-bold tracking-widest uppercase block">
                {loreData[1].subtitle}
              </span>
              <h3 className="text-2xl font-black font-sans text-white uppercase tracking-tight">
                {loreData[1].title}
              </h3>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed font-sans line-clamp-3">
              {loreData[1].description}
            </p>

            <div className="pt-3 flex items-center justify-between border-t border-cyan-500/20">
              <span className="text-[10px] font-mono text-slate-400">CLICK TO SNAP-LOCK</span>
              <div className="w-7 h-7 rounded-full bg-slate-900 border border-[#00F2FE]/60 flex items-center justify-center text-[#00F2FE]">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* FACE 02: THE MOTIF (120deg, translateZ(210px)) */}
          <div
            onClick={() => handleFaceClick(2)}
            style={{
              transform: `rotateY(120deg) translateZ(${typeof window !== 'undefined' && window.innerWidth < 640 ? 150 : 210}px) ${activeFace === 2 ? 'scale(1.12)' : 'scale(1)'}`,
            }}
            className={`absolute inset-0 rounded-3xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-2xl bg-slate-950/85 border-2 transition-all duration-500 cursor-pointer select-none ${
              activeFace === 2
                ? 'border-[#F355DA] shadow-[0_0_60px_rgba(243,85,218,0.75)] ring-2 ring-[#F355DA]/60 z-50 bg-slate-950/95'
                : 'border-slate-800 hover:border-[#F355DA]/70 hover:shadow-[0_0_35px_rgba(243,85,218,0.4)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#F355DA] text-slate-950 font-mono text-xs font-bold uppercase tracking-wider">
                {loreData[2].tag}
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#F355DA] animate-ping" />
            </div>

            <div className="space-y-1.5 my-2">
              <span className="text-[10px] font-mono text-[#00F2FE] font-bold tracking-widest uppercase block">
                {loreData[2].subtitle}
              </span>
              <h3 className="text-2xl font-black font-sans text-white uppercase tracking-tight">
                {loreData[2].title}
              </h3>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed font-sans line-clamp-3">
              {loreData[2].description}
            </p>

            <div className="pt-3 flex items-center justify-between border-t border-pink-500/20">
              <span className="text-[10px] font-mono text-slate-400">CLICK TO SNAP-LOCK</span>
              <div className="w-7 h-7 rounded-full bg-slate-900 border border-[#F355DA]/60 flex items-center justify-center text-[#F355DA]">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* FACE 03: THE DATA (240deg, translateZ(210px)) */}
          <div
            onClick={() => handleFaceClick(3)}
            style={{
              transform: `rotateY(240deg) translateZ(${typeof window !== 'undefined' && window.innerWidth < 640 ? 150 : 210}px) ${activeFace === 3 ? 'scale(1.12)' : 'scale(1)'}`,
            }}
            className={`absolute inset-0 rounded-3xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-2xl bg-slate-950/85 border-2 transition-all duration-500 cursor-pointer select-none ${
              activeFace === 3
                ? 'border-purple-500 shadow-[0_0_60px_rgba(168,85,247,0.75)] ring-2 ring-purple-500/60 z-50 bg-slate-950/95'
                : 'border-slate-800 hover:border-purple-500/70 hover:shadow-[0_0_35px_rgba(168,85,247,0.4)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-purple-500 text-white font-mono text-xs font-bold uppercase tracking-wider">
                {loreData[3].tag}
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
            </div>

            <div className="space-y-1.5 my-2">
              <span className="text-[10px] font-mono text-purple-300 font-bold tracking-widest uppercase block">
                {loreData[3].subtitle}
              </span>
              <h3 className="text-2xl font-black font-sans text-white uppercase tracking-tight">
                {loreData[3].title}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 my-1">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-xs font-bold font-mono text-[#00F2FE]">50,000+</span>
                <span className="text-[9px] font-mono text-slate-400 block">FOOTFALL</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-xs font-bold font-mono text-[#F355DA]">₹15,00,000+</span>
                <span className="text-[9px] font-mono text-slate-400 block">PRIZE POOL</span>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-purple-500/20">
              <span className="text-[10px] font-mono text-slate-400">CLICK TO SNAP-LOCK</span>
              <div className="w-7 h-7 rounded-full bg-slate-900 border border-purple-500/60 flex items-center justify-center text-purple-300">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

        </motion.div>

      </div>

      {/* 4. SNAP-LOCKED CONSOLE READOUT PANEL BELOW */}
      <AnimatePresence mode="wait">
        {activeFace && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl relative z-30 mb-6"
          >
            <div className={`rounded-3xl bg-slate-950/95 border-2 backdrop-blur-2xl p-6 sm:p-8 space-y-6 ${loreData[activeFace].borderGlow}`}>
              
              {/* Header & Un-Snap Button */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider ${loreData[activeFace].badgeColor}`}>
                    {loreData[activeFace].tag}
                  </span>
                  <h3 className="text-2xl font-black uppercase text-white tracking-tight pt-2">
                    {loreData[activeFace].title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveFace(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-[#00F2FE] text-xs font-mono font-bold flex items-center gap-2 transition-all"
                >
                  <X className="w-4 h-4 text-[#00F2FE]" />
                  <span>UN-SNAP LORE PRISM [ X ]</span>
                </button>
              </div>

              {/* Face Content Details */}
              {activeFace === 3 ? (
                /* Metrics Grid for Face 3 */
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {loreData[3].metrics.map((m, idx) => {
                    const IconComp = m.icon;

                    return (
                      <div
                        key={idx}
                        className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 text-center space-y-2 hover:border-[#00F2FE]/60 transition-all"
                      >
                        <div
                          style={{ backgroundColor: `${m.color}20`, borderColor: m.color }}
                          className="w-10 h-10 rounded-xl border flex items-center justify-center mx-auto"
                        >
                          <IconComp className="w-5 h-5" style={{ color: m.color }} />
                        </div>
                        <span className="text-xl font-black font-mono text-white block">
                          {m.value}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          {m.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Text & Highlights for Face 1 & 2 */
                <div className="space-y-4">
                  <p className="text-slate-100 text-base leading-relaxed font-sans">
                    {loreData[activeFace].description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {loreData[activeFace].highlights.map((h, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-200 flex items-center gap-2.5"
                      >
                        <Sparkles className="w-4 h-4 text-[#F355DA] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
