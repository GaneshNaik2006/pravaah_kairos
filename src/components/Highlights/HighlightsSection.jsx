import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, LayoutGrid, Orbit, ArrowRight, ArrowLeft, X, ArrowUpRight } from 'lucide-react';

export default function HighlightsSection() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [viewMode, setViewMode] = useState('coverflow'); // 'coverflow' or 'list'
  
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const galleryItems = [
    {
      id: 1,
      title: 'SINGULARITY PRONITE 2026',
      tag: 'LIVE EDM CONCERT',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
      caption: '15,000+ crowd roaring at the main festival grounds under high-octane laser light arrays.',
      meta: 'EPOCH_2026 // MAIN STAGE // 15,000+ ATTENDEES',
    },
    {
      id: 2,
      title: 'CHRONO HACKATHON MATRIX',
      tag: '36H HACKATHON',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
      caption: 'Midnight intense coding session as 120+ teams construct AI and Web3 prototypes.',
      meta: 'EPOCH_2026 // LHC COMPLEX // 36 HOURS',
    },
    {
      id: 3,
      title: 'EUPHONY BATTLE OF BANDS',
      tag: 'LIVE ROCK & METAL',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
      caption: 'High-energy guitar solo performance under stage spotlights at the Open Air Amphitheatre.',
      meta: 'EPOCH_2026 // AMPHITHEATRE // ROCK FINALS',
    },
    {
      id: 4,
      title: 'VERVE FUTURISTIC RUNWAY',
      tag: 'CYBERPUNK FASHION',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
      caption: 'Cyberpunk fashion collection presented by collegiate couture teams on the main stage.',
      meta: 'EPOCH_2026 // MAIN AUDITORIUM // FASHION SHOW',
    },
    {
      id: 5,
      title: 'VALORANT ESPORTS FINALS',
      tag: '5v5 LAN ARENA',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
      caption: 'Pro gaming rigs and live shoutcasting setup during the grand finals showdown.',
      meta: 'EPOCH_2026 // ESPORTS HUB // LAN FINALS',
    },
    {
      id: 6,
      title: 'AUTONOMOUS DRONE GRAND PRIX',
      tag: 'FPV RACING & AI',
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop',
      caption: 'High-speed FPV drones flying through glowing neon obstacle rings at the outdoor stadium.',
      meta: 'EPOCH_2026 // STADIUM // DRONE ARENA',
    },
    {
      id: 7,
      title: 'KAIROS STARTUP SUMMIT',
      tag: 'VENTURE PITCH',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop',
      caption: 'Early-stage founders pitching revolutionary deep-tech ventures to angel investors.',
      meta: 'EPOCH_2026 // SEMINAR HALL // SEED FUND',
    },
    {
      id: 8,
      title: 'CELEBRITY PRONITE NIGHTS',
      tag: 'BOLLYWOOD HEADLINER',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop',
      caption: 'A star-studded musical evening under fireworks and laser illumination.',
      meta: 'EPOCH_2026 // MAIN GROUNDS // CELEBRITY NIGHT',
    },
    {
      id: 9,
      title: 'KAIROS EDM MAINSTAGE PYRO',
      tag: 'EDM NIGHT',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
      caption: 'High-voltage pyrotechnic sparks shooting 40ft into the midnight sky as top DJ drop hits.',
      meta: 'EPOCH_2026 // MAINSTAGE // 18,000+ AUDIENCE',
    },
    {
      id: 10,
      title: 'ANIME & CYBERPUNK COSPLAY',
      tag: 'COSPLAY ARENA',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop',
      caption: 'Elaborate handmade armor suits and glowing LED props presented on the outdoor amphitheatre stage.',
      meta: 'EPOCH_2026 // AMPHITHEATRE // COSPLAY FINALS',
    },
    {
      id: 11,
      title: 'INTER-COLLEGIATE FOOTBALL',
      tag: 'SPORTS FINALS',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
      caption: 'Floodlit stadium grand finals packed with roaring alumni and student cheer squads.',
      meta: 'EPOCH_2026 // STADIUM // GOLD MEDAL MATCH',
    },
    {
      id: 12,
      title: 'CHRONO LASER SPECTACLE',
      tag: 'LIGHT SHOW',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
      caption: 'Multi-colored 3D vector laser beams piercing the foggy campus canopy in synchronized rhythm.',
      meta: 'EPOCH_2026 // CENTRAL PLAZA // 3D LASER ARENA',
    },
    {
      id: 13,
      title: 'BEATBOX & STREET DANCE',
      tag: 'STREET BATTLES',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop',
      caption: 'Raw underground street dance cyphers and vocal beatboxing duels attracting massive crowds.',
      meta: 'EPOCH_2026 // OPEN COURTYARD // DANCE FINALS',
    },
    {
      id: 14,
      title: 'GRAND FIREWORKS FINALE',
      tag: 'CLOSING CEREMONY',
      image: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=800&auto=format&fit=crop',
      caption: 'A dazzling 15-minute aerial pyrotechnic fireworks display marking the grand conclusion of KAIROS.',
      meta: 'EPOCH_2026 // SKYLINE // CLOSING FINALE',
    },
  ];

  const totalCards = galleryItems.length;

  // 1. CONTINUOUS SMOOTH AUTOPLAY LOOP (FILM STRIP EFFECT)
  useEffect(() => {
    if (viewMode !== 'coverflow') return;

    let lastTime = performance.now();

    const animate = (time) => {
      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      if (!isHovered) {
        setScrollOffset((prev) => {
          let next = prev + delta * 0.45; // Smooth constant linear speed
          if (next >= totalCards) next -= totalCards;
          return next;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isHovered, viewMode, totalCards]);

  // 3. HOVER-TO-PAUSE & UNLOCKED MOUSE WHEEL NAVIGATION
  const handleWheel = (e) => {
    if (viewMode !== 'coverflow') return;
    const delta = e.deltaY * 0.0025;
    setScrollOffset((prev) => {
      let next = prev + delta;
      while (next < 0) next += totalCards;
      while (next >= totalCards) next -= totalCards;
      return next;
    });
  };

  const handleNext = () => {
    setScrollOffset((prev) => (Math.floor(prev) + 1) % totalCards);
  };

  const handlePrev = () => {
    setScrollOffset((prev) => (Math.floor(prev) - 1 + totalCards) % totalCards);
  };

  // Active center item index
  const activeCenterIndex = Math.round(scrollOffset) % totalCards;

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative w-full min-h-[92vh] bg-transparent text-white py-8 px-4 sm:px-6 overflow-hidden flex flex-col justify-between z-10"
    >
      {/* AMBIENT BACKGROUND GLOW (CLEAN NO DOTS) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-full h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(0,242,254,0.12)_0%,rgba(243,85,218,0.06)_45%,transparent_75%)] blur-3xl pointer-events-none" />

      {/* HEADER & VIEW MODE TOGGLE BUTTON */}
      <div className="text-center relative z-20 max-w-4xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-950/80 border border-[#00F2FE]/40 text-[#00F2FE] text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(0,242,254,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-[#F355DA]" />
          <span>CHRONO RECALL // AUTOPLAY 3D COVER FLOW ({totalCards} DOSSIERS)</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F2FE] to-[#F355DA] drop-shadow-[0_0_25px_rgba(0,242,254,0.3)]">
          CHRONO RECALL
        </h2>

        {/* VIEW MODE TOGGLE BUTTON */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            onClick={() => setViewMode('coverflow')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              viewMode === 'coverflow'
                ? 'bg-slate-900 border border-[#00F2FE] text-[#00F2FE] shadow-[0_0_20px_rgba(0,242,254,0.4)] scale-105'
                : 'bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Orbit className="w-4 h-4 text-[#00F2FE]" />
            <span>AUTOPLAY 3D DECK</span>
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              viewMode === 'list'
                ? 'bg-slate-900 border border-[#F355DA] text-[#F355DA] shadow-[0_0_20px_rgba(243,85,218,0.4)] scale-105'
                : 'bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4 text-[#F355DA]" />
            <span>MISSION LIST</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE CONTENT DISPLAY */}
      {viewMode === 'coverflow' ? (
        /* 1, 2 & 3. AUTOPLAY 3D COVER FLOW DECK WITH REAL-TIME ANGLE UPDATES & HOVER PAUSE */
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onWheel={handleWheel}
          className="relative w-full min-h-[500px] flex items-center justify-center my-6 overflow-hidden [perspective:1200px] select-none"
        >
          {/* NAVIGATION BUTTONS */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-12 z-40 p-4 rounded-full bg-slate-950/90 border border-[#00F2FE]/50 text-[#00F2FE] hover:scale-110 hover:bg-[#00F2FE] hover:text-black transition-all shadow-[0_0_25px_rgba(0,242,254,0.4)]"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-12 z-40 p-4 rounded-full bg-slate-950/90 border border-[#00F2FE]/50 text-[#00F2FE] hover:scale-110 hover:bg-[#00F2FE] hover:text-black transition-all shadow-[0_0_25px_rgba(0,242,254,0.4)]"
          >
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* 3D HORIZONTAL FLEX ROW TRACK */}
          <div className="flex items-center justify-center w-full h-[420px] relative [transform-style:preserve-3d]">
            {galleryItems.map((item, idx) => {
              // 2. SEAMLESS CORE ANGLE UPDATES IN REAL-TIME
              let rawOffset = idx - scrollOffset;

              // Infinite loop modulo wrap-around
              while (rawOffset > totalCards / 2) rawOffset -= totalCards;
              while (rawOffset < -totalCards / 2) rawOffset += totalCards;

              const absOffset = Math.abs(rawOffset);

              // Render visible card range
              if (absOffset > 3.5) return null;

              // Continuous 3D Perspective Calculations based on real-time screen coordinates
              const rotateY = Math.max(-45, Math.min(45, rawOffset * -45));
              const translateX = rawOffset * 320;
              const scale = Math.max(0.72, 1.08 - absOffset * 0.14);
              const opacity = Math.max(0.2, 1 - absOffset * 0.32);
              const zIndex = Math.round(100 - absOffset * 20);

              const isCenter = absOffset < 0.4;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedPhoto(item)}
                  style={{
                    position: 'absolute',
                    transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    transformStyle: 'preserve-3d',
                    transition: isHovered ? 'transform 0.15s ease-out, opacity 0.15s ease-out' : 'none',
                  }}
                  className={`group w-[320px] sm:w-[500px] h-[350px] sm:h-[380px] rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between p-6 backdrop-blur-2xl transition-shadow duration-500 ${
                    isCenter
                      ? 'bg-slate-950/90 border-2 border-[#00F2FE] shadow-[0_0_60px_rgba(0,242,254,0.45)]'
                      : 'bg-slate-950/70 border border-slate-800 hover:border-[#F355DA]/50 shadow-2xl'
                  }`}
                >
                  {/* BACKGROUND IMAGE */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  </div>

                  {/* CARD TOP BADGE */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-slate-950/90 border border-[#00F2FE]/50 text-[#00F2FE] text-xs font-mono font-bold tracking-widest uppercase backdrop-blur-md shadow-md">
                      {item.tag}
                    </span>
                    <div className="p-2 rounded-full bg-slate-950/80 border border-slate-700 text-white group-hover:bg-[#00F2FE] group-hover:text-black transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* CARD BOTTOM CONTENT */}
                  <div className="relative z-10 space-y-2">
                    <span className="text-xs font-mono text-[#F355DA] font-bold block">
                      {item.meta}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-none group-hover:text-[#00F2FE] transition-colors drop-shadow-md">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 font-sans leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* FLAT MISSION LIST MODE */
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8 z-20">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03, y: -4 }}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-950/90 border border-slate-800 hover:border-[#00F2FE] p-3 cursor-pointer shadow-xl transition-all"
            >
              <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/90 border border-[#00F2FE]/50 text-[#00F2FE] text-[9px] font-mono font-bold">
                  {item.tag}
                </div>
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="text-[9px] font-mono text-[#F355DA] font-bold block mb-0.5">
                {item.meta}
              </span>
              <h3 className="text-sm font-bold text-white uppercase truncate group-hover:text-[#00F2FE]">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      )}

      {/* FOOTER COUNTER METRICS */}
      <div className="relative z-20 max-w-xl mx-auto w-full text-center text-xs font-mono text-cyan-300/80 uppercase tracking-widest flex items-center justify-between">
        <span>DOSSIER {activeCenterIndex + 1} OF {totalCards}</span>
        <span>PRAVAAH ’27 CHRONO RECALL</span>
      </div>

      {/* DOSSIER MODAL LIGHTBOX */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-cyan-950 border border-[#00F2FE]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 border border-[#00F2FE]/50 text-[#00F2FE] hover:text-white hover:bg-cyan-950 hover:scale-110 transition-all backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative md:w-2/3 h-72 sm:h-96 md:h-auto overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-1/3 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-cyan-950 border border-[#00F2FE]/40 text-[#00F2FE] text-[10px] font-mono font-bold tracking-widest uppercase">
                    {selectedPhoto.tag}
                  </span>

                  <h3 className="text-2xl font-bold text-white tracking-tight mt-4">
                    {selectedPhoto.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mt-3 font-sans">
                    {selectedPhoto.caption}
                  </p>
                </div>

                <div className="border-t border-[#00F2FE]/20 pt-4 text-xs font-mono text-cyan-300/80">
                  <span className="text-slate-500 uppercase block mb-1">DOSSIER METADATA</span>
                  <span>{selectedPhoto.meta}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
