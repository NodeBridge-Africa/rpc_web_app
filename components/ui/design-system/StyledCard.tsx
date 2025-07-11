import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StyledCardProps extends React.ComponentProps<typeof Card> {
  variant?: "default" | "accent";
}

export const StyledCard: React.FC<StyledCardProps> = ({
  variant = "default",
  className,
  ...props
}) => {
  const getCardStyles = () => {
    switch (variant) {
      case "accent":
        return "bg-card border-border shadow-accent-card hover:shadow-hover";
      case "default":
      default:
        return "bg-card border-border shadow-card hover:shadow-hover";
    }
  };

  return (
    <Card
      className={cn("transition-all duration-200", getCardStyles(), className)}
      {...props}
    />
  );
};
