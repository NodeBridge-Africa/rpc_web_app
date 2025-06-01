export const getStatusVariant = (status: string) => {
  switch (status) {
    case "healthy":
    case "available":
      return "default" as const;
    case "unhealthy":
    case "unavailable":
      return "destructive" as const;
    case "degraded":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
};
