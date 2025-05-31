"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useProfile } from "../hooks/useProfile";
import { useDashboardStats } from "../hooks/useApps";
import {
  useUpdatePassword,
  useUpdateEmail,
  useExportData,
} from "../hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  User,
  Shield,
  Calendar,
  Mail,
  AppWindow,
  BarChart3,
  Settings as SettingsIcon,
  Loader2,
  Download,
  Key,
} from "lucide-react";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required for verification"),
});

type PasswordFormData = z.infer<typeof passwordSchema>;
type EmailFormData = z.infer<typeof emailSchema>;

export default function Settings() {
  const { data: session } = useSession();
  const user = session?.user;
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const { data: statsData, isLoading: statsLoading } = useDashboardStats();

  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  const updatePasswordMutation = useUpdatePassword();
  const updateEmailMutation = useUpdateEmail();
  const exportDataMutation = useExportData();

  const profile = profileData?.data?.user;
  const stats = statsData?.data?.stats;

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: user?.email || "",
      password: "",
    },
  });

  const onPasswordSubmit = (data: PasswordFormData) => {
    updatePasswordMutation.mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          setShowPasswordDialog(false);
          passwordForm.reset();
        },
      }
    );
  };

  const onEmailSubmit = (data: EmailFormData) => {
    updateEmailMutation.mutate(data, {
      onSuccess: () => {
        setShowEmailDialog(false);
        emailForm.reset();
        window.location.reload(); // Reload to update email in session
      },
    });
  };

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
            <Button
              variant="outline"
              onClick={() => setShowPasswordDialog(true)}
            >
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </Button>
            <Button variant="outline" onClick={() => setShowEmailDialog(true)}>
              <Mail className="mr-2 h-4 w-4" />
              Update Email
            </Button>
            <Button
              variant="outline"
              onClick={() => exportDataMutation.mutate()}
              disabled={exportDataMutation.isPending}
            >
              {exportDataMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Export Data
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Keep your account secure by regularly updating your password and
            email.
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

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new password.
            </DialogDescription>
          </DialogHeader>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter current password"
                        {...field}
                        disabled={updatePasswordMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        {...field}
                        disabled={updatePasswordMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        {...field}
                        disabled={updatePasswordMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPasswordDialog(false)}
                  disabled={updatePasswordMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updatePasswordMutation.isPending}
                >
                  {updatePasswordMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Email Change Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Email</DialogTitle>
            <DialogDescription>
              Enter your new email address and your current password for
              verification.
            </DialogDescription>
          </DialogHeader>
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
              className="space-y-4"
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter new email"
                        {...field}
                        disabled={updateEmailMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={emailForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        disabled={updateEmailMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEmailDialog(false)}
                  disabled={updateEmailMutation.isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={updateEmailMutation.isPending}>
                  {updateEmailMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Email"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
