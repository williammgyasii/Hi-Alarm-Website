"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { 
  Bell, 
  Users, 
  Shield, 
  Zap, 
  Clock, 
  Heart,
  ChevronLeft,
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Bell,
    title: "Smart Alarms",
    description: "Set multiple alarms with customizable sounds. Choose gentle wake-ups or intense alerts.",
    gradient: "from-primary to-orange-400",
    image: "🔔",
  },
  {
    icon: Users,
    title: "Trusted Partners",
    description: "Connect with up to 5 accountability partners. They receive notifications when your alarm rings.",
    gradient: "from-violet-500 to-purple-400",
    image: "👥",
  },
  {
    icon: Shield,
    title: "No Escape Mode",
    description: "Enable strict mode where only your partner can stop the alarm. No snooze, no dismiss.",
    gradient: "from-cyan-500 to-blue-400",
    image: "🛡️",
  },
  {
    icon: Zap,
    title: "Quick Actions",
    description: "Partners can stop alarms instantly from their phone, Apple Watch, or notification.",
    gradient: "from-emerald-500 to-green-400",
    image: "⚡",
  },
  {
    icon: Clock,
    title: "Sleep Stats",
    description: "Track your wake-up success rate, sleep patterns, and build accountability streaks.",
    gradient: "from-amber-500 to-yellow-400",
    image: "📊",
  },
  {
    icon: Heart,
    title: "Gentle Reminders",
    description: "Optional morning messages from your partner to start your day with motivation.",
    gradient: "from-rose-500 to-pink-400",
    image: "💝",
  },
];

export function FeatureShowcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-4">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Everything you need to
            <span className="block text-gradient mt-1">wake up better</span>
          </h2>
        </motion.div>

        {/* Feature carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-none w-full sm:w-1/2 lg:w-1/3 px-3"
                  >
                    <div className="group relative h-full p-8 rounded-3xl bg-card/50 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 overflow-hidden">
                      {/* Hover gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                      
                      {/* Icon */}
                      <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-[1px] mb-6`}>
                        <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center group-hover:bg-transparent transition-colors duration-500">
                          <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Decorative element */}
                      <div className="absolute bottom-4 right-4 text-6xl opacity-5 group-hover:opacity-10 transition-opacity">
                        {feature.image}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full border-white/10 bg-white/5 hover:bg-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedIndex === index
                      ? "w-6 bg-primary"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full border-white/10 bg-white/5 hover:bg-white/10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
