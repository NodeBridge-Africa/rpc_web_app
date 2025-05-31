"use client";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "../../hooks/useProfile";
import { useDashboardStats } from "../../hooks/useApps";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Shield,
  Calendar,
  Mail,
  AppWindow,
  BarChart3,
  Settings as SettingsIcon,
} from "lucide-react";

export function SettingsTab() {
  const { data: session } = useSession();
  const user = session?.user;
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const { data: statsData, isLoading: statsLoading } = useDashboardStats();

  const profile = profileData?.data?.user;
  const stats = statsData?.data?.stats;

  const InfoCard = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );

  const InfoRow = ({
    icon: Icon,
    label,
    value,
    loading = false,
  }: {
    icon: React.ElementType;
    label: string;
    value: React.ReactNode;
    loading?: boolean;
  }) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      {loading ? (
        <Skeleton className="h-4 w-24" />
      ) : (
        <span className="text-sm font-medium">{value}</span>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Profile Information */}
        <InfoCard title="Profile Information">
          <div className="space-y-1">
            <InfoRow
              icon={Mail}
              label="Email Address"
              value={user?.email}
              loading={profileLoading}
            />
            <Separator />
            <InfoRow
              icon={Shield}
              label="Account Type"
              value={
                <Badge variant={user?.isAdmin ? "default" : "secondary"}>
                  {user?.isAdmin ? "Administrator" : "User"}
                </Badge>
              }
              loading={profileLoading}
            />
            <Separator />
            <InfoRow
              icon={Calendar}
              label="Member Since"
              value={
                profile?.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"
              }
              loading={profileLoading}
            />
          </div>
        </InfoCard>

        {/* Account Statistics */}
        <InfoCard title="Account Statistics">
          <div className="space-y-1">
            <InfoRow
              icon={AppWindow}
              label="Total Apps"
              value={stats?.totalApps || 0}
              loading={statsLoading}
            />
            <Separator />
            <InfoRow
              icon={BarChart3}
              label="Total Requests"
              value={(stats?.totalRequests || 0).toLocaleString()}
              loading={statsLoading}
            />
            <Separator />
            <InfoRow
              icon={SettingsIcon}
              label="App Limit"
              value={`${stats?.totalApps || 0} / ${stats?.maxApps || 5}`}
              loading={statsLoading}
            />
          </div>
        </InfoCard>
      </div>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
          <CardDescription>
            Manage your account security and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button variant="outline" disabled>
              Change Password
            </Button>
            <Button variant="outline" disabled>
              Update Email
            </Button>
            <Button variant="outline" disabled>
              Export Data
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Account management features are coming soon. Contact support for
            assistance.
          </p>
        </CardContent>
      </Card>

      {/* API Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>API Usage Guidelines</CardTitle>
          <CardDescription>
            Important information about using our API services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-medium">Rate Limits</h4>
              <p className="text-muted-foreground">
                Each app has individual rate limits. Check your app settings for
                specific limits.
              </p>
            </div>
            <div>
              <h4 className="font-medium">API Key Security</h4>
              <p className="text-muted-foreground">
                Keep your API keys secure and never expose them in client-side
                code.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Fair Usage</h4>
              <p className="text-muted-foreground">
                Our services are subject to fair usage policies. Excessive usage
                may result in temporary restrictions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
