import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, User, Ticket } from 'lucide-react';

export default function Navbar({ onOpenProfile, onOpenRegister, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero', id: 'hero' },
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'CALENDAR', href: '#calendar', id: 'calendar' },
    { name: 'EVENTS', href: '#events', id: 'events' },
    { name: 'GALLERY', href: '#gallery', id: 'gallery' },
    { name: 'RECAP', href: '#media', id: 'media' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-cyan-500/30 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* LOGO BRANDING */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <img
              src="/pravaah_logo_clean.png"
              alt="PRAVAAH Logo"
              className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.8)] group-hover:scale-110 transition-transform"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold font-sans text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 group-hover:to-purple-300 transition-colors">
              PRAVAAH'27
            </span>
            <span className="text-[9px] font-mono tracking-widest text-cyan-200/80 -mt-1 uppercase">
              KAIROS • IIT BBS
            </span>
          </div>
        </a>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-4 py-1.5 rounded-full bg-slate-900/60 border border-cyan-500/20 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-mono font-bold tracking-wider transition-colors duration-200 uppercase ${
                  isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-cyan-200'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full bg-cyan-500/20 border border-cyan-400/50 -z-10 shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* ACTIONS: PROFILE & PASSES */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Profile Trigger */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-xs font-mono font-bold text-cyan-200 hover:text-white hover:border-cyan-400 transition-all backdrop-blur-md"
          >
            <User className="w-4 h-4 text-cyan-400" />
            <span>PROFILE</span>
          </button>

          {/* Cyan/Purple Register Button */}
          <button
            onClick={onOpenRegister}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold font-mono text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            <Ticket className="w-4 h-4" />
            <span>PASSES</span>
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-950/95 border-b border-cyan-500/30 backdrop-blur-2xl px-6 py-6 space-y-4"
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono font-bold tracking-wider text-slate-300 hover:text-cyan-300 py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-cyan-500/20 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfile();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold"
            >
              <User className="w-4 h-4" />
              <span>MY PROFILE</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-mono text-xs font-bold uppercase tracking-wider"
            >
              <Ticket className="w-4 h-4" />
              <span>BOOK PASSES</span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
