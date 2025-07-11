import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StyledButtonProps extends ButtonProps {
  buttonType?: "primary" | "secondary" | "ghost";
}

export const StyledButton: React.FC<StyledButtonProps> = ({
  buttonType = "primary",
  className,
  variant,
  ...props
}) => {
  const getButtonStyles = () => {
    switch (buttonType) {
      case "primary":
        return "bg-accent text-accent-foreground hover:bg-accent/90 shadow-button";
      case "secondary":
        return "border-border text-muted-foreground hover:text-foreground hover:bg-accent/5";
      case "ghost":
        return "text-muted-foreground hover:text-foreground hover:bg-accent/5";
      default:
        return "";
    }
  };

  // Set appropriate variant based on buttonType if not explicitly provided
  const buttonVariant =
    variant ||
    (buttonType === "secondary"
      ? "outline"
      : buttonType === "ghost"
      ? "ghost"
      : "default");

  return (
    <Button
      variant={buttonVariant}
      className={cn(getButtonStyles(), className)}
      {...props}
    />
  );
};
