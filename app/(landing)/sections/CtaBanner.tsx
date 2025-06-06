"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="py-24 bg-[#121212]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black via-[#0D0D0D] to-[#121212] border border-border/20 p-10 md:p-16 shadow-xl"
        >
          {/* Background effects */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#10B981]/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#10B981]/20 to-transparent"></div>
          <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#10B981]/20 to-transparent"></div>
          <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#10B981]/20 to-transparent"></div>

          {/* Glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-[#10B981]/5 rounded-full blur-[120px]"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to build on robust African infrastructure?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join developers across Africa who are building the future of Web3
              with reliable, low-latency infrastructure.
            </p>
            <Button
              size="lg"
              className="bg-[#10B981] hover:bg-[#059669] text-black font-medium text-base gap-2 group"
              asChild
            >
              <Link href="/auth/register">
                Get Your Free RPC Key
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
