"use client";

import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, User, Loader2, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type FormState = "idle" | "loading" | "success" | "error";

export const WaitlistForm = forwardRef<HTMLElement>(function WaitlistForm(_, ref) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setFormState("error");
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (company) {
      setFormState("success");
      return;
    }

    setFormState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
          company,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setFormState("success");
      } else {
        setFormState("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setFormState("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-[800px] h-[800px] rounded-full bg-primary/15 blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto"
        >
          <Card className="relative bg-card/80 border-white/[0.08] overflow-hidden">
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            
            <CardContent className="p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                      className="relative w-20 h-20 mx-auto mb-6"
                    >
                      <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl" />
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3">
                      You&apos;re on the list!
                    </h3>
                    <p className="text-muted-foreground">
                      We&apos;ll let you know when Hilarm is ready.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 mb-4">
                        <Sparkles className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                        Get early access
                      </h2>
                      <p className="text-muted-foreground">
                        Be first to wake up with accountability.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name */}
                      <div className="relative">
                        <label htmlFor="name" className="sr-only">Name (optional)</label>
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Name (optional)"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={formState === "loading"}
                          className="h-14 pl-12 bg-background border-white/[0.08] focus:border-primary/50 rounded-xl"
                        />
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={formState === "loading"}
                          required
                          className="h-14 pl-12 bg-background border-white/[0.08] focus:border-primary/50 rounded-xl"
                          aria-required="true"
                          aria-invalid={formState === "error"}
                        />
                      </div>

                      {/* Honeypot */}
                      <div className="absolute -left-[9999px]" aria-hidden="true">
                        <label htmlFor="company">Company</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      {/* Error */}
                      <AnimatePresence>
                        {formState === "error" && errorMessage && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20"
                          >
                            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                            <span className="text-sm text-destructive">{errorMessage}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <Button
                        type="submit"
                        disabled={formState === "loading"}
                        className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl glow-hover"
                      >
                        {formState === "loading" ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Joining...
                          </>
                        ) : (
                          <>
                            Join the Waitlist
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>

                      <p className="text-center text-xs text-muted-foreground pt-2">
                        By joining, you agree to our{" "}
                        <a href="/privacy" className="text-foreground/70 hover:text-foreground underline underline-offset-2 transition-colors">
                          Privacy Policy
                        </a>
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
});
