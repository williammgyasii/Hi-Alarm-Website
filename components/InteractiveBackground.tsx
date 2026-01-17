"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const spacing = 50;
    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        particles.push({
          x: i * spacing + spacing / 2,
          y: j * spacing + spacing / 2,
          baseX: i * spacing + spacing / 2,
          baseY: j * spacing + spacing / 2,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    }
    return particles;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0) return;
    particlesRef.current = initParticles(dimensions.width, dimensions.height);
  }, [dimensions, initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      particlesRef.current.forEach((particle) => {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          const moveX = Math.cos(angle) * force * 30;
          const moveY = Math.sin(angle) * force * 30;
          particle.x = particle.baseX - moveX;
          particle.y = particle.baseY - moveY;
        } else {
          particle.x += (particle.baseX - particle.x) * 0.1;
          particle.y += (particle.baseY - particle.y) * 0.1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 87, 87, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particlesRef.current.forEach((otherParticle) => {
          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance2 < 80 && distance2 > 0) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 87, 87, ${0.05 * (1 - distance2 / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

// Floating orbs component for additional visual interest
export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large primary orb */}
      <motion.div
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[150px]"
      />
      
      {/* Secondary orb */}
      <motion.div
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, 40, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/15 blur-[120px]"
      />
      
      {/* Accent orb */}
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px]"
      />
    </div>
  );
}
