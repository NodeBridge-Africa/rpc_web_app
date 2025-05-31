"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import {
  ArrowLeft,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  Edit,
  Trash2,
  Loader2,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  useUserApp,
  useDeleteApp,
  useRegenerateApiKey,
  useAppUsageAnalytics,
} from "@/app/dashboard/hooks/useApps";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AppDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const appId = params.id as string;

  const [showApiKey, setShowApiKey] = useState(false);
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRegenerateDialog, setShowRegenerateDialog] = useState(false);

  const { data: appData, isLoading } = useUserApp(appId);
  const { data: usageData, isLoading: usageLoading } =
    useAppUsageAnalytics(appId);
  const deleteAppMutation = useDeleteApp();
  const regenerateKeyMutation = useRegenerateApiKey();

  const app = appData?.data;
  const usage = usageData?.data?.analytics;

  const copyApiKey = async () => {
    if (!app?.apiKey) return;

    try {
      await navigator.clipboard.writeText(app.apiKey);
      setCopiedApiKey(true);
      toast({
        title: "API key copied",
        description: "The API key has been copied to your clipboard.",
      });
      setTimeout(() => setCopiedApiKey(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the API key manually.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = () => {
    deleteAppMutation.mutate(appId, {
      onSuccess: () => {
        router.push("/dashboard/apps");
      },
    });
  };

  const handleRegenerateKey = () => {
    regenerateKeyMutation.mutate(appId, {
      onSuccess: (data) => {
        setShowRegenerateDialog(false);
        toast({
          title: "API key regenerated",
          description: "Your new API key has been generated successfully.",
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-semibold mb-2">App not found</h2>
        <p className="text-muted-foreground mb-4">
          The app you're looking for doesn't exist or you don't have access to
          it.
        </p>
        <Link href="/dashboard/apps">
          <Button>Back to Apps</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/apps">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{app.name}</h1>
            <p className="text-muted-foreground">
              {app.description || "No description provided"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/apps/${appId}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>App Information</CardTitle>
            <CardDescription>
              Basic information about your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge
                  variant={app.isActive ? "default" : "secondary"}
                  className="mt-1"
                >
                  {app.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Chain</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {app.chainName} (ID: {app.chainId})
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {format(new Date(app.createdAt), "PPP")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {format(new Date(app.updatedAt), "PPP")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
            <CardDescription>
              Request counts and rate limits for your app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Total Requests</p>
                <p className="text-2xl font-bold mt-1">
                  {app.requests.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Today's Requests</p>
                <p className="text-2xl font-bold mt-1">
                  {app.dailyRequests.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Rate Limit</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {app.maxRps} requests/second
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Daily Limit</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {app.dailyRequestsLimit.toLocaleString()} requests/day
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Last Reset</p>
              <p className="text-sm text-muted-foreground mt-1">
                {format(new Date(app.lastResetDate), "PPpp")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Analytics */}
      {usage && (
        <Card>
          <CardHeader>
            <CardTitle>Usage Analytics</CardTitle>
            <CardDescription>
              24-hour request distribution and usage metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Usage Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Daily Usage</span>
                <span className="font-medium">
                  {usage.usage.usagePercentage}% of limit
                </span>
              </div>
              <Progress value={usage.usage.usagePercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {usage.usage.dailyRequests.toLocaleString()} of{" "}
                {usage.usage.dailyLimit.toLocaleString()} requests used today
              </p>
            </div>

            {/* Hourly Chart */}
            {usage.hourlyBreakdown && usage.hourlyBreakdown.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-4">
                  Hourly Request Distribution
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={usage.hourlyBreakdown}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                  >
                    <XAxis
                      dataKey="hour"
                      tickFormatter={(hour) => `${hour}:00`}
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(hour) => `${hour}:00`}
                      formatter={(value) => [value, "Requests"]}
                    />
                    <Bar dataKey="requests" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>API Key</CardTitle>
          <CardDescription>
            Use this key to authenticate your requests
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 font-mono text-sm bg-muted p-3 rounded-md">
              {showApiKey ? app.apiKey : "••••••••••••••••••••••••••••••••"}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={copyApiKey}
              disabled={!app.apiKey}
            >
              {copiedApiKey ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Regenerate API Key</p>
              <p className="text-sm text-muted-foreground">
                This will invalidate your current key
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowRegenerateDialog(true)}
              disabled={regenerateKeyMutation.isPending}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integration</CardTitle>
          <CardDescription>
            How to use your app with the RPC endpoint
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">RPC Endpoint</p>
            <code className="block bg-muted p-3 rounded-md text-sm">
              {`${
                process.env.NEXT_PUBLIC_BACKEND_API_URL
              }/${app.chainName.toLowerCase()}/exec/${
                app.apiKey || "YOUR_API_KEY"
              }`}
            </code>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Example Request</p>
            <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
              {`curl -X POST \\
  ${
    process.env.NEXT_PUBLIC_BACKEND_API_URL
  }/${app.chainName.toLowerCase()}/exec/${app.apiKey || "YOUR_API_KEY"} \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "method": "eth_blockNumber",
    "params": [],
    "id": 1
  }'`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              app "{app.name}" and invalidate its API key.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteAppMutation.isPending}
            >
              {deleteAppMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete App"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Regenerate Key Confirmation Dialog */}
      <AlertDialog
        open={showRegenerateDialog}
        onOpenChange={setShowRegenerateDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Regenerate API Key?</AlertDialogTitle>
            <AlertDialogDescription>
              This will generate a new API key and invalidate your current key.
              Any applications using the current key will stop working.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRegenerateKey}
              disabled={regenerateKeyMutation.isPending}
            >
              {regenerateKeyMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Regenerating...
                </>
              ) : (
                "Regenerate Key"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
