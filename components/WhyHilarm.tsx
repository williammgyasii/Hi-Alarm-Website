"use client";

import { motion } from "framer-motion";
import { Users, Zap, Target, TrendingUp, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Users,
    title: "Accountability built in",
    description: "Someone else is invested in your success. That single fact changes everything.",
  },
  {
    icon: Zap,
    title: "Simple, fast setup",
    description: "No complicated features. Set an alarm, pick your person. That's it.",
  },
  {
    icon: Target,
    title: "Designed for consistency",
    description: "Build habits that actually stick by removing the easy way out.",
  },
];

const stats = [
  { value: "87%", label: "wake up on time", icon: TrendingUp },
  { value: "3x", label: "more consistent", icon: CheckCircle2 },
];

export function WhyHilarm() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[150px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-4">
              Why Hilarm
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Motivation fades.
              <span className="block text-gradient">Structure wins.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              We all know willpower alone isn&apos;t enough. Hilarm creates the structure 
              you need to actually follow through—every single morning.
            </p>
            
            {/* Stats */}
            <div className="flex gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="text-4xl font-bold">{stat.value}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right - Cards */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                >
                  <Card className="group bg-card/50 border-white/[0.06] hover:border-primary/30 transition-all duration-300 overflow-hidden">
                    <CardContent className="flex gap-5 p-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-primary" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
