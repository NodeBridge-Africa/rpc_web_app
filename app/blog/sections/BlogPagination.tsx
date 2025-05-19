"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  setPage,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const handleGoToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-12">
      <div className="flex justify-center items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            size="sm"
            variant={page === currentPage ? "default" : "outline"}
            onClick={() => setPage(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          size="sm"
          variant="outline"
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full border border-[#10B981]/30 hover:bg-[#10B981]/10"
        onClick={handleGoToTop}
        aria-label="Go to top"
      >
        <ArrowUp className="h-5 w-5 text-[#10B981]" />
      </Button>
    </div>
  );
}
