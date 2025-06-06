import { Metadata } from "next";
import GalleryHero from "./sections/GalleryHero";
import GalleryImages from "./sections/GalleryImages";
import GalleryVideos from "./sections/GalleryVideos";

export const metadata: Metadata = {
  title: "Gallery - Nodebridge Africa",
  description: "Explore moments from our events, bootcamps, and workshops across Africa",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <GalleryHero />
      <GalleryImages />
      <GalleryVideos />
    </main>
  );
}