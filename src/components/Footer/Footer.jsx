import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Ticket, User, MapPin, Mail, Phone, ArrowUpRight, Globe, Share2, Send, Radio } from 'lucide-react';

export default function Footer({ onOpenRegister, onOpenProfile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative pt-24 pb-12 w-full bg-[#020208] text-white overflow-hidden z-10">
      
      {/* Soft Ambient Radial Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(0,242,254,0.12)_0%,rgba(243,85,218,0.06)_45%,transparent_75%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* TOP ROW: BRANDING & CTA CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <img
                src="/pravaah_logo_clean.png"
                alt="PRAVAAH Logo"
                className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]"
              />
              <span className="font-extrabold font-sans text-3xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                PRAVAAH<span className="text-cyan-400 font-mono text-xl ml-1.5">'27</span>
              </span>
            </div>

            <p className="text-slate-300 text-sm max-w-md leading-relaxed">
              The flagship socio-cultural and techno-management festival of IIT Bhubaneswar. Step into KAIROS—The Multiverse of Moments.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {[
                { label: 'INSTAGRAM', icon: Globe, href: '#' },
                { label: 'YOUTUBE', icon: Radio, href: '#' },
                { label: 'DISCORD', icon: Send, href: '#' },
                { label: 'SHARE', icon: Share2, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  title={social.label}
                  className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-950/50 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-6 flex flex-col sm:flex-row items-center gap-4 justify-end"
          >
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold font-mono text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <Ticket className="w-4 h-4" />
              <span>BOOK FESTIVAL PASSES</span>
            </button>

            <button
              onClick={onOpenProfile}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 font-bold font-mono text-xs uppercase tracking-wider hover:border-cyan-400 hover:text-white transition-all flex items-center justify-center gap-3"
            >
              <User className="w-4 h-4" />
              <span>VIEW MY DOSSIER</span>
            </button>
          </motion.div>

        </div>

        {/* MIDDLE ROW: QUICK LINKS & CONTACT MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 text-xs font-mono">
          
          <div className="space-y-3">
            <span className="text-cyan-400 font-bold uppercase tracking-widest block">NAVIGATE REALMS</span>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#hero" className="hover:text-cyan-300 transition-colors">01. HOME & COUNTDOWN</a></li>
              <li><a href="#about" className="hover:text-cyan-300 transition-colors">02. ABOUT KAIROS</a></li>
              <li><a href="#events" className="hover:text-cyan-300 transition-colors">03. MULTIVERSE EVENTS</a></li>
              <li><a href="#gallery" className="hover:text-cyan-300 transition-colors">04. RECAP GALLERY</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-purple-400 font-bold uppercase tracking-widest block">LOCATION & VENUE</span>
            <div className="space-y-2 text-slate-300 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>IIT Bhubaneswar Permanent Campus, Argul, Jatni, Odisha 752050</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-cyan-400 font-bold uppercase tracking-widest block">CONTACT HELPDESK</span>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>pravaah@iitbbs.ac.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+91 98765 43210 (Fest Convener)</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: COPYRIGHT & BACK TO TOP */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[11px] font-mono text-slate-400"
          >
            © 2027 PRAVAAH IIT BHUBANESWAR. ALL RIGHTS RESERVED.
          </motion.div>

          <button
            onClick={scrollToTop}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-widest flex items-center gap-2 group"
          >
            <span>BACK TO TOP</span>
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
