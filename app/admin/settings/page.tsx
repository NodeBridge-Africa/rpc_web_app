"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useDefaultSettings,
  useUpdateDefaultSettings,
} from "@/app/admin/hooks/useAdminData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Settings, Save } from "lucide-react";

const settingsSchema = z.object({
  maxRps: z
    .number()
    .min(1, "Must be at least 1")
    .max(1000, "Must be at most 1000"),
  dailyRequestsLimit: z
    .number()
    .min(1000, "Must be at least 1000")
    .max(10000000, "Must be at most 10,000,000"),
});

type SettingsInput = z.infer<typeof settingsSchema>;

export default function AdminSettingsPage() {
  const { data: settings, isLoading } = useDefaultSettings();
  const { mutate: updateSettings, isPending } = useUpdateDefaultSettings();

  const form = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      maxRps: settings?.maxRps || 0,
      dailyRequestsLimit: settings?.dailyRequestsLimit || 0,
    },
    values: settings
      ? {
          maxRps: settings.maxRps,
          dailyRequestsLimit: settings.dailyRequestsLimit,
        }
      : undefined,
  });

  const onSubmit = (data: SettingsInput) => {
    console.log("Submitting settings:", data);
    updateSettings(data);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure default settings for new applications
        </p>
      </div>

      {/* Settings form */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <CardTitle>Default App Settings</CardTitle>
          </div>
          <CardDescription>
            These settings will be applied to all newly created applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-64" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="maxRps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Requests Per Second (RPS)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        The maximum number of requests per second allowed for
                        new applications
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dailyRequestsLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Request Limit</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        The maximum number of requests allowed per day for new
                        applications
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>
                  <Save className="mr-2 h-4 w-4" />
                  {isPending ? "Saving..." : "Save Settings"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>

      {/* Additional settings cards can be added here */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>
            Current system configuration and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">API Version</span>
              <span className="text-sm font-medium">v1.0.0</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Environment</span>
              <span className="text-sm font-medium">Production</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">
                Last Updated
              </span>
              <span className="text-sm font-medium">
                {settings?.updatedAt
                  ? new Date(settings.updatedAt).toLocaleString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
