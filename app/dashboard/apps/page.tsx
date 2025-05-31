"use client";

import { useState } from "react";
import { useUserApps, useDeleteApp } from "../hooks/useApps";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AppWindow,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Key,
  Activity,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { AppResponse } from "@/lib/types/backend.types";

export default function UserApps() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, error } = useUserApps(page, limit);
  const { mutate: deleteApp, isPending: isDeleting } = useDeleteApp();

  const apps = data?.data?.apps || [];
  const pagination = data?.data?.pagination;

  const handleDelete = (appId: string) => {
    deleteApp(appId);
  };

  const AppCard = ({ app }: { app: AppResponse }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <AppWindow className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{app.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                {app.description || "No description"}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/apps/${app._id}`}
                  className="flex items-center"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/apps/${app._id}`}
                  className="flex items-center"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/apps/${app._id}`}
                  className="flex items-center"
                >
                  <Key className="mr-2 h-4 w-4" />
                  Manage API Key
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete App
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete App</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{app.name}"? This action
                      cannot be undone. All API keys and data associated with
                      this app will be permanently deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(app._id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      disabled={isDeleting}
                    >
                      Delete App
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Chain:</span>
            <Badge variant="outline">{app.chainName}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status:</span>
            <div className="flex items-center gap-2">
              <Activity
                className={`h-3 w-3 ${
                  app.isActive ? "text-green-500" : "text-red-500"
                }`}
              />
              <span
                className={app.isActive ? "text-green-500" : "text-red-500"}
              >
                {app.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Today's Requests:</span>
              <p className="font-medium">
                {app.dailyRequests.toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Total Requests:</span>
              <p className="font-medium">{app.requests.toLocaleString()}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Max RPS:</span>
              <p className="font-medium">{app.maxRps}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Daily Limit:</span>
              <p className="font-medium">
                {app.dailyRequestsLimit.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Apps</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-destructive">
                Failed to load apps. Please try again.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Apps</h1>
          <p className="text-muted-foreground">
            Manage your blockchain applications and API keys
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/apps/new">
            <Plus className="mr-2 h-4 w-4" />
            Create App
          </Link>
        </Button>
      </div>

      {/* Apps Grid */}
      {isLoading ? (
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : apps.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <AppWindow className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-semibold">No apps yet</h3>
              <p className="mt-1 text-muted-foreground">
                Create your first app to start using the blockchain
                infrastructure.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/dashboard/apps/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First App
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {apps.map((app) => (
              <AppCard key={app._id} app={app} />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {apps.length} of {pagination.totalApps} apps
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={!pagination.hasPrevPage}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={!pagination.hasNextPage}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
