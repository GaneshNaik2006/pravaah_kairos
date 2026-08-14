import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ticket, CheckCircle2, ShieldCheck, ArrowRight, UserCheck, Sparkles, Building } from 'lucide-react';
import { playWarpSound } from '../../utils/audio';

export default function RegisterModal({ isOpen, onClose, selectedEvent, onRegistrationComplete }) {
  const [step, setStep] = useState(1);
  const [passTier, setPassTier] = useState('ALL_ACCESS');
  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@iitbbs.ac.in',
    college: 'IIT Bhubaneswar',
    phone: '+91 98765 43210',
    accommodationNeeded: true,
  });

  if (!isOpen) return null;

  const passes = [
    {
      id: 'GENERAL',
      name: 'MULTIVERSE GENERAL',
      price: '₹299',
      features: ['Access to all 50+ competitions', 'Expos & Tech Summit', 'Standard ProNite Entry'],
    },
    {
      id: 'ALL_ACCESS',
      name: 'KAIROS VIP ALL-ACCESS',
      price: '₹599',
      recommended: true,
      features: ['Front-Row VIP ProNite Zone', 'All Competitions & Workshops', 'Priority Accommodation & Merch Disc.'],
    },
    {
      id: 'SQUAD',
      name: 'SQUAD MULTIPASS (4 PAX)',
      price: '₹1,299',
      features: ['All VIP perks for 4 members', 'Dedicated Hackathon Sleeping Pod', 'Free Official Fest T-Shirt'],
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    playWarpSound();
    setStep(3); // Confirmation step
    setTimeout(() => {
      onRegistrationComplete({
        user: { name: formData.name, email: formData.email, college: formData.college },
        registeredEvent: selectedEvent || { title: 'PRAVAAH’27 VIP FESTIVAL PASS' },
      });
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-3xl border-kairos-cyan/40 shadow-2xl shadow-cyan-950/70 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full glass-panel text-gray-400 hover:text-white hover:border-kairos-cyan transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-kairos-cyan/10 border border-kairos-cyan/30 text-kairos-cyan text-xs font-orbitron tracking-widest uppercase mb-2">
              <Ticket className="w-3.5 h-3.5" />
              PRAVAAH’27 OFFICIAL REGISTRATION
            </div>
            <h3 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white tracking-wide">
              {selectedEvent ? `REGISTER: ${selectedEvent.title}` : 'CLAIM YOUR KAIROS FEST PASS'}
            </h3>
          </div>

          {/* Steps Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`h-1.5 rounded-full transition-all ${step >= 1 ? 'w-12 bg-kairos-cyan' : 'w-4 bg-gray-800'}`} />
            <div className={`h-1.5 rounded-full transition-all ${step >= 2 ? 'w-12 bg-kairos-purple' : 'w-4 bg-gray-800'}`} />
            <div className={`h-1.5 rounded-full transition-all ${step >= 3 ? 'w-12 bg-kairos-gold' : 'w-4 bg-gray-800'}`} />
          </div>

          {/* Step 1: Select Pass Tier */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-orbitron text-xs text-kairos-cyan uppercase tracking-widest mb-2">Select Your Access Pass Tier</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {passes.map((pass) => (
                  <div
                    key={pass.id}
                    onClick={() => setPassTier(pass.id)}
                    className={`relative p-4 rounded-2xl glass-panel border transition-all cursor-pointer flex flex-col justify-between ${
                      passTier === pass.id
                        ? 'border-kairos-cyan bg-kairos-cyan/10 shadow-lg shadow-cyan-500/20'
                        : 'border-gray-800 hover:border-gray-600'
                    }`}
                  >
                    {pass.recommended && (
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[8px] font-orbitron font-bold bg-gradient-to-r from-kairos-cyan to-kairos-purple text-black uppercase">
                        POPULAR
                      </span>
                    )}
                    <div>
                      <div className="font-orbitron font-bold text-xs text-white mb-1">{pass.name}</div>
                      <div className="font-orbitron font-extrabold text-2xl text-kairos-cyan mb-3">{pass.price}</div>
                      <ul className="space-y-1 font-space text-[10px] text-gray-300">
                        {pass.features.map((f, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-kairos-cyan shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="btn-cosmic px-8 py-3 rounded-full font-orbitron font-bold text-xs text-white tracking-widest flex items-center gap-2"
                >
                  <span>NEXT: DELEGATE DETAILS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: User Form */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="font-orbitron text-xs text-kairos-purple uppercase tracking-widest mb-2">Delegate Information</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-space text-gray-400 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel border border-gray-800 text-white text-xs font-space focus:border-kairos-cyan focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-space text-gray-400 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel border border-gray-800 text-white text-xs font-space focus:border-kairos-cyan focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-space text-gray-400 uppercase mb-1">College / University</label>
                  <input
                    type="text"
                    required
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel border border-gray-800 text-white text-xs font-space focus:border-kairos-cyan focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-space text-gray-400 uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel border border-gray-800 text-white text-xs font-space focus:border-kairos-cyan focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl glass-panel border-gray-800 flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-kairos-cyan" />
                  <span className="font-space text-xs text-gray-200">Require Hostel Accommodation at IIT BBS?</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.accommodationNeeded}
                  onChange={(e) => setFormData({ ...formData, accommodationNeeded: e.target.checked })}
                  className="w-4 h-4 accent-kairos-cyan cursor-pointer"
                />
              </div>

              <div className="mt-8 flex items-center justify-between pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-full glass-panel text-xs font-orbitron text-gray-400 hover:text-white"
                >
                  BACK
                </button>
                <button
                  type="submit"
                  className="btn-cosmic px-8 py-3 rounded-full font-orbitron font-bold text-xs text-white tracking-widest flex items-center gap-2 shadow-lg"
                >
                  <span>CONFIRM & GENERATE PASS</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-kairos-cyan to-kairos-purple flex items-center justify-center shadow-2xl shadow-cyan-400/50 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-black" />
              </div>
              <h3 className="font-orbitron font-bold text-2xl text-white">REGISTRATION SUCCESSFUL!</h3>
              <p className="font-space text-xs text-gray-300 max-w-md mx-auto">
                Welcome to PRAVAAH’27 KAIROS. Your digital pass has been generated and linked to your profile.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
