"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, Clock, Zap } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function Counter({ end, suffix = "", prefix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  {
    icon: Users,
    value: 247,
    suffix: "+",
    label: "Waitlist signups",
    gradient: "from-primary to-orange-400",
  },
  {
    icon: TrendingUp,
    value: 87,
    suffix: "%",
    label: "Wake up success rate",
    gradient: "from-emerald-500 to-green-400",
  },
  {
    icon: Clock,
    value: 21,
    suffix: " days",
    label: "Average streak",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    icon: Zap,
    value: 3,
    suffix: " sec",
    label: "Average alarm stop time",
    gradient: "from-cyan-500 to-blue-400",
  },
];

export function AnimatedStats() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} p-[1px] mb-4`}>
                  <div className="w-full h-full rounded-xl bg-background flex items-center justify-center group-hover:bg-transparent transition-colors duration-500">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
