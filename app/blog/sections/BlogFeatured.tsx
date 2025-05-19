"use client";

import { BlogEntry } from "../../../data/blog";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogFeaturedProps {
  featured: BlogEntry;
}

export default function BlogFeatured({ featured }: BlogFeaturedProps) {
  return (
    <section className="mb-16">
      <motion.div
        className="relative rounded-xl overflow-hidden shadow-lg bg-white/10 border border-[#10B981]/20 flex flex-col md:flex-row"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {featured.coverImage && (
          <div
            className="md:w-1/2 h-64 md:h-auto bg-cover bg-center"
            style={{ backgroundImage: `url(${featured.coverImage})` }}
          />
        )}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] text-xs font-bold uppercase">
              Featured
            </span>
            <span className="px-2 py-1 rounded bg-[#10B981]/10 text-[#10B981] text-xs font-medium capitalize">
              {featured.type}
            </span>
            {featured.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded bg-white/10 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {featured.title}
          </h2>
          <p className="text-muted-foreground mb-4 text-lg">
            {featured.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs text-muted-foreground">
              {new Date(featured.date).toLocaleDateString()}
            </span>
            <Link
              href={featured.link}
              target={featured.link.startsWith("http") ? "_blank" : undefined}
              className="bg-[#10B981] hover:bg-[#059669] text-black font-semibold px-6 py-2 rounded shadow transition-colors"
            >
              {featured.type === "workshop" ? "View Workshop" : "Read More"}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
