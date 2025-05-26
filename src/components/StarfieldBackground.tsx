
import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  isDisappearing: boolean;
  brightness: number;
  lifespan: number;
  age: number;
}

interface StarfieldBackgroundProps {
  onDeathTrigger: boolean;
}

export const StarfieldBackground: React.FC<StarfieldBackgroundProps> = ({ onDeathTrigger }) => {
  const [stars, setStars] = useState<Star[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const nextStarId = useRef(0);
  const starsRef = useRef<Star[]>([]);

  // Update the ref whenever stars state changes
  useEffect(() => {
    starsRef.current = stars;
  }, [stars]);

  // Initialize with fewer stars that will be dynamic
  useEffect(() => {
    const initialStars: Star[] = [];
    for (let i = 0; i < 200; i++) {
      initialStars.push({
        id: nextStarId.current++,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        isDisappearing: false,
        brightness: 1,
        lifespan: Math.random() * 300 + 100,
        age: 0
      });
    }
    setStars(initialStars);
  }, []);

  // Trigger star disappearance when death occurs
  useEffect(() => {
    if (onDeathTrigger && starsRef.current.length > 0) {
      const availableStars = starsRef.current.filter(star => !star.isDisappearing);
      if (availableStars.length === 0) return;
      
      const randomIndex = Math.floor(Math.random() * availableStars.length);
      const targetStar = availableStars[randomIndex];
      
      setStars(prevStars => 
        prevStars.map(star => 
          star.id === targetStar.id 
            ? { ...star, isDisappearing: true, brightness: 4 }
            : star
        )
      );
    }
  }, [onDeathTrigger]);

  const updateStars = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let updatedStars = starsRef.current.map(star => {
      star.age++;
      
      if (star.isDisappearing) {
        const newOpacity = star.opacity - 0.03;
        const newBrightness = Math.max(star.brightness - 0.15, 1);
        
        if (newOpacity <= 0) {
          return null;
        }
        
        return { 
          ...star, 
          opacity: newOpacity,
          brightness: newBrightness
        };
      }
      
      if (star.age >= star.lifespan) {
        return null;
      }
      
      return star;
    }).filter(star => star !== null) as Star[];

    // Add new stars randomly to maintain population
    while (updatedStars.length < 300 && Math.random() < 0.02) {
      updatedStars.push({
        id: nextStarId.current++,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.3,
        opacity: 0,
        isDisappearing: false,
        brightness: 1,
        lifespan: Math.random() * 400 + 200,
        age: 0
      });
    }

    // Fade in new stars
    updatedStars = updatedStars.map(star => {
      if (star.opacity < 0.6 && !star.isDisappearing) {
        return { ...star, opacity: Math.min(star.opacity + 0.005, Math.random() * 0.6 + 0.2) };
      }
      return star;
    });

    setStars(updatedStars);
  }, []);

  // Canvas rendering with animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update stars
      updateStars();

      // Draw stars with enhanced glow effect
      starsRef.current.forEach(star => {
        ctx.save();
        ctx.globalAlpha = star.opacity;
        
        // Main star
        ctx.fillStyle = `rgba(${220 + star.brightness * 35}, ${220 + star.brightness * 35}, 255, 1)`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * star.brightness, 0, Math.PI * 2);
        ctx.fill();
        
        // Enhanced glow for brighter stars
        if (star.brightness > 1.5) {
          ctx.shadowBlur = 15 * star.brightness;
          ctx.shadowColor = `rgba(220, 220, 255, ${star.opacity * 0.8})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * star.brightness * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateStars]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};
