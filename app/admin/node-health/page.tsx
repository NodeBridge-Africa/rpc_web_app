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
  Server,
  Wifi,
  WifiOff,
} from "lucide-react";
import { getStatusVariant } from "../lib/utils";

export default function AdminNodeHealthPage() {
  const { data: nodeHealth, isLoading } = useNodeHealth();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
      case "available":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "unhealthy":
      case "unavailable":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatSyncStatus = (syncing: any) => {
    if (syncing === false) return "Synced";
    if (syncing === true) return "Syncing";
    if (syncing === "unknown") return "Unknown";
    if (typeof syncing === "object" && syncing !== null) {
      return "Syncing";
    }
    return "Unknown";
  };

  const formatHexToNumber = (hex: string) => {
    if (!hex || hex === "0x0") return "0";
    return parseInt(hex, 16).toLocaleString();
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
                    {getStatusIcon(node?.overall)}
                    <div>
                      <CardTitle className="capitalize">{node.chain}</CardTitle>
                      <CardDescription>
                        Last updated:{" "}
                        {new Date(node.timestamp).toLocaleTimeString()}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(node?.overall)}>
                    {node?.overall?.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Execution Layer */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4" />
                        <span className="font-medium">Execution Layer</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {node?.execution?.availableNodes}/
                          {node?.execution?.totalNodes} nodes available
                        </span>
                        <Badge
                          variant={getStatusVariant(node?.execution?.status)}
                        >
                          {node?.execution?.status}
                        </Badge>
                      </div>
                    </div>

                    {node?.execution?.nodes &&
                      node.execution.nodes.length > 0 && (
                        <div className="grid gap-3 ml-6">
                          {node.execution.nodes.map((execNode) => (
                            <Card
                              key={execNode.nodeIndex}
                              className="border-l-4 border-l-primary/20"
                            >
                              <CardContent className="pt-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <Server className="h-4 w-4 text-muted-foreground" />
                                      <code className="text-xs">
                                        {execNode.nodeUrl}
                                      </code>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {execNode.status === "available" ? (
                                        <Wifi className="h-4 w-4 text-green-600" />
                                      ) : (
                                        <WifiOff className="h-4 w-4 text-red-600" />
                                      )}
                                      <Badge
                                        variant={getStatusVariant(
                                          execNode.status
                                        )}
                                      >
                                        {execNode.status}
                                      </Badge>
                                    </div>
                                  </div>

                                  {execNode.syncing &&
                                    typeof execNode.syncing === "object" && (
                                      <div className="mt-2 p-2 bg-muted/50 rounded">
                                        <div className="text-xs space-y-1">
                                          <div>
                                            Current Block:{" "}
                                            {formatHexToNumber(
                                              execNode.syncing.currentBlock
                                            )}
                                          </div>
                                          <div>
                                            Highest Block:{" "}
                                            {formatHexToNumber(
                                              execNode.syncing.highestBlock
                                            )}
                                          </div>
                                          {execNode.syncing.stages &&
                                            execNode.syncing.stages.length >
                                              0 && (
                                              <details className="mt-2">
                                                <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                                                  Sync Stages
                                                </summary>
                                                <div className="mt-1 space-y-0.5">
                                                  {execNode.syncing.stages.map(
                                                    (stage) => (
                                                      <div
                                                        key={stage.name}
                                                        className="flex justify-between"
                                                      >
                                                        <span>
                                                          {stage.name}:
                                                        </span>
                                                        <span className="font-mono">
                                                          {formatHexToNumber(
                                                            stage.block
                                                          )}
                                                        </span>
                                                      </div>
                                                    )
                                                  )}
                                                </div>
                                              </details>
                                            )}
                                        </div>
                                      </div>
                                    )}

                                  {execNode.syncing === false && (
                                    <div className="text-xs text-green-600">
                                      Fully Synced
                                    </div>
                                  )}

                                  {execNode.error && (
                                    <div className="mt-2 p-2 bg-destructive/10 rounded text-xs text-destructive">
                                      {execNode.error}
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                  </div>

                  {/* Consensus Layer */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        <span className="font-medium">Consensus Layer</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {node?.consensus?.availableNodes}/
                          {node?.consensus?.totalNodes} nodes available
                        </span>
                        <Badge
                          variant={getStatusVariant(node?.consensus?.status)}
                        >
                          {node?.consensus?.status}
                        </Badge>
                      </div>
                    </div>

                    {node?.consensus?.nodes &&
                      node.consensus.nodes.length > 0 && (
                        <div className="grid gap-3 ml-6">
                          {node.consensus.nodes.map((consNode) => (
                            <Card
                              key={consNode.nodeIndex}
                              className="border-l-4 border-l-primary/20"
                            >
                              <CardContent className="pt-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <Server className="h-4 w-4 text-muted-foreground" />
                                      <code className="text-xs">
                                        {consNode.nodeUrl}
                                      </code>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {consNode.status === "available" ? (
                                        <Wifi className="h-4 w-4 text-green-600" />
                                      ) : (
                                        <WifiOff className="h-4 w-4 text-red-600" />
                                      )}
                                      <Badge
                                        variant={getStatusVariant(
                                          consNode.status
                                        )}
                                      >
                                        {consNode.status}
                                      </Badge>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">
                                      Sync Status:
                                    </span>
                                    <span
                                      className={
                                        consNode.syncing === false
                                          ? "text-green-600"
                                          : "text-yellow-600"
                                      }
                                    >
                                      {formatSyncStatus(consNode.syncing)}
                                    </span>
                                  </div>

                                  {consNode.head_slot &&
                                    consNode.head_slot !== "unknown" && (
                                      <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">
                                          Head Slot:
                                        </span>
                                        <span className="font-mono">
                                          {consNode.head_slot}
                                        </span>
                                      </div>
                                    )}

                                  {consNode.error && (
                                    <div className="mt-2 p-2 bg-destructive/10 rounded text-xs text-destructive">
                                      {consNode.error}
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                  </div>

                  {/* Metrics/Prometheus */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        <span className="font-medium">Prometheus Metrics</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {node?.metrics?.availableNodes}/
                          {node?.metrics?.totalNodes} nodes available
                        </span>
                        <Badge
                          variant={getStatusVariant(node?.metrics?.status)}
                        >
                          {node?.metrics?.status}
                        </Badge>
                      </div>
                    </div>

                    {node?.metrics?.nodes && node.metrics.nodes.length > 0 && (
                      <div className="grid gap-3 ml-6">
                        {node.metrics.nodes.map((metricNode) => (
                          <Card
                            key={metricNode.nodeIndex}
                            className="border-l-4 border-l-primary/20"
                          >
                            <CardContent className="pt-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Server className="h-4 w-4 text-muted-foreground" />
                                    <code className="text-xs">
                                      {metricNode.nodeUrl}
                                    </code>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {metricNode.status === "available" ? (
                                      <Wifi className="h-4 w-4 text-green-600" />
                                    ) : (
                                      <WifiOff className="h-4 w-4 text-red-600" />
                                    )}
                                    <Badge
                                      variant={getStatusVariant(
                                        metricNode.status
                                      )}
                                    >
                                      {metricNode.status}
                                    </Badge>
                                  </div>
                                </div>

                                {metricNode.error && (
                                  <div className="mt-2 p-2 bg-destructive/10 rounded text-xs text-destructive">
                                    {metricNode.error}
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
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
