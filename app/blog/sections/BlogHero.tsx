"use client";

import { motion } from "framer-motion";

export default function BlogHero() {
  return (
    <section className="relative min-h-[60vh] w-full flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80 z-0" />
      {/* Optional background image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2100&auto=format&fit=crop')] bg-cover bg-center" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-4 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-sm font-medium mb-2">
            Nodebridge Africa Blog & Workshops
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#10B981] to-[#059669]">
            Insights, Stories & Hands-on Learning
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our latest articles, community stories, and hands-on
            workshops powered by Gamma. Filter, search, and share content to
            empower your blockchain journey.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
