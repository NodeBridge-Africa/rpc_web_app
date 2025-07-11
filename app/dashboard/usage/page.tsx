"use client";

import { useState } from "react";
import { useAllAppsUsageAnalytics } from "../hooks/useApps";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
import {
  StatCard,
  StyledCard,
  StyledButton,
} from "@/components/ui/design-system";
import { addSpacesToCamelCase } from "@/lib/utils";

const COLORS = ["#1DD1A1", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5"];

export default function UsageAnalyticsPage() {
  const [viewType, setViewType] = useState<"overview" | "details">("overview");
  const { data: analyticsData, isLoading } = useAllAppsUsageAnalytics();

  const apps = analyticsData?.data?.analytics?.apps || [];
  const summary = analyticsData?.data?.analytics?.summary || {
    totalApps: 0,
    activeApps: 0,
    dailyRequests: 0,
    totalRequests: 0,
  };

  // Prepare chart data
  const topApps = apps.slice(0, 5).map((app) => ({
    name: app.name.length > 15 ? app.name.substring(0, 15) + "..." : app.name,
    requests: app.dailyRequests,
  }));

  const chainDistribution = apps.reduce((acc: any[], app) => {
    const existing = acc.find((item) => item.name === app.chainName);
    if (existing) {
      existing.value += app.dailyRequests;
    } else {
      acc.push({
        name: app.chainName,
        value: app.dailyRequests,
      });
    }
    return acc;
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-section">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Usage Analytics
          </h1>
          <p className="text-muted-foreground">
            Monitor your API usage across all applications
          </p>
        </div>

        <div className="grid gap-card md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StyledCard key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24 bg-muted" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2 bg-muted" />
                <Skeleton className="h-3 w-32 bg-muted" />
              </CardContent>
            </StyledCard>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-card space-y-section">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Usage Analytics</h1>
        <p className="text-muted-foreground">
          Monitor your API usage across all applications
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-card grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
        <StatCard
          title="Total Apps"
          value={summary.totalApps}
          icon={AppWindow}
          description={`${summary.activeApps} active`}
          variant="total-earnings"
        />
        <StatCard
          title="Today's Requests"
          value={summary.dailyRequests.toLocaleString()}
          icon={Activity}
          description="Across all apps"
          variant="expenses"
        />
        <StatCard
          title="Total Requests"
          value={summary.totalRequests.toLocaleString()}
          icon={TrendingUp}
          description="All time"
          variant="goals"
        />
        <StatCard
          title="Average Usage"
          value={
            summary.totalApps > 0
              ? Math.round(
                  summary.dailyRequests / summary.totalApps
                ).toLocaleString()
              : 0
          }
          icon={BarChart3}
          description="Requests per app"
          variant="weekly-stats"
        />
      </div>

      {/* Tabs for different views */}
      <Tabs value={viewType} onValueChange={(v) => setViewType(v as any)}>
        <TabsList className="bg-card border-borders-primary">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-accent/10 data-[state=active]:text-accent"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="data-[state=active]:bg-accent/10 data-[state=active]:text-accent"
          >
            App Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-card">
          <div className="grid gap-card md:grid-cols-2">
            {/* Top Apps Chart */}
            <StyledCard className="">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  Top Apps by Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                {topApps.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={topApps}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      barCategoryGap="20%"
                    >
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 12,
                          fill: "hsl(var(--muted-foreground))",
                        }}
                        dy={10}
                        interval={0}
                      />
                      <YAxis hide />
                      <Tooltip
                        cursor={{ fill: "transparent" }}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          color: "hsl(var(--card-foreground))",
                        }}
                      />
                      <Bar
                        dataKey="requests"
                        fill="#1DD1A1"
                        radius={[8, 8, 8, 8]}
                        maxBarSize={60}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px]">
                    <p className="text-muted-foreground">No data available</p>
                  </div>
                )}
              </CardContent>
            </StyledCard>

            {/* Chain Distribution */}
            <StyledCard>
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  Usage by Chain
                </CardTitle>
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
                        fill="hsl(var(--accent-teal))"
                        dataKey="value"
                        stroke="none"
                      >
                        {chainDistribution.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        cursor={{ fill: "transparent" }}
                        contentStyle={{
                          backgroundColor: "gray",
                          border: "",
                          borderRadius: "8px",
                          color: "hsl(var(--card-foreground))",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px]">
                    <p className="text-muted-foreground">No data available</p>
                  </div>
                )}
              </CardContent>
            </StyledCard>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-card">
          <StyledCard>
            <CardHeader>
              <CardTitle className="text-card-foreground">
                App Usage Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-card">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="p-card rounded-lg border border-border hover:border-accent/30 hover:bg-accent/5 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-card-foreground">
                          {app.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="border-border text-muted-foreground"
                          >
                            {addSpacesToCamelCase(app.chainName)}
                          </Badge>
                          <Badge
                            variant={app.isActive ? "default" : "secondary"}
                            className={
                              app.isActive
                                ? "bg-semantic-success text-white"
                                : ""
                            }
                          >
                            {app.isActive ? "Active" : "Inactive"}
                          </Badge>
                          {app.usagePercentage > 80 && (
                            <Badge
                              variant="destructive"
                              className="bg-semantic-warning text-white"
                            >
                              <AlertCircle className="w-3 h-3 mr-1" />
                              High Usage
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Today's Requests:
                        </span>
                        <p className="font-medium text-card-foreground">
                          {app.dailyRequests.toLocaleString()} /{" "}
                          {app.dailyLimit.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Total Requests:
                        </span>
                        <p className="font-medium text-card-foreground">
                          {app.totalRequests.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Usage:</span>
                        <p className="font-medium text-card-foreground">
                          {app.usagePercentage}%
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StyledButton buttonType="secondary" size="sm" asChild>
                          <Link href={`/dashboard/apps/${app.id}`}>
                            View Details
                          </Link>
                        </StyledButton>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div
                        className="bg-accent-teal h-2 rounded-full transition-all duration-200"
                        style={{
                          width: `${Math.min(app.usagePercentage, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </StyledCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
