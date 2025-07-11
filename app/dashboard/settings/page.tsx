"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { StyledCard, StyledButton } from "@/components/ui/design-system";

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
    <StyledCard>
      <CardHeader>
        <CardTitle className="text-lg text-text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </StyledCard>
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
        <div className="p-2 rounded-lg bg-accent/10">
          <Icon className="h-4 w-4 text-accent" />
        </div>
        <span className="text-sm text-text-secondary">{label}</span>
      </div>
      {loading ? (
        <Skeleton className="h-4 w-24 bg-muted" />
      ) : (
        <span className="text-sm font-medium text-text-primary">{value}</span>
      )}
    </div>
  );

  return (
    <div className="space-y-section">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Account Settings
        </h1>
        <p className="text-text-secondary">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid gap-card md:grid-cols-1 lg:grid-cols-2">
        {/* Profile Information */}
        <InfoCard title="Profile Information">
          <div className="space-y-1">
            <InfoRow
              icon={Mail}
              label="Email Address"
              value={user?.email}
              loading={profileLoading}
            />
            <Separator className="bg-borders-subtle" />
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
            <Separator className="bg-border" />
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
            <Separator className="bg-border" />
            <InfoRow
              icon={BarChart3}
              label="Total Requests"
              value={(stats?.totalRequests || 0).toLocaleString()}
              loading={statsLoading}
            />
            <Separator className="bg-border" />
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
      <StyledCard>
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Account Actions
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your account security and data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <StyledButton
              buttonType="secondary"
              onClick={() => setShowEmailDialog(true)}
            >
              <Mail className="mr-2 h-4 w-4" />
              Update Email
            </StyledButton>
            <StyledButton
              buttonType="secondary"
              onClick={() => setShowPasswordDialog(true)}
            >
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </StyledButton>
            <StyledButton
              buttonType="secondary"
              onClick={() => exportDataMutation.mutate()}
              disabled={exportDataMutation.isPending}
            >
              {exportDataMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Export Data
            </StyledButton>
          </div>
        </CardContent>
      </StyledCard>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-card-foreground">
              Change Password
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Enter your current password and choose a new one.
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
                    <FormLabel className="text-card-foreground">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter current password"
                        className="bg-input border-border text-foreground"
                        {...field}
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
                    <FormLabel className="text-card-foreground">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        className="bg-input border-border text-foreground"
                        {...field}
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
                    <FormLabel className="text-card-foreground">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        className="bg-input border-border text-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <StyledButton
                  buttonType="ghost"
                  type="button"
                  onClick={() => setShowPasswordDialog(false)}
                >
                  Cancel
                </StyledButton>
                <StyledButton
                  buttonType="primary"
                  type="submit"
                  disabled={updatePasswordMutation.isPending}
                >
                  {updatePasswordMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Password
                </StyledButton>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Email Change Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-card-foreground">
              Update Email
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Enter your new email address and current password for
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
                    <FormLabel className="text-card-foreground">
                      New Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter new email"
                        className="bg-input border-border text-foreground"
                        {...field}
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
                    <FormLabel className="text-card-foreground">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter current password"
                        className="bg-input border-border text-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <StyledButton
                  buttonType="ghost"
                  type="button"
                  onClick={() => setShowEmailDialog(false)}
                >
                  Cancel
                </StyledButton>
                <StyledButton
                  buttonType="primary"
                  type="submit"
                  disabled={updateEmailMutation.isPending}
                >
                  {updateEmailMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Email
                </StyledButton>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
