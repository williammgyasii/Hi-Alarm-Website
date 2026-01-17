"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Play, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";

interface HeroProps {
  onJoinWaitlist: () => void;
  onHowItWorks: () => void;
}

// Animated phone mockup component
function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: 45 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-16 lg:mt-0"
      style={{ perspective: 1000 }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-primary/30 blur-[80px] rounded-full scale-75" />
      
      {/* Phone frame */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[280px] h-[560px] mx-auto"
      >
        {/* Phone body */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[3rem] border border-zinc-700 shadow-2xl overflow-hidden">
          {/* Screen */}
          <div className="absolute inset-3 bg-background rounded-[2.25rem] overflow-hidden">
            {/* Status bar */}
            <div className="flex items-center justify-between px-6 py-2 text-xs text-muted-foreground">
              <span>9:41</span>
              <div className="flex gap-1">
                <div className="w-4 h-2 bg-muted-foreground/50 rounded-sm" />
                <div className="w-4 h-2 bg-primary rounded-sm" />
              </div>
            </div>
            
            {/* App content */}
            <div className="px-6 pt-8">
              {/* Alarm display */}
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center mb-8"
              >
                <div className="text-6xl font-bold text-white mb-2">6:00</div>
                <div className="text-sm text-muted-foreground">Wake up alarm</div>
              </motion.div>
              
              {/* Ringing animation */}
              <div className="relative flex justify-center mb-8">
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute w-20 h-20 bg-primary/30 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="absolute w-20 h-20 bg-primary/40 rounded-full"
                />
                <div className="relative w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                  <Bell className="w-8 h-8 text-white" />
                </div>
              </div>
              
              {/* Partner info */}
              <div className="bg-card/50 rounded-2xl p-4 border border-white/[0.06]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center text-sm font-bold text-white">
                    JD
                  </div>
                  <div>
                    <p className="font-medium text-sm">Jordan</p>
                    <p className="text-xs text-muted-foreground">Your accountability partner</p>
                  </div>
                </div>
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xs text-primary text-center"
                >
                  Waiting for Jordan to stop your alarm...
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full" />
      </motion.div>
    </motion.div>
  );
}

export function Hero({ onJoinWaitlist, onHowItWorks }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animated-gradient" />
        
        {/* Primary glow */}
        <motion.div
          style={{ y }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[1000px] h-[1000px] rounded-full bg-primary/20 blur-[150px]"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern" />
        
        {/* Radial overlay */}
        <div className="absolute inset-0 radial-overlay" />
        
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Badge 
                variant="outline" 
                className="mb-8 px-4 py-2 border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Coming Soon — Join the Waitlist
              </Badge>
            </motion.div>

            {/* Headline with letter animation */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-8"
            >
              <motion.span 
                className="block text-gradient-subtle"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                Comfort is
              </motion.span>
              <motion.span 
                className="block text-gradient mt-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                overrated.
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              The alarm app that adds <span className="text-foreground font-medium">real accountability</span> to your mornings. 
              A trusted person stops your alarm—not you.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button 
                size="lg"
                onClick={onJoinWaitlist}
                className="group w-full sm:w-auto h-14 px-8 text-base font-semibold bg-primary hover:bg-primary/90 text-white rounded-2xl glow-hover"
              >
                Join the Waitlist
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={onHowItWorks}
                className="w-full sm:w-auto h-14 px-8 text-base font-medium rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
              >
                <Play className="mr-2 w-4 h-4" />
                How it works
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground"
            >
              <div className="flex -space-x-3">
                {[
                  "from-rose-500 to-orange-400",
                  "from-violet-500 to-purple-400", 
                  "from-cyan-500 to-blue-400",
                  "from-emerald-500 to-green-400",
                  "from-amber-500 to-yellow-400",
                ].map((gradient, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1, type: "spring" }}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} border-2 border-background flex items-center justify-center text-xs font-bold text-white`}
                  >
                    {String.fromCharCode(65 + i)}
                  </motion.div>
                ))}
              </div>
              <span className="text-muted-foreground">
                <span className="text-foreground font-semibold">247+</span> people already on the waitlist
              </span>
            </motion.div>
          </div>

          {/* Right - Phone mockup */}
          <div className="hidden lg:block">
            <PhoneMockup />
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
