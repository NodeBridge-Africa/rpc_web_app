"use client";

import { useNodeHealth } from "@/app/admin/hooks/useAdminData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  Cpu,
  Database,
} from "lucide-react";

export default function AdminNodeHealthPage() {
  const { data: nodeHealth, isLoading } = useNodeHealth();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "unhealthy":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "healthy":
        return "default" as const;
      case "unhealthy":
        return "destructive" as const;
      default:
        return "secondary" as const;
    }
  };

  const getLatencyColor = (latency?: number) => {
    if (!latency) return "text-muted-foreground";
    if (latency < 100) return "text-green-600";
    if (latency < 500) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Node Health</h1>
        <p className="text-muted-foreground">
          Monitor the health and performance of your blockchain nodes
        </p>
      </div>

      {/* Auto-refresh indicator */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Activity className="h-4 w-4 animate-pulse" />
        Auto-refreshing every 30 seconds
      </div>

      {/* Node health cards */}
      {isLoading ? (
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6">
          {nodeHealth?.map((node) => (
            <Card key={node.chain}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(node?.status)}
                    <div>
                      <CardTitle>{node.chain}</CardTitle>
                      <CardDescription>
                        Overall Status: {node?.status}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(node?.status)}>
                    {node?.status?.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Execution Node */}
                  {node?.details?.execution && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4" />
                        <span className="font-medium">Execution Node</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Status
                          </span>
                          <Badge
                            variant={getStatusVariant(
                              node?.details?.execution?.status
                            )}
                          >
                            {node?.details?.execution?.status}
                          </Badge>
                        </div>
                        {node?.details?.execution?.latency !== undefined && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Latency
                            </span>
                            <span
                              className={`text-sm font-medium ${getLatencyColor(
                                node?.details?.execution?.latency
                              )}`}
                            >
                              {node?.details?.execution?.latency}ms
                            </span>
                          </div>
                        )}
                        {node?.details?.execution?.error && (
                          <div className="mt-2 p-2 bg-destructive/10 rounded text-xs text-destructive">
                            {node?.details?.execution?.error}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Consensus Node */}
                  {node?.details?.consensus && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        <span className="font-medium">Consensus Node</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Status
                          </span>
                          <Badge
                            variant={getStatusVariant(
                              node?.details?.consensus?.status
                            )}
                          >
                            {node?.details?.consensus?.status}
                          </Badge>
                        </div>
                        {node?.details?.consensus?.latency !== undefined && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Latency
                            </span>
                            <span
                              className={`text-sm font-medium ${getLatencyColor(
                                node?.details?.consensus?.latency
                              )}`}
                            >
                              {node?.details?.consensus?.latency}ms
                            </span>
                          </div>
                        )}
                        {node?.details?.consensus?.error && (
                          <div className="mt-2 p-2 bg-destructive/10 rounded text-xs text-destructive">
                            {node?.details?.consensus?.error}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Prometheus */}
                  {node?.details?.prometheus && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        <span className="font-medium">Prometheus</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Status
                          </span>
                          <Badge
                            variant={getStatusVariant(
                              node?.details?.prometheus?.status
                            )}
                          >
                            {node?.details?.prometheus?.status}
                          </Badge>
                        </div>
                        {node?.details?.prometheus?.latency !== undefined && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Latency
                            </span>
                            <span
                              className={`text-sm font-medium ${getLatencyColor(
                                node?.details?.prometheus?.latency
                              )}`}
                            >
                              {node?.details?.prometheus?.latency}ms
                            </span>
                          </div>
                        )}
                        {node.details.prometheus.error && (
                          <div className="mt-2 p-2 bg-destructive/10 rounded text-xs text-destructive">
                            {node?.details?.prometheus?.error}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          {(!nodeHealth || nodeHealth.length === 0) && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Activity className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">No nodes configured</p>
                <p className="text-sm text-muted-foreground">
                  Configure chains to monitor node health
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
