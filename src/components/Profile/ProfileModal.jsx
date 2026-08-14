import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, QrCode, Ticket, CheckCircle2, ShieldAlert, LogOut, Sparkles, MapPin } from 'lucide-react';

export default function ProfileModal({ isOpen, onClose, user, registeredEvents, onLogout }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl glass-panel p-6 sm:p-8 rounded-3xl border-kairos-cyan/40 shadow-2xl shadow-cyan-950/60 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full glass-panel text-gray-400 hover:text-white hover:border-kairos-cyan transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-kairos-cyan via-purple-600 to-pink-500 p-1 shadow-lg shadow-cyan-500/30">
              <div className="w-full h-full bg-[#03030c] rounded-xl flex items-center justify-center font-orbitron font-bold text-xl text-kairos-cyan">
                {user?.name ? user.name.charAt(0) : 'K'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-orbitron font-bold text-xl text-white">
                  {user?.name || 'MULTIVERSE DELEGATE'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-orbitron font-extrabold bg-kairos-cyan/20 text-kairos-cyan border border-kairos-cyan/40">
                  VERIFIED
                </span>
              </div>
              <p className="font-space text-xs text-gray-400">{user?.email || 'delegate.kairos27@iitbbs.ac.in'}</p>
              <p className="font-space text-[10px] text-kairos-purple font-semibold mt-0.5">
                ID: {user?.id || 'P27-KAIROS-9842'} • IIT BHUBANESWAR
              </p>
            </div>
          </div>

          {/* Digital Fest Pass Ticket Card */}
          <div className="relative my-6 glass-panel p-5 rounded-2xl border-kairos-cyan/30 bg-gradient-to-r from-space-card via-space-dark to-[#0f0f35] overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-kairos-cyan" />
                <span className="font-orbitron font-bold text-sm text-white tracking-wider">
                  PRAVAAH’27 ALL-ACCESS PASS
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-orbitron font-extrabold bg-kairos-gold/20 text-kairos-gold border border-kairos-gold/40">
                VIP ACCESS
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 text-xs font-space">
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block">DATES</span>
                  <span className="text-white font-bold font-orbitron">FEB 12 - 14, 2027</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block">ACCESS LEVEL</span>
                  <span className="text-kairos-cyan font-bold font-orbitron">PRO NITES + ALL EVENTS</span>
                </div>
              </div>

              {/* QR Code Graphic */}
              <div className="w-20 h-20 bg-white p-2 rounded-xl flex flex-col items-center justify-center shadow-lg">
                <QrCode className="w-full h-full text-black" />
              </div>
            </div>
          </div>

          {/* Registered Events Section */}
          <div className="my-6">
            <h4 className="font-orbitron text-xs text-kairos-cyan uppercase tracking-widest mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              REGISTERED EVENTS ({registeredEvents?.length || 0})
            </h4>

            {registeredEvents && registeredEvents.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {registeredEvents.map((ev, i) => (
                  <div key={i} className="p-3 rounded-xl glass-panel border-gray-800 flex items-center justify-between">
                    <div>
                      <div className="font-orbitron font-bold text-xs text-white">{ev.title}</div>
                      <div className="font-space text-[10px] text-gray-400">{ev.venue} • {ev.time}</div>
                    </div>
                    <span className="text-xs font-orbitron text-kairos-cyan flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      CONFIRMED
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl glass-panel border-gray-800 text-center font-space text-xs text-gray-400">
                You haven't registered for specific competitions yet. Browse the Orbit Calendar to register!
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-between pt-4 border-t border-gray-800">
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-full glass-panel text-xs font-orbitron text-red-400 border-red-500/30 hover:border-red-500 flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              LOGOUT
            </button>
            <button
              onClick={onClose}
              className="btn-cosmic px-6 py-2.5 rounded-full text-xs font-orbitron font-bold text-white tracking-widest"
            >
              DONE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
