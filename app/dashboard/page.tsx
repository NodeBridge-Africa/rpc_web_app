"use client";

import { useSession } from "next-auth/react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStats } from "./hooks/useApps";
import { useUserApps } from "./hooks/useApps";
import { Skeleton } from "@/components/ui/skeleton";
import { AppWindow, BarChart3, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import {
  StatCard,
  StyledCard,
  StyledButton,
  AppCard,
} from "@/components/ui/design-system";

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const { data: statsData, isLoading: statsLoading } = useDashboardStats();
  const { data: appsData, isLoading: appsLoading } = useUserApps(1, 5);

  const stats = statsData?.data?.stats;
  const recentApps = appsData?.data?.apps || [];

  return (
    <div className="space-y-section">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Dashboard Overview
        </h1>
        <p className="text-text-secondary">Welcome back, {user?.email}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-card grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <StyledCard key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24 bg-muted" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2 bg-muted" />
                <Skeleton className="h-3 w-32 bg-muted" />
              </CardContent>
            </StyledCard>
          ))
        ) : (
          <>
            <StatCard
              title="Total Apps"
              value={stats?.totalApps || 0}
              icon={AppWindow}
              description={`${stats?.maxApps || 5} apps maximum`}
              variant="total-earnings"
            />
            <StatCard
              title="Active Apps"
              value={stats?.activeApps || 0}
              icon={TrendingUp}
              description="Currently running"
              variant="expenses"
            />
            <StatCard
              title="Total Requests"
              value={stats?.totalRequests.toLocaleString() || 0}
              icon={BarChart3}
              description="All time requests"
              variant="goals"
            />
            <StatCard
              title="Today's Requests"
              value={stats?.todaysRequests.toLocaleString() || 0}
              icon={Clock}
              description="Requests today"
              variant="weekly-stats"
            />
          </>
        )}
      </div>

      {/* Quick Actions */}
      <StyledCard>
        <CardHeader>
          <CardTitle className="text-text-primary">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-lg">
          <div className="flex flex-wrap gap-lg">
            <StyledButton buttonType="primary" asChild>
              <Link href="/dashboard/apps/new">Create New App</Link>
            </StyledButton>
            <StyledButton buttonType="secondary" asChild>
              <Link href="/dashboard/apps">View All Apps</Link>
            </StyledButton>
            <StyledButton buttonType="secondary" asChild>
              <Link href="/dashboard/settings">Account Settings</Link>
            </StyledButton>
          </div>
        </CardContent>
      </StyledCard>

      {/* Recent Apps */}
      <StyledCard>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-text-primary">Recent Apps</CardTitle>
            <StyledButton buttonType="ghost" size="sm" asChild>
              <Link href="/dashboard/apps">View all</Link>
            </StyledButton>
          </div>
        </CardHeader>
        <CardContent>
          {appsLoading ? (
            <div className="space-y-lg">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-lg">
                  <Skeleton className="h-12 w-12 rounded-lg bg-muted" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-muted" />
                    <Skeleton className="h-3 w-24 bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentApps.length === 0 ? (
            <div className="text-center py-8">
              <div className="p-lg rounded-xl bg-accent/10 w-fit mx-auto mb-lg">
                <AppWindow className="h-12 w-12 text-accent" />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-text-primary">
                No apps yet
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                Get started by creating your first app.
              </p>
              <div className="mt-2xl">
                <StyledButton buttonType="primary" asChild>
                  <Link href="/dashboard/apps/new">Create App</Link>
                </StyledButton>
              </div>
            </div>
          ) : (
            <div className="space-y-lg">
              {recentApps.map((app) => (
                <AppCard key={app._id} app={app} />
              ))}
            </div>
          )}
        </CardContent>
      </StyledCard>
    </div>
  );
}
