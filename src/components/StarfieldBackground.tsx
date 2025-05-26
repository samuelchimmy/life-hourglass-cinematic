
import React, { useEffect, useRef, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  isDisappearing: boolean;
  brightness: number;
}

interface StarfieldBackgroundProps {
  onDeathTrigger: boolean;
}

export const StarfieldBackground: React.FC<StarfieldBackgroundProps> = ({ onDeathTrigger }) => {
  const [stars, setStars] = useState<Star[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  // Initialize stars
  useEffect(() => {
    const initialStars: Star[] = [];
    for (let i = 0; i < 150000; i++) {
      initialStars.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        isDisappearing: false,
        brightness: 1
      });
    }
    setStars(initialStars);
  }, []);

  // Trigger star disappearance when death occurs
  useEffect(() => {
    if (onDeathTrigger && stars.length > 0) {
      setStars(prevStars => {
        const availableStars = prevStars.filter(star => !star.isDisappearing);
        if (availableStars.length === 0) return prevStars;
        
        const randomIndex = Math.floor(Math.random() * availableStars.length);
        const targetStar = availableStars[randomIndex];
        
        return prevStars.map(star => 
          star.id === targetStar.id 
            ? { ...star, isDisappearing: true, brightness: 3 }
            : star
        );
      });
    }
  }, [onDeathTrigger, stars.length]);

  // Canvas rendering
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

      // Update and draw stars
      setStars(prevStars => 
        prevStars.map(star => {
          if (star.isDisappearing) {
            const newOpacity = star.opacity - 0.02;
            const newBrightness = Math.max(star.brightness - 0.1, 1);
            
            if (newOpacity <= 0) {
              // Reset star to a new position
              return {
                ...star,
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                opacity: Math.random() * 0.8 + 0.2,
                isDisappearing: false,
                brightness: 1
              };
            }
            
            return { 
              ...star, 
              opacity: newOpacity,
              brightness: newBrightness
            };
          }
          return star;
        })
      );

      // Draw stars
      stars.forEach(star => {
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = `rgba(${200 + star.brightness * 55}, ${200 + star.brightness * 55}, 255, 1)`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * star.brightness, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect for brighter stars
        if (star.brightness > 1) {
          ctx.shadowBlur = 10 * star.brightness;
          ctx.shadowColor = `rgba(200, 200, 255, ${star.opacity})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * star.brightness, 0, Math.PI * 2);
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
  }, [stars]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};
