import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, MapPin, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ChronoCalendarSection({ onRegisterEvent }) {
  // Active month index (0 to 11)
  const [activeMonthIdx, setActiveMonthIdx] = useState(1); // Default to FEBRUARY (Index 1)
  const [selectedFestDay, setSelectedFestDay] = useState(3); // Feb 3, 4, 5

  // Wheel rotation angle in degrees (30deg per month step)
  // Default -30deg points February (index 1 * 30 = 30) to the 0deg front view!
  const [wheelRotation, setWheelRotation] = useState(-30);

  const festivalSchedule = {
    3: {
      dayLabel: 'DAY 01',
      dateStr: 'FEBRUARY 03, 2027',
      theme: 'TEMPORAL INITIATION // TECH & AI HACKATHON OPENING',
      events: [
        {
          title: 'CHRONO HACKATHON 36H OPENING',
          time: '11:00 AM - 11:00 PM (36H)',
          venue: 'LHC Complex - Hall A',
          prize: '₹1,50,000',
          badge: 'FLAGSHIP HACKATHON',
          description: 'The 36-hour non-stop AI, Web3 & Robotics hardware hackathon kicks off with live mentoring.',
        },
        {
          title: 'EUPHONY: BATTLE OF BANDS',
          time: '05:00 PM - 09:00 PM',
          venue: 'Amphitheatre Stage',
          prize: '₹75,000',
          badge: 'LIVE MUSIC',
          description: 'Collegiate rock & metal battle with 12 finalist bands electrifying the open-air stage.',
        },
        {
          title: 'CYBERSEC RED TEAM CTF',
          time: '01:00 PM - 07:00 PM',
          venue: 'Computer Center - Lab 3',
          prize: '₹85,000',
          badge: 'CTF ARENA',
          description: 'Jeopardy-style offensive cybersecurity CTF challenge covering Web3 & cryptography.',
        },
      ],
    },
    4: {
      dayLabel: 'DAY 02',
      dateStr: 'FEBRUARY 04, 2027',
      theme: 'MECHA DESTINATION // ROBOWARS & STARTUP SUMMIT',
      events: [
        {
          title: 'MECHA CLASH: ROBOWARS',
          time: '02:00 PM - 06:00 PM',
          venue: 'Open Air Combat Arena',
          prize: '₹1,00,000',
          badge: 'COMBAT ARENA',
          description: 'Heavyweight bot combat in a reinforced steel cage featuring 15kg & 30kg flippers.',
        },
        {
          title: 'KAIROS STARTUP SUMMIT & VENTURE PITCH',
          time: '10:00 AM - 01:00 PM',
          venue: 'Seminar Hall 2',
          prize: '₹1,20,000',
          badge: 'VENTURE PITCH',
          description: 'Pitch early-stage ventures directly to angel investors, VC funds, and incubator leads.',
        },
        {
          title: 'ALGO-TRADING & QUANT FINTECH',
          time: '02:00 PM - 06:00 PM',
          venue: 'LHC Complex - Room 102',
          prize: '₹70,000',
          badge: 'ALGO TRADING',
          description: 'Automated quantitative trading strategies against live simulated high-frequency feeds.',
        },
      ],
    },
    5: {
      dayLabel: 'DAY 03',
      dateStr: 'FEBRUARY 05, 2027',
      theme: 'CELESTIAL CLIMAX // ESPORTS LAN & SINGULARITY PRONITE',
      events: [
        {
          title: 'VALORANT ESPORTS LAN FINALS',
          time: '10:00 AM - 05:00 PM',
          venue: 'Esports Gaming Pavilion',
          prize: '₹80,000',
          badge: '5v5 LAN',
          description: '5v5 tactical shooter LAN tournament with pro gaming rigs, shoutcasting & stage finals.',
        },
        {
          title: 'VERVE: FUTURISTIC RUNWAY SHOWCASE',
          time: '06:00 PM - 09:00 PM',
          venue: 'Main Stage Auditorium',
          prize: '₹90,000',
          badge: 'NEON RUNWAY',
          description: 'Avant-garde cyberpunk fashion runway show blending futuristic couture & neon choreography.',
        },
        {
          title: 'SINGULARITY PRONITE: INTERNATIONAL EDM NIGHT',
          time: '08:00 PM ONWARDS',
          venue: 'Main Festival Grounds',
          prize: 'STAR PRONITE',
          badge: 'STAR NIGHT',
          description: 'High-octane EDM DJ performance with laser light arrays & 15,000+ festival crowds.',
        },
      ],
    },
  };

  const months = [
    { name: 'JANUARY', days: 31, startOffset: 5, color: 'from-rose-600 to-pink-500', fest: false },
    { name: 'FEBRUARY', days: 28, startOffset: 1, color: 'from-cyan-500 to-blue-600', fest: true }, // FESTIVAL MONTH!
    { name: 'MARCH', days: 31, startOffset: 1, color: 'from-sky-500 to-indigo-600', fest: false },
    { name: 'APRIL', days: 30, startOffset: 4, color: 'from-emerald-500 to-[#00F2FE]', fest: false },
    { name: 'MAY', days: 31, startOffset: 6, color: 'from-amber-500 to-orange-600', fest: false },
    { name: 'JUNE', days: 30, startOffset: 2, color: 'from-purple-500 to-violet-600', fest: false },
    { name: 'JULY', days: 31, startOffset: 4, color: 'from-blue-600 to-cyan-400', fest: false },
    { name: 'AUGUST', days: 31, startOffset: 0, color: 'from-indigo-500 to-purple-600', fest: false },
    { name: 'SEPTEMBER', days: 30, startOffset: 3, color: 'from-teal-500 to-emerald-600', fest: false },
    { name: 'OCTOBER', days: 31, startOffset: 5, color: 'from-orange-500 to-red-600', fest: false },
    { name: 'NOVEMBER', days: 30, startOffset: 1, color: 'from-pink-500 to-rose-600', fest: false },
    { name: 'DECEMBER', days: 31, startOffset: 3, color: 'from-purple-600 to-[#F355DA]', fest: false },
  ];

  // Rotate wheel left (bring next month into front focus)
  const handleNext = () => {
    setWheelRotation((prev) => prev - 30);
    setActiveMonthIdx((prev) => (prev + 1) % 12);
  };

  // Rotate wheel right (bring previous month into front focus)
  const handlePrev = () => {
    setWheelRotation((prev) => prev + 30);
    setActiveMonthIdx((prev) => (prev - 1 + 12) % 12);
  };

  // Select month directly on card click
  const handleSelectMonth = (idx) => {
    setActiveMonthIdx(idx);
    setWheelRotation(-idx * 30);
  };

  const activeSchedule = activeMonthIdx === 1 ? festivalSchedule[selectedFestDay] : null;

  return (
    <section
      id="calendar"
      className="w-full min-h-[115vh] relative bg-transparent text-white py-16 px-4 sm:px-8 flex flex-col justify-between items-center overflow-hidden z-10 [perspective:1200px]"
    >
      {/* SEAMLESS TOP & BOTTOM GRADIENT FADES */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#020208] via-[#020208]/80 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-[#020208]/80 to-[#020208] pointer-events-none z-10" />
      {/* AMBIENT RADIAL LIGHTING */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.18)_0%,rgba(243,85,218,0.06)_45%,rgba(2,2,8,0.98)_80%)] pointer-events-none" />

      {/* BACKGROUND DOT MATRIX */}
      <div
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 242, 254, 0.12) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        className="absolute inset-0 opacity-20 pointer-events-none"
      />

      {/* HEADER */}
      <div className="text-center relative z-20 max-w-4xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/90 border border-[#00F2FE]/40 text-[#00F2FE] text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(0,242,254,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-[#F355DA]" />
          <span>LEVEL HORIZONTAL 3D ORBITAL WHEEL (15° FORWARD TILT, 450PX RADIUS)</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F2FE] to-[#F355DA] drop-shadow-[0_0_25px_rgba(0,242,254,0.3)]">
          KAIROS 3D ORBITAL CALENDAR
        </h2>

        <p className="text-slate-400 font-mono text-xs tracking-widest uppercase max-w-lg mx-auto">
          Perfectly level & centered horizontally with 15° forward tilt. Click side arrows to cycle months around the orbit loop.
        </p>
      </div>

      {/* 3D CAROUSEL STAGE CONTAINER (PERSPECTIVE 1200PX) WITH SIDE ARROW CONTROLS */}
      <div className="relative w-full max-w-7xl h-[520px] sm:h-[580px] my-4 flex items-center justify-between px-2 sm:px-6 z-20 overflow-visible">
        
        {/* LEFT ARROW BUTTON */}
        <button
          onClick={handlePrev}
          className="z-50 p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-[#00F2FE]/60 text-[#00F2FE] hover:bg-[#00F2FE] hover:text-slate-950 transition-all shadow-[0_0_30px_rgba(0,242,254,0.4)] flex items-center justify-center shrink-0 cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* PERFECTLY LEVEL & HORIZONTALLY CENTERED STAGE WRAPPER (ROTATEX 15DEG ONLY, NO LATERAL TILT) */}
        <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d] overflow-visible">
          
          <div
            className="relative w-0 h-0 flex items-center justify-center [transform-style:preserve-3d]"
            style={{
              transform: 'rotateX(15deg)', // FORWARD TILT ONLY - ZERO ROTATEZ / ROTATEY PARENT ADJUSTMENTS
              transformOrigin: 'center center',
            }}
          >
            {/* 3D WHEEL Y-AXIS ROTATING GROUP */}
            <motion.div
              animate={{ rotateY: wheelRotation }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-0 h-0 flex items-center justify-center [transform-style:preserve-3d]"
            >
              {months.map((m, idx) => {
                const cardAngle = idx * 30; // 12 cards * 30deg = 360deg
                const isSelected = activeMonthIdx === idx;
                
                // Responsive orbit radius: 450px on desktop, dynamically adjusted on mobile without altering 3D circular shape
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                const radius = isMobile ? Math.min(450, Math.max(260, window.innerWidth * 0.72)) : 450;
                const cardWidth = isMobile ? 180 : 220;
                const cardHeight = isMobile ? 260 : 310;

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectMonth(idx)}
                    className="absolute cursor-pointer [transform-style:preserve-3d] transition-all duration-500"
                    style={{
                      width: `${cardWidth}px`,
                      height: `${cardHeight}px`,
                      left: `-${cardWidth / 2}px`,
                      top: `-${cardHeight / 2}px`,
                      // STRICT 3D CSS TRANSFORM: rotateY(cardAngle) -> translateZ(radius)
                      transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: isSelected ? 1.18 : 0.88,
                        opacity: isSelected ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.4 }}
                      className={`w-full h-full rounded-3xl p-4 sm:p-5 backdrop-blur-xl border transition-all duration-300 ${
                        isSelected
                          ? 'bg-slate-950/98 border-2 border-[#00F2FE] shadow-[0_0_60px_rgba(0,242,254,0.85)] z-50'
                          : m.fest
                          ? 'bg-slate-950/90 border border-[#00F2FE]/60 shadow-[0_15px_35px_rgba(0,242,254,0.2)] hover:border-[#00F2FE]'
                          : 'bg-slate-950/85 border border-slate-800 shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:border-slate-600'
                      }`}
                    >
                      {/* Card Header Banner */}
                      <div className={`rounded-2xl p-2.5 mb-3 bg-gradient-to-r ${m.color} text-white flex items-center justify-between font-black shadow-lg border border-white/20 backdrop-blur-md`}>
                        <span className="font-mono text-xs font-bold opacity-90 tracking-wider">2027</span>
                        <span className="font-sans text-xs font-extrabold tracking-widest uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">{m.name}</span>
                        <span className="font-mono text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-slate-950/60 border border-white/30 text-white shadow-sm">
                          {m.fest ? '★ FEST' : 'ACAD'}
                        </span>
                      </div>

                      {/* Day Headers */}
                      <div className="grid grid-cols-7 text-center font-mono text-[10px] font-extrabold text-slate-300 mb-1 border-b border-slate-700/80 pb-1 tracking-wider">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dh, i) => (
                          <span key={i} className={m.fest ? 'text-[#00F2FE] drop-shadow-[0_0_5px_rgba(0,242,254,0.6)]' : ''}>{dh}</span>
                        ))}
                      </div>

                      {/* 1 to 31 Date Grid */}
                      <div className="grid grid-cols-7 gap-y-1 text-center font-mono text-[11px] font-bold py-1 select-none">
                        {Array.from({ length: m.startOffset }).map((_, i) => (
                          <span key={`empty-${i}`} />
                        ))}

                        {Array.from({ length: m.days }).map((_, i) => {
                          const dayNum = i + 1;
                          const isFestDay = m.fest && (dayNum === 3 || dayNum === 4 || dayNum === 5);

                          return (
                            <span
                              key={dayNum}
                              className={`inline-flex items-center justify-center h-6 w-6 mx-auto rounded-md transition-all duration-200 cursor-pointer ${
                                isFestDay
                                  ? 'bg-[#00F2FE] text-slate-950 font-black shadow-[0_0_12px_rgba(0,242,254,0.9)] scale-110 hover:scale-125 ring-2 ring-[#00F2FE]/50'
                                  : 'text-slate-200 hover:text-white hover:bg-cyan-500/25 hover:scale-125 hover:shadow-[0_0_8px_rgba(0,242,254,0.6)]'
                              }`}
                            >
                              {dayNum}
                            </span>
                          );
                        })}
                      </div>

                      {/* Bottom Fest Ribbon */}
                      {m.fest ? (
                        <div className="mt-3 py-1 px-2 rounded-xl bg-[#F355DA] text-slate-950 font-mono text-[9px] font-black tracking-wider text-center uppercase shadow-md">
                          FEB 3, 4, 5 (PRAVAAH '27)
                        </div>
                      ) : (
                        <div className="mt-3 text-center font-mono text-[9px] text-slate-500 uppercase">
                          [ CLICK TO FOCUS ]
                        </div>
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>

        </div>

        {/* RIGHT ARROW BUTTON */}
        <button
          onClick={handleNext}
          className="z-50 p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-[#00F2FE]/60 text-[#00F2FE] hover:bg-[#00F2FE] hover:text-slate-950 transition-all shadow-[0_0_30px_rgba(0,242,254,0.4)] flex items-center justify-center shrink-0 cursor-pointer active:scale-95"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

      </div>

      {/* SCHEDULE READOUT TERMINAL FOR SELECTED MONTH */}
      <AnimatePresence mode="wait">
        {activeMonthIdx === 1 ? (
          /* FEBRUARY FESTIVAL SCHEDULE TERMINAL */
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl relative z-30 mb-6 pointer-events-auto"
          >
            <div className="rounded-3xl bg-slate-950/95 border-2 border-[#00F2FE] backdrop-blur-2xl p-6 sm:p-8 space-y-6 shadow-[0_0_60px_rgba(0,242,254,0.4)]">
              
              {/* Header & Date Tabs */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#00F2FE] text-slate-950 font-mono text-xs font-bold uppercase tracking-wider">
                      FEBRUARY 2027
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      OFFICIAL FESTIVAL DATES
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight pt-1">
                    {activeSchedule?.theme}
                  </h3>
                </div>

                {/* Day Selection Tabs (Feb 3, Feb 4, Feb 5) */}
                <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
                  {[
                    { dayNum: 3, label: 'DAY 01 (FEB 3)' },
                    { dayNum: 4, label: 'DAY 02 (FEB 4)' },
                    { dayNum: 5, label: 'DAY 03 (FEB 5)' },
                  ].map((d) => (
                    <button
                      key={d.dayNum}
                      onClick={() => setSelectedFestDay(d.dayNum)}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-all ${
                        selectedFestDay === d.dayNum
                          ? 'bg-[#00F2FE] text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.5)]'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Event Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeSchedule?.events.map((evt, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-3 hover:border-[#00F2FE]/60 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-[#00F2FE]/40 text-[#00F2FE] text-[9px] font-mono font-bold tracking-wider inline-block">
                        {evt.badge}
                      </span>
                      <h4 className="text-base font-bold text-[#00F2FE] uppercase tracking-tight">
                        {evt.title}
                      </h4>
                      <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                        {evt.description}
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-slate-800/80 pt-3 text-xs font-mono">
                      <div className="flex items-center gap-2 text-cyan-200">
                        <Clock className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />
                        <span className="truncate">{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-pink-200">
                        <MapPin className="w-3.5 h-3.5 text-[#F355DA] shrink-0" />
                        <span className="truncate">{evt.venue}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-mono font-bold text-amber-300">
                          {evt.prize}
                        </span>
                        <button
                          onClick={() => onRegisterEvent(evt)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-[#00F2FE] hover:text-slate-950 text-white font-mono text-[10px] font-bold uppercase transition-all flex items-center gap-1"
                        >
                          <Zap className="w-3 h-3" />
                          <span>REGISTER</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        ) : (
          /* REGULAR NON-FEST MONTH READOUT NOTICE */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full max-w-xl relative z-30 mb-6 pointer-events-auto text-center"
          >
            <div className="rounded-3xl bg-slate-950/90 border border-slate-800 backdrop-blur-2xl p-6 space-y-3">
              <span className="text-xs font-mono text-[#00F2FE] font-bold uppercase tracking-wider block">
                {months[activeMonthIdx].name} 2027 // REGULAR ACADEMIC CYCLE
              </span>
              <p className="text-slate-400 text-xs font-mono">
                PRAVAAH ’27 KAIROS official festival dates are scheduled in <span className="text-[#00F2FE] font-bold">FEBRUARY 2027 (FEB 3, 4, 5)</span>.
              </p>
              <button
                onClick={() => handleSelectMonth(1)}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-[#00F2FE] text-[#00F2FE] font-mono text-xs font-bold uppercase hover:bg-[#00F2FE] hover:text-slate-950 transition-all inline-flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F355DA]" />
                <span>SPIN WHEEL TO FEBRUARY FESTIVAL MONTH</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
