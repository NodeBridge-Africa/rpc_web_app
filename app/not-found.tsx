"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Compass, Home, MapPin } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
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

  const floatAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80 z-0" />

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 opacity-5">
        <motion.div
          className="absolute top-20 left-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Compass className="w-32 h-32 text-[#10B981]" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <MapPin className="w-24 h-24 text-[#10B981]" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto space-y-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 404 SVG Illustration */}
          <motion.div variants={itemVariants} animate={floatAnimation} className="relative">
            <svg
              viewBox="0 0 500 400"
              className="w-full max-w-lg mx-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="personGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6B7280" />
                  <stop offset="100%" stopColor="#4B5563" />
                </linearGradient>
              </defs>

              {/* Background circle */}
              <circle cx="250" cy="200" r="180" fill="#10B981" opacity="0.05" />

              {/* Map */}
              <g transform="translate(150, 120)">
                <rect width="200" height="150" fill="url(#mapGradient)" rx="10" stroke="#10B981" strokeWidth="2" />
                
                {/* Map details */}
                <path d="M20 30 Q100 50 180 30" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.6" />
                <path d="M20 60 Q100 80 180 60" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.6" />
                <path d="M20 90 Q100 110 180 90" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.6" />
                <path d="M20 120 Q100 140 180 120" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.6" />
                
                {/* Location markers */}
                <circle cx="50" cy="70" r="6" fill="#059669" />
                <circle cx="150" cy="50" r="6" fill="#059669" />
                <circle cx="100" cy="100" r="8" fill="#10B981" />
                
                {/* X marks */}
                <g transform="translate(100, 100)">
                  <line x1="-6" y1="-6" x2="6" y2="6" stroke="#EF4444" strokeWidth="3" />
                  <line x1="6" y1="-6" x2="-6" y2="6" stroke="#EF4444" strokeWidth="3" />
                </g>
              </g>

              {/* Person figure */}
              <g transform="translate(250, 50)">
                {/* Head */}
                <circle cx="0" cy="0" r="25" fill="url(#personGradient)" />
                {/* Body */}
                <path d="M-20 20 Q0 30 20 20 L15 70 L5 70 L0 50 L-5 70 L-15 70 Z" fill="url(#personGradient)" />
                {/* Arms holding map */}
                <path d="M-20 30 Q-30 50 -25 70" stroke="#4B5563" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M20 30 Q30 50 25 70" stroke="#4B5563" strokeWidth="8" fill="none" strokeLinecap="round" />
              </g>

              {/* Compass */}
              <g transform="translate(80, 250)">
                <circle cx="0" cy="0" r="30" fill="none" stroke="#10B981" strokeWidth="2" opacity="0.5" />
                <path d="M0 -25 L5 0 L0 25 L-5 0 Z" fill="#10B981" opacity="0.7" />
                <path d="M-25 0 L0 -5 L25 0 L0 5 Z" fill="#059669" opacity="0.7" />
                <circle cx="0" cy="0" r="3" fill="#10B981" />
              </g>

              {/* Question marks */}
              <text x="100" y="100" fontSize="24" fill="#10B981" opacity="0.4" fontFamily="Arial, sans-serif">?</text>
              <text x="380" y="120" fontSize="32" fill="#10B981" opacity="0.6" fontFamily="Arial, sans-serif">?</text>
              <text x="420" y="250" fontSize="20" fill="#10B981" opacity="0.3" fontFamily="Arial, sans-serif">?</text>

              {/* 404 text */}
              <text x="250" y="350" fontSize="72" fontWeight="bold" fill="#10B981" textAnchor="middle" fontFamily="Arial, sans-serif">404</text>
              
              {/* Dotted path */}
              <path d="M100 300 Q200 280 300 300 T400 280" stroke="#10B981" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.3" />
            </svg>

            {/* Animated floating question marks outside SVG */}
            <motion.div
              className="absolute top-0 left-10 text-3xl text-[#10B981]/50"
              animate={{
                y: [0, -15, 0],
                rotate: [-10, 10, -10],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ?
            </motion.div>
            <motion.div
              className="absolute bottom-10 right-10 text-4xl text-[#10B981]/30"
              animate={{
                y: [0, -20, 0],
                rotate: [10, -10, 10],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              ?
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Looks like you're{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#10B981] to-[#059669]">
                lost in the blockchain
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Don't worry, even the best explorers take wrong turns. Let's get you
            back on track.
          </motion.p>

          <motion.div variants={itemVariants} className="pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#10B981] hover:bg-[#059669] text-black gap-2 group min-w-[200px]"
                asChild
              >
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Go to Homepage
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 min-w-[200px]"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
