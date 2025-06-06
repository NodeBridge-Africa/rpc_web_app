"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Clock } from "lucide-react";
import { galleryVideos } from "@/data/gallery/all-media";
import { Card } from "@/components/ui/card";

export default function GalleryVideos() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gradient-to-b from-background to-[#10B981]/5 dark:to-[#10B981]/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Video Highlights
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Watch the best moments from our workshops and training sessions captured on video
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {galleryVideos.map((video, index) => (
            <motion.div
              key={video.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 border border-[#10B981]/20 hover:border-[#10B981]/40">
                <div
                  className="relative aspect-video"
                  onClick={() => setSelectedVideo(index)}
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#10B981]/90 flex items-center justify-center shadow-lg"
                    >
                      <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3 text-white" />
                    <span className="text-xs text-white">{video.duration}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                  <p className="text-muted-foreground">{video.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedVideo !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative w-full max-w-5xl aspect-video"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  src={galleryVideos[selectedVideo].src}
                  controls
                  autoPlay
                  className="w-full h-full rounded-lg shadow-2xl"
                >
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
