import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Sparkles, Share2 } from 'lucide-react';

export default function CinemaModal({ video, onClose }) {
  if (!video) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl glass-panel rounded-3xl border-kairos-cyan/40 overflow-hidden shadow-2xl shadow-cyan-950/80 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 flex items-center justify-between border-b border-gray-800 bg-[#03030c]/90">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-kairos-cyan/20 border border-kairos-cyan flex items-center justify-center text-kairos-cyan">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-base sm:text-xl text-white tracking-wide">
                  {video.title}
                </h3>
                <span className="text-xs font-space text-kairos-cyan tracking-widest uppercase">
                  {video.subtitle || 'KAIROS CINEMATIC SHOWCASE'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full glass-panel text-gray-400 hover:text-white hover:border-kairos-cyan transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Player Container */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            <iframe
              className="w-full h-full"
              src={video.embedUrl || "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Footer Info */}
          <div className="p-4 sm:p-6 bg-[#03030c] border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-space text-gray-300 text-xs sm:text-sm max-w-2xl">
              {video.description || "Experience the official trailer for PRAVAAH'27 KAIROS, capturing the collision of time, space, and destiny."}
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Video link copied to clipboard!');
                }}
                className="flex-1 sm:flex-none px-4 py-2 rounded-full glass-panel text-xs font-orbitron text-kairos-cyan border-kairos-cyan/30 hover:border-kairos-cyan flex items-center justify-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                SHARE
              </button>
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none btn-cosmic px-6 py-2 rounded-full text-xs font-orbitron font-bold text-white tracking-wider"
              >
                CLOSE CINEMA
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
