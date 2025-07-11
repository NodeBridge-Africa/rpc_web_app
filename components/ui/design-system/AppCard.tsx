import React from "react";
import Link from "next/link";
import { AppWindow } from "lucide-react";
import { cn } from "@/lib/utils";
import { StyledButton } from "./StyledButton";

interface AppCardProps {
  app: {
    _id: string;
    name: string;
    chainName: string;
    dailyRequests: number;
  };
  showViewButton?: boolean;
  className?: string;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  showViewButton = true,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between space-x-4 p-4 rounded-lg border border-border hover:border-accent/30 hover:bg-accent/5 transition-all duration-200",
        className
      )}
    >
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
          <AppWindow className="h-5 w-5 text-accent" />
        </div>
        <div>
          <p className="text-sm font-medium text-card-foreground">{app.name}</p>
          <p className="text-sm text-muted-foreground">
            {app.chainName} • {app.dailyRequests} requests today
          </p>
        </div>
      </div>
      {showViewButton && (
        <StyledButton buttonType="ghost" size="sm" asChild>
          <Link href={`/dashboard/apps/${app._id}`}>View</Link>
        </StyledButton>
      )}
    </div>
  );
};
