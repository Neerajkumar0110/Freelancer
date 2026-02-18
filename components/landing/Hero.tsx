'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const featureWords = ["SQL", "Next.js", "AI Reports", "GitHub Sync", "360° Profile", "Node.js", "Autonomous"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; z: number; text?: string }[] = [];
    const numStars = 300;
    const speed = 1.2;

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * window.innerWidth - window.innerWidth / 2,
          y: Math.random() * window.innerHeight - window.innerHeight / 2,
          z: Math.random() * window.innerWidth,
          text: i % 45 === 0 ? featureWords[Math.floor(Math.random() * featureWords.length)] : undefined
        });
      }
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cx = width / 2;
      const cy = height / 2;

      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        const x = (star.x / star.z) * cx + cx;
        const y = (star.y / star.z) * cy + cy;
        const size = (1 - star.z / width) * 2;
        const opacity = Math.max(0, 1 - star.z / width);

        if (x >= 0 && x < width && y >= 0 && y < height) {
          if (star.text) {
            const baseFontSize = 16;
            const dynamicFontSize = Math.floor(size * baseFontSize);

            ctx.font = `900 ${dynamicFontSize}px sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(255, 255, 255, 0.5)";

            ctx.globalAlpha = opacity;
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(star.text, x, y);

            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1.0;
          } else {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    setup();
    draw();
    window.addEventListener('resize', setup);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setup);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
    </div>
  );
};

const PARTNERS = [
  { name: "GitHub", logo: "https://www.vectorlogo.zone/logos/github/github-tile.svg", width: 32, height: 32 },
  { name: "LinkedIn", logo: "https://www.vectorlogo.zone/logos/linkedin/linkedin-icon.svg", width: 32, height: 32 },
  { name: "Facebook", logo: "https://www.vectorlogo.zone/logos/facebook/facebook-official.svg", width: 32, height: 32 },
  { name: "Tailwind", logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg", width: 32, height: 32 }
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden bg-[#020617]">
      <SpaceBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto text-center mb-15 mt-8 md:mt-0"
      >
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-full text-blue-600 shadow-2xl shadow-blue-500/30 mb-5 border border-blue-100">
          <Zap size={14} fill="currentColor" className="animate-pulse" />
          <span className="tracking-widest uppercase md:text-[11px] text-[8px] font-black">AI-Autonomous Job Matching Engine</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-5 md:leading-[1.2] leading-[1.1] uppercase italic">
          Scale <span className="text-blue-500 italic">your,</span> <br />
          Digital <span className="text-indigo-400">Ambition.</span>
        </h1>

        <p className="text-[16px] md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
          Connecting businesses in need to freelancers who deliver <span className="text-white font-bold underline decoration-blue-500/50">GitHub</span>, <span className="text-white font-bold underline decoration-indigo-500/50">LinkedIn</span>, and AI assessments.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5 mb-40">
          <button className="flex items-center justify-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/30 active:scale-95">
            Find Work<ArrowRight size={18} />
          </button>
          <button className="flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 text-white px-10 py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest hover:bg-white/10 backdrop-blur-md transition-all active:scale-95">
            Hire with AI <ShieldCheck size={18} />
          </button>
        </div>

        <div className="relative mb-14">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-white/10 opacity-30"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-8 text-xs font-black uppercase tracking-[0.4em] text-slate-500 italic">
              Deep Integration Ecosystem
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center opacity-90">
          {PARTNERS.map((partner) => (
            <div key={partner.name} className="flex items-center gap-4 group cursor-pointer bg-white/[0.03] px-6 py-3 rounded-2xl border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all">
              <div className="relative h-7 w-7">
                <Image src={partner.logo} alt={partner.name} fill sizes="28px" className="object-contain" />
              </div>
              <span className="text-sm font-black text-white tracking-widest uppercase italic">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}