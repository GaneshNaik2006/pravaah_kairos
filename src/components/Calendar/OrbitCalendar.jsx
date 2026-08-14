import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock, MapPin, Terminal, Zap, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function OrbitCalendar({ onRegisterEvent }) {
  const events = [
    {
      id: 'hackathon',
      title: 'CHRONO HACKATHON',
      category: 'TECH & AI',
      dayLabel: 'DAY 01',
      time: '11:00 AM - 11:00 PM (36H)',
      venue: 'LHC Complex - Hall A',
      prize: '₹1,50,000',
      teamSize: '2 - 4 Members',
      badge: 'FLAGSHIP TECH',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
      description: '36-hour non-stop AI, Web3 & Robotics hardware hackathon. Build scalable prototypes judged by top industry tech leaders.',
      rules: ['36-hour coding window.', 'Open source libraries permitted.', 'On-site mentorship available.'],
      coordinators: 'Rohan Verma (+91 98765 43210)',
    },
    {
      id: 'pronite1',
      title: 'SINGULARITY PRONITE',
      category: 'CULTURAL & PRONITES',
      dayLabel: 'DAY 02',
      time: '08:00 PM ONWARDS',
      venue: 'Main Festival Grounds',
      prize: 'STAR PRONITE',
      teamSize: 'All Pass Holders',
      badge: 'STAR NIGHT',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
      description: 'High-octane international EDM DJ performance featuring laser light arrays, pyrotechnics, and 15,000+ roaring crowds.',
      rules: ['PRAVAAH ’27 Pass mandatory.', 'Gates open 06:30 PM.', 'Strict security screening.'],
      coordinators: 'Ananya Roy (+91 98765 43211)',
    },
    {
      id: 'robowars',
      title: 'MECHA CLASH: ROBOWARS',
      category: 'TECH & AI',
      dayLabel: 'DAY 02',
      time: '02:00 PM - 06:00 PM',
      venue: 'Open Air Combat Arena',
      prize: '₹1,00,000',
      teamSize: '2 - 5 Members',
      badge: 'COMBAT ARENA',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop',
      description: 'Heavyweight bot combat in a reinforced steel cage. Watch custom combat robots smash spinners and flippers to claim victory.',
      rules: ['15kg & 30kg weight classes.', 'Active weapon mandatory.', 'Safety check required.'],
      coordinators: 'Vikram Singh (+91 98765 43212)',
    },
    {
      id: 'rockband',
      title: 'EUPHONY: BATTLE OF BANDS',
      category: 'CULTURAL & PRONITES',
      dayLabel: 'DAY 01',
      time: '05:00 PM - 09:00 PM',
      venue: 'Amphitheatre Stage',
      prize: '₹75,000',
      teamSize: '3 - 8 Members',
      badge: 'LIVE MUSIC',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
      description: 'The loudest collegiate rock and metal band competition in Eastern India. Electrify the amphitheatre stage with heavy guitar solos.',
      rules: ['15 minutes stage time.', 'Originals yield bonus points.', 'Standard drum kit provided.'],
      coordinators: 'Kavya Sharma (+91 98765 43213)',
    },
    {
      id: 'esports',
      title: 'VALORANT ESPORTS LAN',
      category: 'ESPORTS ARENA',
      dayLabel: 'DAY 03',
      time: '10:00 AM - 05:00 PM',
      venue: 'Esports Gaming Pavilion',
      prize: '₹80,000',
      teamSize: '5 Players + 1 Sub',
      badge: '5v5 LAN',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
      description: '5v5 tactical shooter LAN tournament with pro gaming setups, live shoutcasting, and stage finals streaming.',
      rules: ['Standard VCT ruleset.', 'LAN server matches.', 'Personal peripherals allowed.'],
      coordinators: 'Aditya Patel (+91 98765 43214)',
    },
    {
      id: 'fashion',
      title: 'VERVE: FUTURISTIC RUNWAY',
      category: 'CULTURAL & PRONITES',
      dayLabel: 'DAY 03',
      time: '06:00 PM - 09:00 PM',
      venue: 'Main Stage Auditorium',
      prize: '₹90,000',
      teamSize: '8 - 16 Models',
      badge: 'RUNWAY',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
      description: 'Avant-garde futuristic fashion runway showcase blending cyberpunk aesthetics, neon couture, and theatrical choreography.',
      rules: ['12 min runway time.', 'Pre-submitted audio tracks.', 'Props permitted within guidelines.'],
      coordinators: 'Sneha Mohanty (+91 98765 43215)',
    },
    {
      id: 'startup',
      title: 'KAIROS STARTUP SUMMIT',
      category: 'FINANCE & CREATIVE',
      dayLabel: 'DAY 02',
      time: '10:00 AM - 01:00 PM',
      venue: 'Seminar Hall 2',
      prize: '₹1,20,000',
      teamSize: '1 - 4 Founders',
      badge: 'VENTURE PITCH',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200&auto=format&fit=crop',
      description: 'Pitch your early-stage venture directly to angel investors, VCs, and incubator leads for immediate seed funding.',
      rules: ['5 min pitch + 3 min Q&A.', 'Working MVP carries bonus weight.'],
      coordinators: 'Arjun Das (+91 98765 43216)',
    },
    {
      id: 'drone',
      title: 'AUTONOMOUS DRONE GRAND PRIX',
      category: 'TECH & AI',
      dayLabel: 'DAY 03',
      time: '01:00 PM - 05:00 PM',
      venue: 'Outdoor Stadium Circuit',
      prize: '₹60,000',
      teamSize: '1 - 3 Pilot/Coders',
      badge: 'FPV RACING',
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1200&auto=format&fit=crop',
      description: 'High-speed FPV drone obstacle circuit racing and autonomous drone navigation challenge through glowing neon gates.',
      rules: ['FPV frequency check mandatory.', 'Autonomous lap optical timing.'],
      coordinators: 'Priya Nayak (+91 98765 43217)',
    },
    {
      id: 'cybersec',
      title: 'CYBERSEC RED TEAM CTF',
      category: 'TECH & AI',
      dayLabel: 'DAY 01',
      time: '01:00 PM - 07:00 PM',
      venue: 'Computer Center - Lab 3',
      prize: '₹85,000',
      teamSize: '1 - 3 Hackers',
      badge: 'CYBER CTF',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
      description: 'Offensive cybersecurity CTF challenge involving reverse engineering, binary exploitation, and Web3 cryptography.',
      rules: ['Jeopardy style CTF format.', 'Self-provided laptop required.'],
      coordinators: 'Devansh Kumar (+91 98765 43218)',
    },
    {
      id: 'quant',
      title: 'ALGO-TRADING & QUANT FINTECH',
      category: 'FINANCE & CREATIVE',
      dayLabel: 'DAY 02',
      time: '02:00 PM - 06:00 PM',
      venue: 'LHC Complex - Room 102',
      prize: '₹70,000',
      teamSize: '1 - 2 Quants',
      badge: 'QUANT FINTECH',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop',
      description: 'Develop automated algorithmic trading strategies and quantitative risk management models against live simulated market feeds.',
      rules: ['Python & C++ APIs provided.', 'Backtested metrics evaluated live.'],
      coordinators: 'Meera Iyer (+91 98765 43219)',
    },
  ];

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedEventModal, setSelectedEventModal] = useState(null);

  const trackRef = useRef(null);
  const pinContainerRef = useRef(null);

  const categories = [
    { label: 'ALL', color: '#00F2FE' },
    { label: 'TECH & AI', color: '#00F2FE' },
    { label: 'CULTURAL & PRONITES', color: '#F355DA' },
    { label: 'ESPORTS ARENA', color: '#a855f7' },
    { label: 'FINANCE & CREATIVE', color: '#f59e0b' },
  ];

  const filteredEvents = activeCategory === 'ALL'
    ? events
    : events.filter(e => e.category === activeCategory);

  const totalCards = filteredEvents.length;
  const zStep = 700; // Rigid Z-distance step per card along negative Z
  const maxCameraZ = Math.max(1, (totalCards - 1) * zStep + 400); // Camera distance for last card to reach center and exit

  // EXACT SCROLL DISTANCE IN PIXELS (NO DEAD BUFFER SCROLL)
  const scrollDistancePx = Math.max(600, (totalCards - 1) * 420 + 300);

  // GSAP SCROLLTRIGGER PINNING
  useEffect(() => {
    if (!trackRef.current || !pinContainerRef.current) return;

    const dist = Math.max(600, (filteredEvents.length - 1) * 420 + 300);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trackRef.current,
        start: 'top top',
        end: `+=${dist}`,
        pin: pinContainerRef.current,
        pinSpacing: true,
        scrub: 0.8,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, trackRef);

    return () => ctx.revert();
  }, [filteredEvents.length]);

  // CONTINUOUS FORWARD CAMERA TRANSLATION DOWN THE CORRIDOR
  const cameraZ = scrollProgress * maxCameraZ;

  // Active Index Tracking
  const rawProgress = scrollProgress * (totalCards - 1);
  const activeIndex = Math.min(totalCards - 1, Math.max(0, Math.round(rawProgress)));
  const currentEvent = filteredEvents[activeIndex] || filteredEvents[0];

  return (
    /* STICKY TIMELINE TRACK */
    <section
      id="events"
      ref={trackRef}
      style={{ height: `calc(100vh + ${scrollDistancePx}px)`, position: 'relative' }}
      className="w-full bg-transparent text-white events-scroll-track z-10"
    >
      {/* SEAMLESS TOP GRADIENT BLEND WITH PREVIOUS SECTION */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#020208] via-[#020208]/80 to-transparent pointer-events-none z-30" />

      {/* PINNED VIEWPORT CANVAS WITH 3D PERSPECTIVE (1200px) */}
      <div
        ref={pinContainerRef}
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          overflow: 'hidden',
          background: 'transparent',
        }}
        className="z-20 flex flex-col justify-between items-center py-6 px-4 sm:px-6"
      >
        {/* TUNNEL FOCAL RADIAL VIGNETTE / LIGHT IN CENTER */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.14)_0%,rgba(243,85,218,0.06)_45%,transparent_75%)] pointer-events-none" />

        {/* TOP STATIONARY HEADER & CATEGORY FILTERS */}
        <div
          style={{
            zIndex: 100,
            pointerEvents: 'auto',
          }}
          className="text-center relative max-w-4xl mx-auto pt-2 space-y-3 w-full"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/90 border border-[#00F2FE]/40 text-[#00F2FE] text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(0,242,254,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#F355DA]" />
            <span>3D CORRIDOR FLYTHROUGH // MISSION DOSSIERS ({filteredEvents.length} WALL PANELS)</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F2FE] to-[#F355DA] drop-shadow-[0_0_25px_rgba(0,242,254,0.3)]">
            EVENT HORIZON
          </h2>

          {/* Horizontal Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {categories.map((cat, idx) => {
              const isActive = activeCategory === cat.label;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`px-3.5 py-1.5 rounded-xl text-[11px] font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-slate-900 border border-[#00F2FE] text-white shadow-[0_0_15px_rgba(0,242,254,0.4)] scale-105'
                      : 'bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span
                    style={{ backgroundColor: cat.color }}
                    className={`w-2 h-2 rounded-full ${isActive ? 'animate-ping' : 'opacity-40'}`}
                  />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D CORRIDOR FLYTHROUGH STAGE */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transform: `translate3d(0, 0, ${cameraZ}px)`,
          }}
          className="3d-corridor-stage z-20 pointer-events-none"
        >
          {filteredEvents.map((evt, idx) => {
            const isLeftCard = idx % 2 === 0;
            const cardZ = -idx * zStep; // Base Z depth

            // Relative Z distance to camera focal plane
            const relZ = cardZ + cameraZ;

            // OUTWARD CURVING MOTION PATH & INCREASED ROTATEY TILT
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
            const maxWallOffset = isMobile ? Math.min(260, Math.max(110, window.innerWidth * 0.32)) : 310;
            const cardWidthPx = isMobile ? 260 : 350;
            const cardHeightPx = isMobile ? 360 : 450;

            let xOffset = 0;
            let currentRotateY = 0;
            let scale = 0.35;
            let opacity = 0;
            let blurPx = 8;
            let isFocused = false;

            if (relZ <= 0 && relZ >= -2600) {
              // Approaching from deep horizon center toward focal plane
              const depthRatio = 1 - Math.abs(relZ) / 2600; // 0 (far horizon) to 1 (close focal plane)

              // Motion Path: Spawns near-center horizon, curves outward to wall position
              const centerSpawn = isMobile ? 20 : 70;
              xOffset = isLeftCard
                ? -centerSpawn - maxWallOffset * Math.pow(depthRatio, 1.4)
                : centerSpawn + maxWallOffset * Math.pow(depthRatio, 1.4);

              // Increased rotateY wall tilt (18deg at far horizon to 35deg at focal plane)
              currentRotateY = isLeftCard
                ? 18 + 17 * depthRatio
                : -18 - 17 * depthRatio;

              scale = 0.35 + 0.8 * depthRatio; // 0.35 far -> 1.15 close
              opacity = Math.max(0.08, depthRatio);

              // Depth Cues: slight blur and reduced opacity for far Z-depth
              blurPx = (1 - depthRatio) * 7;

              if (Math.abs(relZ) < 300) {
                isFocused = true; // Crisp center focus with glowing cyan halo!
              }
            } else if (relZ > 0 && relZ <= 600) {
              // Receding past camera view: moves further OUTWARD toward screen edges and exits off-screen!
              const recedeRatio = relZ / 600;

              xOffset = isLeftCard
                ? -maxWallOffset - 350 * recedeRatio // drifts further left past screen edge!
                : maxWallOffset + 350 * recedeRatio; // drifts further right past screen edge!

              currentRotateY = isLeftCard
                ? 35 + 15 * recedeRatio // tilts up to 50deg as it rushes past
                : -35 - 15 * recedeRatio;

              scale = 1.15 + 0.45 * recedeRatio;
              opacity = Math.max(0, 1 - recedeRatio);
              blurPx = recedeRatio * 8;
            } else {
              opacity = 0;
            }

            return (
              <div
                key={evt.id}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: `${cardWidthPx}px`,
                  height: `${cardHeightPx}px`,
                  transform: `translate3d(calc(${xOffset}px - ${cardWidthPx / 2}px), -50%, ${cardZ}px) rotateY(${currentRotateY}deg) scale(${scale})`,
                  opacity: opacity,
                  filter: `blur(${blurPx}px)`,
                  transformStyle: 'preserve-3d',
                  zIndex: isFocused ? 1000 : Math.max(1, 100 - Math.abs(Math.round(relZ / 10))),
                  pointerEvents: isFocused ? 'auto' : opacity > 0.4 ? 'auto' : 'none',
                  transition: 'opacity 0.1s ease-out, filter 0.1s ease-out',
                }}
                className={`group rounded-3xl overflow-hidden border-2 flex flex-col justify-between p-4 sm:p-6 select-none cursor-pointer ${
                  isFocused
                    ? 'bg-slate-950/95 border-[#00F2FE] shadow-[0_0_85px_rgba(0,242,254,0.7)] ring-2 ring-[#00F2FE]/50'
                    : 'bg-slate-950/85 border-slate-800 hover:border-[#F355DA]/60 backdrop-blur-xl'
                }`}
                onClick={() => setSelectedEventModal(evt)}
              >
                {/* Image Header */}
                <div className="relative h-32 sm:h-48 w-full rounded-2xl overflow-hidden mb-2 sm:mb-3 bg-slate-950 shadow-inner">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/90 border border-[#00F2FE]/60 text-[#00F2FE] text-[9px] font-mono font-bold tracking-widest uppercase backdrop-blur-md">
                      {evt.badge}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-purple-950/90 border border-[#F355DA]/60 text-[#F355DA] text-[9px] font-mono font-bold tracking-widest uppercase backdrop-blur-md">
                      {evt.dayLabel}
                    </span>
                  </div>
                </div>

                {/* Card Title & Info */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#00F2FE] uppercase tracking-wider block">
                    {evt.category}
                  </span>

                  <h3 className="text-xl font-bold font-sans text-white uppercase tracking-tight line-clamp-1 group-hover:text-[#00F2FE]">
                    {evt.title}
                  </h3>

                  <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                {/* Details & Prize Pool */}
                <div className="space-y-1.5 text-xs font-mono text-cyan-200/80 border-t border-cyan-500/20 pt-2.5 mt-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />
                    <span className="truncate">{evt.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#F355DA] shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>

                  {/* Golden Prize Box */}
                  <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500/25 via-yellow-500/20 to-amber-950/80 border border-amber-400 text-amber-300 font-bold font-mono text-xs shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center gap-1.5 mt-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>PRIZE: {evt.prize}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEventModal(evt);
                    }}
                    className="flex-1 py-2 rounded-xl bg-slate-900 border border-[#00F2FE]/50 text-[#00F2FE] font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-1"
                  >
                    <Terminal className="w-3 h-3 text-[#00F2FE]" />
                    <span>DOSSIER</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRegisterEvent(evt);
                    }}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#F355DA] text-slate-950 font-mono text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all flex items-center justify-center gap-1"
                  >
                    <Zap className="w-3.5 h-3.5 text-slate-950" />
                    <span>REGISTER</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM HUD MATRIX TRACKER */}
        <div
          style={{
            zIndex: 100,
            transform: 'translateZ(0)',
            pointerEvents: 'auto',
          }}
          className="relative max-w-xl mx-auto w-full pb-4 px-4"
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300/80 mb-1 uppercase tracking-wider">
            <span>3D CORRIDOR MATRIX ({filteredEvents.length} PANELS)</span>
            <span>PANEL {activeIndex + 1} OF {totalCards} [{currentEvent.title}]</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-cyan-500/20">
            <div
              className="h-full bg-gradient-to-r from-[#00F2FE] via-[#F355DA] to-purple-500 transition-all duration-75"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

      </div>

      {/* FULL DOSSIER MODAL */}
      <AnimatePresence>
        {selectedEventModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-2xl pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-2xl w-full rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-cyan-950 border border-[#00F2FE]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-[#00F2FE]/40 text-[#00F2FE] text-[10px] font-mono font-bold tracking-widest uppercase">
                  {selectedEventModal.badge}
                </span>
                <button
                  onClick={() => setSelectedEventModal(null)}
                  className="text-slate-400 hover:text-white font-mono text-sm"
                >
                  [ CLOSE DOSSIER ]
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                  {selectedEventModal.title}
                </h3>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                  {selectedEventModal.description}
                </p>
              </div>

              <div className="space-y-2 font-mono text-xs text-cyan-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#00F2FE]" />
                  <span>{selectedEventModal.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F355DA]" />
                  <span>{selectedEventModal.venue}</span>
                </div>
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>PRIZE POOL: {selectedEventModal.prize}</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-cyan-500/20 pt-4">
                <span className="text-xs font-mono text-[#F355DA] font-bold uppercase tracking-wider block">
                  DOSSIER RULES & PROTOCOLS:
                </span>
                <ul className="space-y-1.5 text-xs font-mono text-slate-300 list-disc list-inside">
                  {selectedEventModal.rules.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-cyan-500/20 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] font-mono text-slate-400">
                  COORDINATOR: <span className="text-[#00F2FE] font-bold">{selectedEventModal.coordinators}</span>
                </div>
                <button
                  onClick={() => {
                    const evt = selectedEventModal;
                    setSelectedEventModal(null);
                    onRegisterEvent(evt);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#F355DA] text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-lg"
                >
                  REGISTER NOW
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
