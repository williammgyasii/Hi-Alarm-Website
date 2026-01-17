"use client";

import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onJoinWaitlist: () => void;
}

export function Header({ onJoinWaitlist }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center justify-between h-16 px-6 rounded-2xl glass border border-white/[0.08]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-lg group-hover:bg-primary/30 transition-colors" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Hilarm
            </span>
          </a>

          {/* CTA */}
          <Button 
            onClick={onJoinWaitlist}
            className="bg-primary hover:bg-primary/90 text-white font-medium rounded-xl px-5 glow-hover"
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
