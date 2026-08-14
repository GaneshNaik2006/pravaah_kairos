import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Film, Sparkles, Tv, CheckCircle2, Zap } from 'lucide-react';

export default function VideoSection({ onSelectVideo }) {
  const videoPlaylist = [
    {
      id: 'official-teaser',
      title: 'PRAVAAH ’27 // OFFICIAL THEME TEASER',
      category: 'FLAGSHIP TEASER',
      duration: '02:14',
      year: 'KAIROS ’27',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
      description: 'The official cinematic trailer revealing KAIROS, multiverse temporal dimensions, and high-voltage festival arenas at IIT Bhubaneswar.',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      stats: '4K Ultra HD • Official Trailer',
    },
    {
      id: 'pronite-aftermovie',
      title: 'SINGULARITY PRONITE // 2026 AFTERMOVIE',
      category: 'CONCERT RECAP',
      duration: '03:45',
      year: 'PRAVAAH ’26',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
      description: 'Relive the electric energy, laser arrays, and screaming 15,000+ crowd at last edition’s celebrity pronite nights.',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      stats: '15,000+ Audience • Live Audio',
    },
    {
      id: 'robowars-tech',
      title: 'ROBOWARS & TECH SPECTRUM REEL',
      category: 'TECH SPECTRUM',
      duration: '02:30',
      year: 'PRAVAAH ’26',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop',
      description: 'Heavyweight battle bots clashing in the steel cage and high-speed autonomous FPV drone circuit heats.',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      stats: 'Combat Arena • 30kg Bots',
    },
    {
      id: 'fashion-cultural',
      title: 'VERVE FASHION & CULTURAL SHOWCASE',
      category: 'CULTURAL REEL',
      duration: '03:10',
      year: 'PRAVAAH ’26',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
      description: 'Cyberpunk couture models and rock band battle solos under stage spotlights at the main amphitheatre.',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      stats: '16 Teams • Cyberpunk Stage',
    },
  ];

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const activeVideo = videoPlaylist[activeVideoIndex];

  // 3D Mouse Tilt Tracking logic for Primary Player
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -(y / rect.height) * 12; // Max 12deg X tilt
    const rotateY = (x / rect.width) * 12;   // Max 12deg Y tilt

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section id="media" className="relative py-20 w-full z-10 bg-transparent overflow-hidden">
      
      {/* AMBIENT FULL-BLEED BACKGROUND GLOW (100% WIDTH, NO SIDE BLACK BOXES) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-full h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,242,254,0.14)_0%,rgba(243,85,218,0.06)_45%,transparent_75%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* SECTION HEADER WITH SCROLL REVEAL */}
        <div className="text-center mb-14 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(56,189,248,0.2)] mb-4"
          >
            <Film className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>FUTURISTIC CINEMATIC DASHBOARD // OFFICIAL REELS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.3)]"
          >
            TEASERS & AFTERMOVIES
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-3 text-cyan-200/70 font-mono text-xs sm:text-sm tracking-widest max-w-xl mx-auto uppercase"
          >
            Click Dock Items Below to Swap Primary Showcase • 3D Mouse Tilt Enabled
          </motion.p>
        </div>

        {/* 1. PRIMARY SHOWCASE PLAYER (16:9 WIDESCREEN DISPLAY CARD WITH 3D MOUSE TILT) */}
        <div className="relative max-w-5xl mx-auto mb-12 [perspective:1000px] z-20">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVideo.id}
              initial={{ opacity: 0, scale: 0.96, filter: 'brightness(1.5) contrast(1.2)' }}
              animate={{ opacity: 1, scale: 1, filter: 'brightness(1) contrast(1)' }}
              exit={{ opacity: 0, scale: 0.96, filter: 'brightness(2) blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              onClick={() => onSelectVideo(activeVideo)}
              className="group relative w-full aspect-video rounded-3xl overflow-hidden border-2 border-cyan-400/60 bg-slate-950/90 shadow-[0_0_50px_rgba(56,189,248,0.35)] cursor-pointer flex flex-col justify-between"
            >
              {/* Background Widescreen Image */}
              <img
                src={activeVideo.image}
                alt={activeVideo.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Ambient Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300" />

              {/* Top Bar Details */}
              <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase backdrop-blur-md shadow-lg">
                    {activeVideo.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-950/70 border border-purple-400/40 text-purple-200 text-xs font-mono font-bold tracking-widest uppercase backdrop-blur-md">
                    {activeVideo.year}
                  </span>
                </div>

                <span className="text-xs font-mono text-cyan-300/90 tracking-wider bg-slate-950/80 px-3 py-1 rounded-full border border-cyan-500/30 backdrop-blur-md">
                  {activeVideo.duration}
                </span>
              </div>

              {/* RADAR PLAY BUTTON (CONTINUOUS LOOPING PULSING WAVE ANIMATION) */}
              <div className="absolute inset-0 m-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-cyan-500/80 border-2 border-white text-white flex items-center justify-center shadow-[0_0_50px_rgba(56,189,248,0.9)] group-hover:scale-110 active:scale-95 transition-all duration-300">
                {/* Radiating Radar Wave Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-cyan-300 animate-ping opacity-75" />
                <div className="absolute -inset-3 rounded-full border border-cyan-400/40 animate-pulse" />
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1.5" />
              </div>

              {/* Bottom Card Title & Metadata Info */}
              <div className="relative z-10 p-6 sm:p-8 space-y-2">
                <h3 className="text-2xl sm:text-4xl font-black font-sans text-white group-hover:text-cyan-300 transition-colors uppercase tracking-tight">
                  {activeVideo.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  {activeVideo.description}
                </p>

                <div className="pt-1 text-xs font-mono text-cyan-300/80 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span>{activeVideo.stats}</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* 2. HORIZONTAL PLAYLIST DOCK (SWAP LOGIC & ACTIVE STATE HIGHLIGHTS) */}
        <div className="relative max-w-5xl mx-auto z-20">
          <span className="text-xs font-mono tracking-widest text-cyan-400/80 px-2 uppercase block mb-3">
            // PLAYLIST DOCK — CLICK TO SWAP SHOWCASE PLAYER
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {videoPlaylist.map((video, idx) => {
              const isActive = activeVideoIndex === idx;

              return (
                <button
                  key={video.id}
                  onClick={() => setActiveVideoIndex(idx)}
                  className={`group text-left rounded-2xl p-3.5 border transition-all duration-300 flex flex-col justify-between space-y-3 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-950/90 via-slate-900/90 to-purple-950/90 border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.3)] scale-[1.03]'
                      : 'bg-slate-950/80 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Thumbnail Image */}
                  <div className="relative h-28 w-full rounded-xl overflow-hidden border border-cyan-500/20 bg-slate-950">
                    <img
                      src={video.image}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/40" />

                    {/* Play icon badge */}
                    <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-cyan-500/80 border border-white text-white flex items-center justify-center">
                      <Play className="w-4 h-4 ml-0.5" />
                    </div>

                    {/* Duration pill */}
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-cyan-300">
                      {video.duration}
                    </div>
                  </div>

                  {/* Meta details */}
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                      <span>{video.category}</span>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />}
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-2 group-hover:text-cyan-200">
                      {video.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
}
