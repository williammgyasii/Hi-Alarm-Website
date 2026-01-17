"use client";

import { motion } from "framer-motion";
import { AlarmClock, UserPlus, ShieldCheck, ArrowRight } from "lucide-react";
import { forwardRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: AlarmClock,
    number: "01",
    title: "Set your alarm",
    description: "Choose your wake-up time just like any other alarm. Simple, familiar, fast.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: UserPlus,
    number: "02", 
    title: "Pick your person",
    description: "Invite someone who genuinely wants you to succeed. Partner, friend, family.",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "They stop it",
    description: "When your alarm rings, only they can turn it off. No snooze. No excuses.",
    gradient: "from-primary to-orange-400",
  },
];

export const HowItWorks = forwardRef<HTMLElement>(function HowItWorks(_, ref) {
  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-4">
            How it works
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Three steps to
            <span className="block text-gradient mt-1">bulletproof mornings</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1] 
                }}
              >
                <Card className="group relative h-full bg-card/50 border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 overflow-hidden shine">
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 gradient-border" />
                  
                  <CardContent className="p-8">
                    {/* Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} p-[1px]`}>
                        <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center group-hover:bg-transparent transition-colors duration-500">
                          <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                        </div>
                      </div>
                      <span className="text-4xl font-bold text-white/[0.06] group-hover:text-white/[0.1] transition-colors">
                        {step.number}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Connection arrows (desktop) */}
        <div className="hidden md:flex justify-center mt-8 gap-[calc(33.333%-80px)]">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <ArrowRight className="w-6 h-6 text-white/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
