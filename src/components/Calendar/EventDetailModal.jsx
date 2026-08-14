import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, Trophy, Users, Sparkles, ExternalLink } from 'lucide-react';

export default function EventDetailModal({ event, onClose, onRegister }) {
  if (!event) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-3xl border-kairos-cyan/40 shadow-2xl shadow-cyan-950/50 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full glass-panel text-gray-400 hover:text-white hover:border-kairos-cyan transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Event Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-kairos-cyan/10 border border-kairos-cyan/30 text-kairos-cyan text-xs font-orbitron tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {event.category}
          </div>

          {/* Event Title */}
          <h2 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-white tracking-wide mb-2">
            {event.title}
          </h2>
          <p className="font-space text-kairos-purple text-sm font-semibold tracking-wider uppercase mb-6">
            Theme: {event.tagline || 'KAIROS Multiverse Challenge'}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            <div className="glass-panel p-3 rounded-2xl flex flex-col items-center text-center">
              <Clock className="w-4 h-4 text-kairos-cyan mb-1" />
              <span className="text-[10px] font-space text-gray-400 uppercase">Time</span>
              <span className="font-orbitron text-xs text-white font-bold">{event.time}</span>
            </div>

            <div className="glass-panel p-3 rounded-2xl flex flex-col items-center text-center">
              <MapPin className="w-4 h-4 text-kairos-purple mb-1" />
              <span className="text-[10px] font-space text-gray-400 uppercase">Venue</span>
              <span className="font-orbitron text-xs text-white font-bold">{event.venue}</span>
            </div>

            <div className="glass-panel p-3 rounded-2xl flex flex-col items-center text-center">
              <Trophy className="w-4 h-4 text-kairos-gold mb-1" />
              <span className="text-[10px] font-space text-gray-400 uppercase">Prize Pool</span>
              <span className="font-orbitron text-xs text-kairos-gold font-bold">{event.prize}</span>
            </div>

            <div className="glass-panel p-3 rounded-2xl flex flex-col items-center text-center">
              <Users className="w-4 h-4 text-pink-400 mb-1" />
              <span className="text-[10px] font-space text-gray-400 uppercase">Team Size</span>
              <span className="font-orbitron text-xs text-white font-bold">{event.teamSize || '1-4 Members'}</span>
            </div>
          </div>

          {/* Description */}
          <div className="my-4">
            <h4 className="font-orbitron text-xs text-kairos-cyan uppercase tracking-widest mb-2">Event Overview</h4>
            <p className="font-space text-gray-300 text-sm leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Rules / Highlights */}
          {event.highlights && (
            <div className="my-4 p-4 rounded-2xl bg-space-dark/80 border border-gray-800">
              <h4 className="font-orbitron text-xs text-kairos-purple uppercase tracking-widest mb-2">Key Highlights</h4>
              <ul className="list-disc list-inside space-y-1 font-space text-xs text-gray-300">
                {event.highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full glass-panel text-xs font-orbitron text-gray-300 hover:text-white"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onRegister(event);
              }}
              className="btn-cosmic px-6 py-2.5 rounded-full font-orbitron font-bold text-xs text-white tracking-widest flex items-center gap-2 shadow-lg"
            >
              <span>REGISTER FOR THIS EVENT</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
