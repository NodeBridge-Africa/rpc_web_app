"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SponsorHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-[80vh] w-full flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80 z-0" />
      
      {/* Background network graphic */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1634979149798-e9a118734e93?q=80&w=2100&auto=format&fit=crop')] bg-cover bg-center" />
        {/* Photo by Shubham Dhage on Unsplash */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-sm font-medium mb-4">
            Partner with Nodebridge Africa
          </div>
          
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            variants={itemVariants}
          >
            Empower the African <span className="text-[#10B981]">Web3 Ecosystem</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Join our mission to build a robust blockchain infrastructure across Africa and support the next generation of Web3 developers.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <Button size="lg" className="bg-[#10B981] hover:bg-[#059669] text-black gap-2 group">
              Become a Sponsor
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              View Sponsorship Packages
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}