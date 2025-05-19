"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=600&q=80",
    alt: "Nodebridge event in Lagos",
    caption: "Lagos Bootcamp 2023",
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    alt: "Workshop participants collaborating",
    caption: "Web3 Workshop Collaboration",
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    alt: "Speaker at Nodebridge event",
    caption: "Keynote Speaker Session",
  },
  {
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    alt: "Hands-on blockchain training",
    caption: "Hands-on Blockchain Training",
  },
  {
    src: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80",
    alt: "Group photo at Nodebridge event",
    caption: "Community Group Photo",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    alt: "Panel discussion at workshop",
    caption: "Panel Discussion",
  },
];

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
            Gallery: Past Events & Workshops
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
      </div>
    </section>
  );
}
