// src/app/(main)/share-your-story/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import Sentiment from "sentiment";
import { fadeInUp, staggerContainer } from "@/lib/framer/variants";

const sentiment = new Sentiment();

// Minimum sentiment score to allow submission (prevents negative reviews)
const MIN_SENTIMENT_SCORE = 0;

interface FormData {
  firstName: string;
  lastName: string;
  message: string;
  role: string;
  company: string;
  email: string;
  rating: number;
}

export default function ShareYourStoryPage() {
  const { isSignedIn, user } = useUser();
  
  // Pre-fill from Clerk if signed in
  const initialFirstName = isSignedIn && user?.firstName ? user.firstName : "";
  const initialLastName = isSignedIn && user?.lastName ? user.lastName : "";
  const initialEmail = isSignedIn && user?.primaryEmailAddress?.emailAddress ? user.primaryEmailAddress.emailAddress : "";
  
  const [formData, setFormData] = useState<FormData>({
    firstName: initialFirstName,
    lastName: initialLastName,
    message: "",
    role: "",
    company: "",
    email: initialEmail,
    rating: 5,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "negative">("idle");
  const [sentimentWarning, setSentimentWarning] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Check sentiment for message field
    if (name === "message" && value.length > 10) {
      const result = sentiment.analyze(value);
      setSentimentWarning(result.score < MIN_SENTIMENT_SCORE);
    } else if (name === "message") {
      setSentimentWarning(false);
    }
  };
  
  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final sentiment check
    const sentimentResult = sentiment.analyze(formData.message);
    if (sentimentResult.score < MIN_SENTIMENT_SCORE) {
      setSubmitStatus("negative");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/testimonials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName || undefined,
          message: formData.message,
          role: formData.role || undefined,
          company: formData.company || undefined,
          email: formData.email || undefined,
          rating: formData.rating,
          userId: isSignedIn && user?.id ? user.id : undefined,
        }),
      });
      
      if (response.ok) {
        setSubmitStatus("success");
        // Reset form but keep pre-filled fields
        setFormData({
          firstName: initialFirstName,
          lastName: initialLastName,
          message: "",
          role: "",
          company: "",
          email: initialEmail,
          rating: 5,
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Failed to submit testimonial:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isFormValid = formData.firstName.trim() && formData.message.trim().length >= 20;
  
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-background to-neutral-900/50">
      <div className="relative z-10">
        <motion.div
          className="container mx-auto px-4 py-20 max-w-2xl"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Share Your Story
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Your experience with SELVE helps others understand themselves better. 
              Tell us how SELVE has helped you on your journey of self-discovery.
            </p>
          </motion.div>
          
          {submitStatus === "success" ? (
            <motion.div
              variants={fadeInUp}
              className="bg-green-500/10 border border-green-500/30 rounded-lg p-8 text-center"
            >
              <div className="text-5xl mb-4">✨</div>
              <h2 className="text-2xl font-bold text-green-500 mb-2">Thank You!</h2>
              <p className="text-muted-foreground">
                Your story has been submitted and will be reviewed shortly. 
                We appreciate you sharing your experience with us!
              </p>
              <button
                onClick={() => setSubmitStatus("idle")}
                className="mt-6 px-6 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
              >
                Share Another Story
              </button>
            </motion.div>
          ) : (
            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    disabled={isSignedIn && !!user?.firstName}
                    className={`w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                      isSignedIn && user?.firstName ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                    placeholder="Your first name"
                  />
                  {isSignedIn && user?.firstName && (
                    <p className="text-xs text-muted-foreground mt-1">Auto-filled from your account</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isSignedIn && !!user?.lastName}
                    className={`w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                      isSignedIn && user?.lastName ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                    placeholder="Your last name (optional)"
                  />
                </div>
              </div>
              
              {/* Role and Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="role" className="block text-sm font-medium mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    placeholder="e.g., Product Manager"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    placeholder="e.g., Google"
                  />
                </div>
              </div>
              
              {/* Email (optional) */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSignedIn && !!user?.primaryEmailAddress}
                  className={`w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                    isSignedIn && user?.primaryEmailAddress ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  placeholder="your@email.com (optional, for follow-up)"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  We&apos;ll never share your email. It&apos;s only for follow-up if needed.
                </p>
              </div>
              
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  How would you rate your SELVE experience?
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className={`text-3xl transition-transform hover:scale-110 ${
                        star <= formData.rating ? "text-yellow-500" : "text-neutral-600"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Story <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={20}
                  rows={5}
                  className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
                  placeholder="Share how SELVE has helped you understand yourself better, grow professionally, or improve your relationships..."
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-muted-foreground">
                    Minimum 20 characters
                  </p>
                  <p className={`text-xs ${formData.message.length >= 20 ? "text-green-500" : "text-muted-foreground"}`}>
                    {formData.message.length} characters
                  </p>
                </div>
                
                {sentimentWarning && (
                  <p className="text-sm text-amber-500 mt-2">
                    💡 We&apos;re looking for positive experiences to share. If you have feedback or concerns, 
                    please <a href="mailto:hello@selve.me" className="underline">contact us directly</a>.
                  </p>
                )}
              </div>
              
              {/* Error States */}
              {submitStatus === "error" && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-500 text-sm">
                  Something went wrong. Please try again later.
                </div>
              )}
              
              {submitStatus === "negative" && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-amber-500 text-sm">
                  We appreciate all feedback! For constructive criticism or concerns, 
                  please <a href="mailto:hello@selve.me" className="underline">email us directly</a>. 
                  This form is for sharing positive experiences.
                </div>
              )}
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting || sentimentWarning}
                className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Submitting..." : "Share My Story"}
              </button>
              
              <p className="text-xs text-muted-foreground text-center">
                By submitting, you agree that your story may be featured on our website 
                (displayed as &quot;FirstName L.&quot;).
              </p>
            </motion.form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
