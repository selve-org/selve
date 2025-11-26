// src/app/(marketing)/sections/TestimonialsSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { staggerContainer, fadeInUp } from "@/lib/framer/variants";
import { TestimonialCarousel } from "@/components/testimonials/TestimonialCarousel";

// Placeholder testimonials - shown while real ones are being collected
const placeholderTestimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    displayName: "Alex R.",
    quote:
      "SELVE felt like talking to a wise friend who also happened to be a data scientist. The triangulation of feedback from my peers was a game-changer for my self-awareness.",
    role: "Product Manager",
    company: null,
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    displayName: "Jordan T.",
    quote:
      "I've tried every personality test out there. SELVE is the first one that felt dynamic and truly personalized. It's less about putting you in a box and more about giving you a compass.",
    role: "UX Designer",
    company: null,
    rating: 5,
    isPlaceholder: true,
  },
];

interface Testimonial {
  id: string;
  displayName: string;
  quote: string;
  role: string | null;
  company: string | null;
  rating: number;
  isPlaceholder?: boolean;
}

interface APITestimonial {
  id: string;
  firstName: string;
  lastInitial: string | null;
  displayRole: string | null;
  message: string;
  rating: number | null;
  createdAt: string;
}

interface APITestimonialsResponse {
  testimonials: APITestimonial[];
  total: number;
  hasRealTestimonials: boolean;
}

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(placeholderTestimonials);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/testimonials?limit=10`
        );
        
        if (response.ok) {
          const data: APITestimonialsResponse = await response.json();
          
          if (data.testimonials.length > 0) {
            // Transform API response to carousel format
            const apiTestimonials: Testimonial[] = data.testimonials.map((t) => ({
              id: t.id,
              displayName: t.lastInitial ? `${t.firstName} ${t.lastInitial}.` : t.firstName,
              quote: t.message,
              role: t.displayRole?.split(" at ")[0] || null,
              company: t.displayRole?.includes(" at ") ? t.displayRole.split(" at ")[1] : null,
              rating: t.rating || 5,
              isPlaceholder: false,
            }));
            
            setTestimonials(apiTestimonials);
          }
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        // Keep placeholder testimonials on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <motion.section
      className="container mx-auto px-4 py-20"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div variants={fadeInUp} className="text-center mb-12">
        <div className="bg-[var(--background)] p-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Trusted by curious minds
          </h2>
          <p className="text-muted-foreground mt-2">
            See what our users are saying about their SELVE journey.
          </p>
        </div>
      </motion.div>
      
      <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-700 animate-pulse">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-base text-neutral-600">★</span>
                  ))}
                </div>
                <div className="h-20 bg-neutral-700/50 rounded" />
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-700/50 rounded-full" />
                  <div>
                    <div className="h-4 w-20 bg-neutral-700/50 rounded" />
                    <div className="h-3 w-28 bg-neutral-700/50 rounded mt-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <TestimonialCarousel testimonials={testimonials} />
        )}
      </motion.div>
      
      <motion.div variants={fadeInUp} className="text-center mt-8">
        <div className="bg-[var(--background)] inline-block px-6 py-3">
          <Link
            href="/share-your-story"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Have a story to share?</span>
            <span className="underline">Tell us about your experience</span>
            <span>→</span>
          </Link>
        </div>
      </motion.div>
    </motion.section>
  );
};

