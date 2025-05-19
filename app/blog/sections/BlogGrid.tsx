"use client";

import { BlogEntry } from "../../../data/blog";
import Link from "next/link";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import Image from "next/image";

interface BlogGridProps {
  entries: BlogEntry[];
  shareId: string | null;
  handleShare: (entry: BlogEntry) => void;
}

export default function BlogGrid({
  entries,
  shareId,
  handleShare,
}: BlogGridProps) {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {entries.map((entry) => (
        <motion.div
          key={entry.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/5 border border-border/20 rounded-lg shadow-lg overflow-hidden flex flex-col"
        >
          {entry.coverImage && (
            <div
              className="h-48 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${entry.coverImage})` }}
            />
          )}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex gap-2 mb-2 flex-wrap items-center">
              <span className="px-2 py-1 rounded bg-[#10B981]/10 text-[#10B981] text-xs font-medium capitalize">
                {entry.type}
              </span>
              <span className="px-2 py-1 rounded bg-[#059669]/10 text-[#059669] text-xs font-medium capitalize">
                {entry.category}
              </span>
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded bg-white/10 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-semibold mb-2">{entry.title}</h2>
            <p className="text-muted-foreground mb-4 flex-1">
              {entry.description}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src={entry.author.avatar}
                alt={entry.author.name}
                width={32}
                height={32}
                className="rounded-full object-cover border border-[#10B981]/30"
              />
              <span className="text-sm text-muted-foreground font-medium">
                {entry.author.name}
              </span>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xs text-muted-foreground">
                {new Date(entry.date).toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <Link
                  href={entry.link}
                  target={entry.link.startsWith("http") ? "_blank" : undefined}
                  className="text-[#10B981] font-medium hover:underline"
                >
                  {entry.type === "workshop" ? "View Workshop" : "Read More"}
                </Link>
                <button
                  className="ml-2 text-muted-foreground hover:text-[#10B981]"
                  onClick={() => handleShare(entry)}
                  title="Share"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            {shareId === entry.id && (
              <span className="text-xs text-green-500 mt-2 block">
                Link copied!
              </span>
            )}
          </div>
        </motion.div>
      ))}
      {entries.length === 0 && (
        <div className="text-center text-muted-foreground mt-16 text-lg col-span-full">
          No blog or workshop found for your search/filter.
        </div>
      )}
    </motion.div>
  );
}
