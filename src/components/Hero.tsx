
// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { FALLBACK_IMAGE } from '../../constants';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Parallax for text
  const yText = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  // Handle mouse move for "flashlight" effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Smooth mouse movement for the mask
  const springConfig = { damping: 25, stiffness: 120 };
  const maskX = useSpring(useMotionValue(0), springConfig);
  const maskY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    maskX.set(mousePosition.x);
    maskY.set(mousePosition.y);
  }, [mousePosition, maskX, maskY]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-noir-950 cursor-none"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          poster={FALLBACK_IMAGE}
          className="w-full h-full object-cover object-[50%_20%] scale-105 filter grayscale contrast-125 transition-opacity duration-1000"
        >
          <source src="https://videos.pexels.com/video-files/5709404/5709404-uhd_2160_3840_25fps.mp4" type="video/mp4" />
          {/* Fallback Image if video fails */}
          <img src={FALLBACK_IMAGE} alt="Hero" className="w-full h-full object-cover object-[50%_20%]" />
        </video>
      </div>

      {/* Reveal Layer (Color Video) - Masked */}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), black 10%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), black 10%, transparent 80%)',
          // @ts-ignore - custom properties for framer motion interaction
          '--mouse-x': maskX,
          '--mouse-y': maskY
        }}
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover object-[50%_20%] scale-105"
        >
          <source src="https://videos.pexels.com/video-files/5709404/5709404-uhd_2160_3840_25fps.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 pointer-events-none px-4"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs md:text-sm tracking-[0.5em] uppercase text-gold-500 mb-6 font-medium"
        >
          Spring / Summer 2025
        </motion.h2>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-7xl md:text-9xl font-serif font-bold text-white mb-8 mix-blend-overlay tracking-tight"
        >
          ETHEREAL<br/>FORM
        </motion.h1>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-[1px] w-24 bg-white/50 my-8"
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-md text-gray-200 font-light text-sm md:text-base leading-relaxed tracking-wide mix-blend-difference"
        >
          Deconstructing traditional silhouettes to reveal the raw essence of modern luxury.
        </motion.p>
      </motion.div>

      {/* Custom Cursor Indicator */}
      <motion.div
        className="fixed w-4 h-4 bg-gold-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ 
          x: maskX, 
          y: maskY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
      <motion.div
        className="fixed w-20 h-20 border border-white/20 rounded-full pointer-events-none z-50"
        style={{ 
          x: maskX, 
          y: maskY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] uppercase tracking-widest">Explore</span>
        <ArrowDown className="animate-bounce" size={16} />
      </motion.div>
    </div>
  );
};
