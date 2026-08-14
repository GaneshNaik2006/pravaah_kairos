import React, { useEffect, useRef } from 'react';

export default function SpaceGalaxyBackground({ phase, onInitialRotationComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initial sequence timer trigger
    const revealTimer = setTimeout(() => {
      if (onInitialRotationComplete) {
        onInitialRotationComplete();
      }
    }, 500);

    // Generate Subtle Deep Space Ambient Stars
    const starCount = 300;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
      });
    }

    let time = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      time += 0.015;

      // Dark Deep Space Background (#020208)
      ctx.fillStyle = '#020208';
      ctx.fillRect(0, 0, width, height);

      // Subtle Ambient Background Glows (Cyan top left, Purple bottom right)
      const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.2, 0, width * 0.2, height * 0.2, width * 0.4);
      grad1.addColorStop(0, 'rgba(56, 189, 248, 0.06)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.8, 0, width * 0.8, height * 0.8, width * 0.4);
      grad2.addColorStop(0, 'rgba(168, 85, 247, 0.06)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw Soft Twinkling Stars
      for (let i = 0; i < starCount; i++) {
        const star = stars[i];
        star.alpha += Math.sin(time + i) * 0.008;
        const currentAlpha = Math.max(0.1, Math.min(0.85, star.alpha));

        ctx.fillStyle = `rgba(224, 242, 254, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(revealTimer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [phase, onInitialRotationComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#020208]"
    />
  );
}
