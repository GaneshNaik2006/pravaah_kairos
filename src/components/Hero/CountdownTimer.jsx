import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 185, hours: 14, minutes: 22, seconds: 45 });

  useEffect(() => {
    // Target date: February 12, 2027
    const targetDate = new Date('2027-02-12T09:00:00+05:30').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 my-6">
      {timeBlocks.map((block, idx) => (
        <div key={block.label} className="flex items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl glass-panel border-kairos-cyan/30 flex items-center justify-center shadow-lg shadow-cyan-500/10 group hover:border-kairos-cyan transition-colors">
              <span className="font-orbitron font-extrabold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-300 text-glow-cyan">
                {String(block.value).padStart(2, '0')}
              </span>
            </div>
            <span className="mt-2 font-space text-[10px] sm:text-xs font-semibold text-kairos-cyan tracking-widest uppercase">
              {block.label}
            </span>
          </motion.div>

          {idx < timeBlocks.length - 1 && (
            <span className="font-orbitron font-bold text-xl sm:text-2xl text-kairos-purple/80 ml-2 sm:ml-4 animate-pulse">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
