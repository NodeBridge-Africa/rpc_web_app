"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GalleryHero() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#10B981]/5 dark:from-[#10B981]/10 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Link href="/" className="inline-block mb-8">
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-[#10B981]/10 dark:hover:bg-[#10B981]/20">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#10B981] to-[#10B981]/80">
            Our Gallery
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the vibrant moments from our workshops, training sessions, and community events. 
            Witness the growth of blockchain education across Africa through our community's journey.
          </p>
          
          <div className="flex flex-wrap gap-8 justify-center mt-8">
            <div className="text-center p-4 rounded-lg bg-[#10B981]/10 dark:bg-[#10B981]/20 border border-[#10B981]/30">
              <div className="text-3xl font-bold text-[#10B981]">500+</div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-[#10B981]/10 dark:bg-[#10B981]/20 border border-[#10B981]/30">
              <div className="text-3xl font-bold text-[#10B981]">20+</div>
              <div className="text-sm text-muted-foreground">Events</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-[#10B981]/10 dark:bg-[#10B981]/20 border border-[#10B981]/30">
              <div className="text-3xl font-bold text-[#10B981]">10+</div>
              <div className="text-sm text-muted-foreground">Cities</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}