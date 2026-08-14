import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CosmicCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePos({ x, y });

      // Add trail particle
      particleId++;
      const newParticle = {
        id: particleId,
        x,
        y,
        size: Math.random() * 6 + 3,
        color: Math.random() > 0.5 ? '#22d3ee' : '#a855f7',
      };

      setTrail((prev) => [...prev.slice(-14), newParticle]);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Trailing Cosmic Particles */}
      {trail.map((p, idx) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`,
          }}
        />
      ))}

      {/* Main Cosmic Glowing Cursor Ring */}
      <motion.div
        animate={{
          x: mousePos.x - (isHovered ? 24 : 12),
          y: mousePos.y - (isHovered ? 24 : 12),
          scale: isHovered ? 1.4 : 1,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.4 }}
        className={`fixed top-0 left-0 rounded-full border pointer-events-none transition-colors duration-300 ${
          isHovered
            ? 'w-12 h-12 border-kairos-cyan bg-kairos-cyan/20 shadow-[0_0_25px_rgba(34,211,238,0.8)]'
            : 'w-6 h-6 border-kairos-cyan/70 bg-cyan-400/10 shadow-[0_0_12px_rgba(34,211,238,0.5)]'
        }`}
      />

      {/* Center Core Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#ffffff]"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
      />
    </div>
  );
}
