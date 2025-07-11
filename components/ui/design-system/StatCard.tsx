import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description: string;
  variant?:
    | "default"
    | "total-earnings"
    | "expenses"
    | "goals"
    | "weekly-stats";
  className?: string;
}

const getGradientClass = (variant: string) => {
  switch (variant) {
    case "total-earnings":
      return "gradient-total-earnings";
    case "expenses":
      return "gradient-expenses";
    case "goals":
      return "gradient-goals";
    case "weekly-stats":
      return "gradient-weekly-stats";
    default:
      return "";
  }
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  variant = "default",
  className,
}) => {
  const isGradient = variant !== "default";

  return (
    <Card
      className={cn(
        " border-border transition-all duration-200 hover:shadow-hover",
        cn(isGradient && getGradientClass(variant)),
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2 sm:p-4 ">
        <CardTitle
          className={cn(
            "text-sm font-medium",
            isGradient ? "text-white" : "text-card-foreground"
          )}
        >
          {title}
        </CardTitle>
        <div
          className={cn(
            "p-2 rounded-lg",
            isGradient ? "bg-white/20" : "bg-accent/10"
          )}
        >
          <Icon
            className={cn("h-5 w-5", isGradient ? "text-white" : "text-accent")}
          />
        </div>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <div
          className={cn(
            "text-2xl font-bold",
            isGradient ? "text-white" : "text-card-foreground"
          )}
        >
          {value}
        </div>
        <p
          className={cn(
            "text-xs mt-1",
            isGradient ? "text-white/80" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
