"use client";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
      <span className="inline-block w-12 h-12 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin" />
      <span className="text-[#10B981] text-lg font-semibold animate-pulse">
        Loading...
      </span>
    </div>
  );
}
