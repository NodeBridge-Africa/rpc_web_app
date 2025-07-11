import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from 'next/image';

interface NetworkStatusCardProps {
  name: string;
  logo: string;
  status: string;
  statusColor: string;
  chain: string;
  className?: string;
}

export function NetworkStatusCard({
  name,
  logo,
  status,
  statusColor,
  chain,
  className,
}: NetworkStatusCardProps) {
  return (
    <Card className={cn("hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-100/16 flex items-center justify-center">
          <Image
      src={logo}
      alt={`${name} logo`}
      width={36}
      height={36}
      className="object-contain"
       />
    </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">{chain}</p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "px-3 py-1",
            statusColor === "green" && "border-green-500 text-green-400",
            statusColor === "blue" && "border-blue-500 text-blue-400",
            statusColor === "yellow" && "border-yellow-500 text-yellow-400"
          )}
        >
          {status}
          <span className="ml-2 relative flex h-2 w-2">
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                statusColor === "green" && "bg-green-400",
                statusColor === "blue" && "bg-blue-400",
                statusColor === "yellow" && "bg-yellow-400"
              )}
            ></span>
            <span
              className={cn(
                "relative inline-flex rounded-full h-2 w-2",
                statusColor === "green" && "bg-green-500",
                statusColor === "blue" && "bg-blue-500",
                statusColor === "yellow" && "bg-yellow-500"
              )}
            ></span>
          </span>
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Latency</div>
            <div className="font-medium">~40ms</div>
          </div>
          <div>
            <div className="text-muted-foreground">Uptime</div>
            <div className="font-medium">99.99%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}