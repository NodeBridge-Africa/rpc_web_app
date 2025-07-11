import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  email?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  email,
  size = "md",
  className,
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-8 w-8";
      case "md":
        return "h-10 w-10";
      case "lg":
        return "h-12 w-12";
      default:
        return "h-10 w-10";
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "sm":
        return "text-xs";
      case "md":
        return "text-sm";
      case "lg":
        return "text-base";
      default:
        return "text-sm";
    }
  };

  return (
    <Avatar className={cn(getSizeClasses(), className)}>
      <AvatarFallback
        className={cn("bg-accent/10 text-accent font-medium", getTextSize())}
      >
        {email?.[0]?.toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>
  );
};
