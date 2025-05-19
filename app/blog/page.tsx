"use client";
import { blogEntries, BlogEntry } from "../../data/blog";
import { useState, useEffect } from "react";
import BlogHero from "./sections/BlogHero";
import BlogFeatured from "./sections/BlogFeatured";
import BlogFilters from "./sections/BlogFilters";
import BlogGrid from "./sections/BlogGrid";
import BlogNewsletter from "./sections/BlogNewsletter";
import BlogPagination from "./sections/BlogPagination";

const uniqueTags = Array.from(new Set(blogEntries.flatMap((e) => e.tags)));
const uniqueTypes = Array.from(new Set(blogEntries.map((e) => e.type)));

// Sort by date descending for featured
const sortedEntries = [...blogEntries].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
const featured = sortedEntries[0];

const PAGE_SIZE = 6;

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = blogEntries.filter((e) => {
    const matchesType = !type || e.type === type;
    const matchesTag = !tag || e.tags.includes(tag);
    const matchesSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesTag && matchesSearch;
  });

  useEffect(() => {
    setPage(1);
  }, [search, type, tag]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleShare = (entry: BlogEntry) => {
    if (navigator.share) {
      navigator.share({
        title: entry.title,
        text: entry.description,
        url: entry.link.startsWith("http")
          ? entry.link
          : window.location.origin + entry.link,
      });
    } else {
      setShareId(entry.id);
      navigator.clipboard.writeText(
        entry.link.startsWith("http")
          ? entry.link
          : window.location.origin + entry.link
      );
      setTimeout(() => setShareId(null), 2000);
    }
  };

  return (
    <>
      <BlogHero />
      <div className="container mx-auto px-4">
        <BlogFeatured featured={featured} />
      </div>
      <section className="py-12 bg-gradient-to-b from-background to-background/90 min-h-screen">
        <div className="container mx-auto px-4">
          <BlogFilters
            search={search}
            setSearch={setSearch}
            type={type}
            setType={setType}
            tag={tag}
            setTag={setTag}
            uniqueTypes={uniqueTypes}
            uniqueTags={uniqueTags}
          />
          <BlogGrid
            entries={paginated}
            shareId={shareId}
            handleShare={handleShare}
          />
          <BlogPagination
            currentPage={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      </section>
      <BlogNewsletter />
    </>
  );
}
