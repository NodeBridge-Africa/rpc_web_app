import React from "react";
import { cn } from "@/lib/utils";

interface NavigationItemProps {
  icon: React.ElementType;
  name: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  icon: Icon,
  name,
  isActive,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full h-12 px-4 rounded-lg text-left transition-all duration-200",
        isActive
          ? "bg-accent/10 text-accent" // Active state from design.json
          : "text-neutral-dark-gray hover:bg-background/5 hover:text-foreground", // Default and hover states
        className
      )}
    >
      <div
        className={cn(
          "p-2 rounded-lg transition-all duration-200",
          isActive ? "bg-accent/10 text-accent" : "text-neutral-dark-gray"
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span className="font-medium">{name}</span>
    </button>
  );
};
