"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah K.",
    role: "Early Riser Convert",
    avatar: "SK",
    gradient: "from-rose-500 to-orange-400",
    rating: 5,
    text: "I've tried every alarm app out there. The accountability factor is a game-changer. My partner now controls my wake-up, and I haven't snoozed in 3 weeks.",
  },
  {
    id: 2,
    name: "Marcus T.",
    role: "Fitness Enthusiast",
    avatar: "MT",
    gradient: "from-violet-500 to-purple-400",
    rating: 5,
    text: "Finally hitting my 5am gym sessions consistently. Having my workout buddy responsible for my alarm means I actually show up. Revolutionary concept.",
  },
  {
    id: 3,
    name: "Emily R.",
    role: "Remote Worker",
    avatar: "ER",
    gradient: "from-cyan-500 to-blue-400",
    rating: 5,
    text: "Working from home destroyed my sleep schedule. Hilarm + my mom checking in = back to a normal routine. Simple but so effective.",
  },
  {
    id: 4,
    name: "David L.",
    role: "Night Owl Reformed",
    avatar: "DL",
    gradient: "from-emerald-500 to-green-400",
    rating: 5,
    text: "The concept sounded crazy at first. But after years of failed self-discipline, external accountability was exactly what I needed. Life-changing.",
  },
  {
    id: 5,
    name: "Jessica M.",
    role: "Busy Parent",
    avatar: "JM",
    gradient: "from-amber-500 to-yellow-400",
    rating: 5,
    text: "My husband and I hold each other accountable now. We both get up on time, the kids get to school on schedule. Worth every penny.",
  },
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "center",
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[200px]" />
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
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Early adopters
            <span className="block text-gradient mt-1">love it</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real stories from people who transformed their mornings.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-none w-full sm:w-[80%] md:w-[60%] lg:w-[45%] pl-4 first:pl-0"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`h-full bg-card/50 border-white/[0.06] transition-all duration-500 ${
                      selectedIndex === index ? "border-primary/30 scale-100" : "scale-95 opacity-60"
                    }`}>
                      <CardContent className="p-8">
                        {/* Quote icon */}
                        <div className="mb-6">
                          <Quote className="w-10 h-10 text-primary/30" />
                        </div>

                        {/* Rating */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-primary text-primary"
                            />
                          ))}
                        </div>

                        {/* Text */}
                        <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                          &ldquo;{testimonial.text}&rdquo;
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-sm font-bold text-white`}>
                            {testimonial.avatar}
                          </div>
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedIndex === index
                      ? "w-8 bg-primary"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
