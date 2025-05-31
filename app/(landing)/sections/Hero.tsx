"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CodeSnippetTabs } from "@/components/ui/CodeSnippetTabs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
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
    <section className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80 z-0" />

      {/* Background network graphic */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2100&auto=format&fit=crop')] bg-cover bg-center" />
        {/* Photo by Shubham Dhage on Unsplash */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-left">
            <motion.div variants={itemVariants}>
              <div className="inline-block px-4 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-sm font-medium mb-4">
                African-Built Blockchain Infrastructure
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
              variants={itemVariants}
            >
              Radically better{" "}
              <span className="text-[#10B981]">blockchain infrastructure</span>{" "}
              for Africa
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mt-6"
              variants={itemVariants}
            >
              Ship higher-quality dApps faster. Be the hero of your Web3 teams.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 space-y-8">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button
                  size="lg"
                  className="bg-[#10B981] hover:bg-[#059669] text-black gap-2 group min-w-[200px]"
                  asChild
                >
                  <Link href="/auth/login">
                    Start for free
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="min-w-[200px]">
                  Book a demo
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                Start building for free or{" "}
                <Link
                  href="#"
                  className="text-[#10B981] hover:text-[#10B981]/80 hover:underline"
                >
                  view pricing
                </Link>
              </p>
            </motion.div>
          </div>

          <motion.div className="pt-8" variants={itemVariants}>
            <CodeSnippetTabs />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
