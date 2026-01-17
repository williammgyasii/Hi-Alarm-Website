"use client";

import { useRef, useCallback } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AnimatedStats } from "@/components/AnimatedCounter";
import { HowItWorks } from "@/components/HowItWorks";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { WhyHilarm } from "@/components/WhyHilarm";
import { Testimonials } from "@/components/Testimonials";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Footer } from "@/components/Footer";
import { FloatingOrbs } from "@/components/InteractiveBackground";

export default function Home() {
  const howItWorksRef = useRef<HTMLElement>(null);
  const waitlistRef = useRef<HTMLElement>(null);

  const scrollToWaitlist = useCallback(() => {
    waitlistRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToHowItWorks = useCallback(() => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Interactive background elements */}
      <FloatingOrbs />
      
      {/* Subtle noise texture overlay */}
      <div className="noise" />
      
      <Header onJoinWaitlist={scrollToWaitlist} />
      
      <main className="relative z-10">
        <Hero 
          onJoinWaitlist={scrollToWaitlist} 
          onHowItWorks={scrollToHowItWorks} 
        />
        <AnimatedStats />
        <HowItWorks ref={howItWorksRef} />
        <FeatureShowcase />
        <WhyHilarm />
        <Testimonials />
        <WaitlistForm ref={waitlistRef} />
      </main>
      
      <Footer />
    </div>
  );
}
