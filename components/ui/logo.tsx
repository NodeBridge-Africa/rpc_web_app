import { Server } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Server className="text-[#059669]" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#059669] rounded-full animate-pulse" />
    </div>
  );
}