import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Award, Building } from 'lucide-react';

export default function FestStats() {
  const stats = [
    { icon: Users, label: 'TOTAL FOOTFALL', value: '25,000+', color: 'text-kairos-cyan' },
    { icon: Trophy, label: 'CASH PRIZES', value: '₹10,00,000+', color: 'text-kairos-gold' },
    { icon: Award, label: 'EVENTS & WORKSHOPS', value: '50+', color: 'text-kairos-purple' },
    { icon: Building, label: 'PARTICIPATING COLLEGES', value: '120+', color: 'text-pink-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 rounded-3xl border-kairos-cyan/20 flex flex-col items-center text-center group hover:border-kairos-cyan transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-space-dark border border-gray-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <span className={`font-orbitron font-extrabold text-2xl sm:text-3xl ${item.color} tracking-tight`}>
              {item.value}
            </span>
            <span className="text-[11px] font-space text-gray-400 font-semibold tracking-widest uppercase mt-1">
              {item.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
