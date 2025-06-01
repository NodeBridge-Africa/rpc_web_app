"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDashboardStats } from "./hooks/useApps";
import { useUserApps } from "./hooks/useApps";
import { Skeleton } from "@/components/ui/skeleton";
import { AppWindow, BarChart3, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const { data: statsData, isLoading: statsLoading } = useDashboardStats();
  const { data: appsData, isLoading: appsLoading } = useUserApps(1, 5);

  const stats = statsData?.data?.stats;
  const recentApps = appsData?.data?.apps || [];

  const StatCard = ({
    title,
    value,
    icon: Icon,
    description,
  }: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    description: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">Welcome back, {user?.email}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <StatCard
              title="Total Apps"
              value={stats?.totalApps || 0}
              icon={AppWindow}
              description={`${stats?.maxApps || 5} apps maximum`}
            />
            <StatCard
              title="Active Apps"
              value={stats?.activeApps || 0}
              icon={TrendingUp}
              description="Currently running"
            />
            <StatCard
              title="Total Requests"
              value={stats?.totalRequests || 0}
              icon={BarChart3}
              description="All time requests"
            />
            <StatCard
              title="Today's Requests"
              value={stats?.todaysRequests || 0}
              icon={Clock}
              description="Requests today"
            />
          </>
        )}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/dashboard/apps/new">Create New App</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/apps">View All Apps</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/settings">Account Settings</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Apps */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Apps</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/apps">View all</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {appsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentApps.length === 0 ? (
            <div className="text-center py-8">
              <AppWindow className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">No apps yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get started by creating your first app.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/dashboard/apps/new">Create App</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {recentApps.map((app) => (
                <div
                  key={app._id}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <AppWindow className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{app.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {app.chainName} • {app.dailyRequests} requests today
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/apps/${app._id}`}>View</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
