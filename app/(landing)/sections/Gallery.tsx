"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { galleryImages } from "@/data/gallery";
import { Button } from "@/components/ui/button";
export default function Gallery() {
  return (
    <section className="py-24 bg-gradient-to-b from-background/90 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Past Events & Workshops
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore moments from our recent events, bootcamps, and workshops
            across Africa.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              viewport={{ once: true, margin: "-100px" }}
              className="rounded-lg overflow-hidden shadow-lg bg-white/5 border border-border/20 flex flex-col"
            >
              <div className="relative w-full h-56">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={idx < 2}
                />
              </div>
              <div className="p-4 flex-1 flex items-center justify-center">
                <span className="text-sm text-muted-foreground text-center">
                  {img.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/gallery">
            <Button size="lg" className="group">
              View More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
