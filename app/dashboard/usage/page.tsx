"use client";

import { useState } from "react";
import { useAllAppsUsageAnalytics } from "../hooks/useApps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Activity,
  TrendingUp,
  BarChart3,
  PieChartIcon,
  AlertCircle,
  AppWindow,
} from "lucide-react";
import Link from "next/link";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function UsageAnalyticsPage() {
  const { data, isLoading, error } = useAllAppsUsageAnalytics();
  const [viewType, setViewType] = useState<"overview" | "details">("overview");

  const analytics = data?.data?.analytics;

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Usage Analytics</h1>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
              <p className="mt-2 text-destructive">
                Failed to load analytics data. Please try again.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Usage Analytics</h1>
          <p className="text-muted-foreground">
            Monitor your API usage across all applications
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32 mb-1" />
                <Skeleton className="h-3 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!analytics || analytics.apps.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Usage Analytics</h1>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-semibold">No usage data yet</h3>
              <p className="mt-1 text-muted-foreground">
                Start making API requests to see your usage analytics.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/dashboard/apps">View Your Apps</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { summary, apps } = analytics;

  // Prepare data for charts
  const chainDistribution = apps.reduce((acc, app) => {
    const existing = acc.find((item) => item.name === app.chainName);
    if (existing) {
      existing.value += app.dailyRequests;
    } else {
      acc.push({ name: app.chainName, value: app.dailyRequests });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const topApps = apps.slice(0, 5).map((app) => ({
    name: app.name.length > 20 ? app.name.substring(0, 20) + "..." : app.name,
    requests: app.dailyRequests,
    percentage: app.usagePercentage,
  }));

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Usage Analytics</h1>
        <p className="text-muted-foreground">
          Monitor your API usage across all applications
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Apps</CardTitle>
            <AppWindow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalApps}</div>
            <p className="text-xs text-muted-foreground">
              {summary.activeApps} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Requests
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.dailyRequests.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all apps</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.totalRequests.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Usage</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.totalApps > 0
                ? Math.round(
                    summary.dailyRequests / summary.totalApps
                  ).toLocaleString()
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">Requests per app</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs value={viewType} onValueChange={(v) => setViewType(v as any)}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">App Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Top Apps Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Top Apps by Usage</CardTitle>
              </CardHeader>
              <CardContent>
                {topApps.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topApps}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="requests" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px]">
                    <p className="text-muted-foreground">No data available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Chain Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Usage by Chain</CardTitle>
              </CardHeader>
              <CardContent>
                {chainDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={chainDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chainDistribution.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px]">
                    <p className="text-muted-foreground">No data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>App Usage Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{app.name}</h4>
                        <Badge variant={app.isActive ? "default" : "secondary"}>
                          {app.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">{app.chainName}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Today's Requests:
                          </span>
                          <p className="font-medium">
                            {app.dailyRequests.toLocaleString()} /{" "}
                            {app.dailyLimit.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Total Requests:
                          </span>
                          <p className="font-medium">
                            {app.totalRequests.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Usage:</span>
                          <p className="font-medium">{app.usagePercentage}%</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/dashboard/apps/${app.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <Progress
                        value={app.usagePercentage}
                        className="mt-2 h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
