import { Server } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center">
        <span className="text-[#10B981] font-bold">N</span>
      </div>{" "}
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#059669] rounded-full animate-pulse" />
    </div>
  );
}
