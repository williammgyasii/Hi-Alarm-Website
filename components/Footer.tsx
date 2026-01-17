"use client";

import { Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-12">
      <Separator className="mb-12 bg-white/[0.06]" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Bell className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold">Hilarm</span>
            </a>
            <span className="hidden sm:block text-sm text-muted-foreground">
              © {year} Hilarm. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8" aria-label="Footer navigation">
            <a
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
          </nav>
        </div>
        
        {/* Mobile copyright */}
        <p className="sm:hidden text-center text-sm text-muted-foreground mt-6">
          © {year} Hilarm. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
