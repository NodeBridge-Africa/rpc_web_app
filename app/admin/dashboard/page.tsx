"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminStats, useNodeHealth } from "@/app/admin/hooks/useAdminData";
import { Users, AppWindow, Network, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStatusVariant } from "../lib/utils";

export default function AdminDashboardPage() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: nodeHealth, isLoading: healthLoading } = useNodeHealth();

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Apps",
      value: stats?.totalApps || 0,
      icon: AppWindow,
      color: "text-green-600",
    },
    {
      title: "Active Chains",
      value: stats?.activeChains || 0,
      icon: Network,
      color: "text-purple-600",
    },
    {
      title: "Total Requests",
      value: stats?.totalRequests || 0,
      icon: Activity,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your NodeBridge RPC infrastructure
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold">
                  {stat.value.toLocaleString()}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Node Health Status */}
      <Card>
        <CardHeader>
          <CardTitle>Node Health Status</CardTitle>
        </CardHeader>
        <CardContent>
          {healthLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {nodeHealth?.map((node) => (
                <div
                  key={node.chain}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium capitalize">{node.chain}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge
                          variant={
                            node.execution.status === "healthy"
                              ? "default"
                              : node.execution.status === "unhealthy"
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          Execution: {node.execution.availableNodes}/
                          {node.execution.totalNodes} nodes
                        </Badge>
                        <Badge
                          variant={
                            node.consensus.status === "healthy"
                              ? "default"
                              : node.consensus.status === "unhealthy"
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          Consensus: {node.consensus.availableNodes}/
                          {node.consensus.totalNodes} nodes
                        </Badge>
                        {node.metrics.totalNodes > 0 && (
                          <Badge
                            variant={getStatusVariant(node?.consensus?.status)}
                          >
                            {node?.consensus?.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      node.overall === "healthy"
                        ? "default"
                        : node.overall === "unhealthy"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {node.overall}
                  </Badge>
                </div>
              ))}
              {(!nodeHealth || nodeHealth.length === 0) && (
                <p className="text-center text-muted-foreground py-8">
                  No chains configured
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <a
              href="/admin/users"
              className="flex items-center gap-2 rounded-lg border p-4 hover:bg-muted transition-colors"
            >
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Manage Users</span>
            </a>
            <a
              href="/admin/apps"
              className="flex items-center gap-2 rounded-lg border p-4 hover:bg-muted transition-colors"
            >
              <AppWindow className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Manage Apps</span>
            </a>
            <a
              href="/admin/chains"
              className="flex items-center gap-2 rounded-lg border p-4 hover:bg-muted transition-colors"
            >
              <Network className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Manage Chains</span>
            </a>
            <a
              href="/admin/settings"
              className="flex items-center gap-2 rounded-lg border p-4 hover:bg-muted transition-colors"
            >
              <Activity className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Default Settings</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
