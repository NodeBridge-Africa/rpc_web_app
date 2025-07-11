"use client";

import { useState } from "react";
import { useUserApps, useDeleteApp } from "../hooks/useApps";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { StyledCard, StyledButton } from "@/components/ui/design-system";
import { addSpacesToCamelCase } from "@/lib/utils";

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
    <StyledCard>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <AppWindow className="h-5 w-5 text-accent" />
            </div>
            <div>
              <CardTitle className="text-lg text-text-primary">
                {app.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-text-secondary">
                {app.description || "No description"}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* <StyledButton buttonType="ghost" size="icon"> */}
              <MoreVertical className="h-4 w-4" />
              {/* </StyledButton> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-card border-borders-primary shadow-card"
            >
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/apps/${app._id}`}
                  className="flex items-center text-text-secondary hover:text-text-primary hover:bg-accent/10 transition-all duration-200"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/apps/${app._id}`}
                  className="flex items-center text-text-secondary hover:text-text-primary hover:bg-accent/10 transition-all duration-200"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/apps/${app._id}`}
                  className="flex items-center text-text-secondary hover:text-text-primary hover:bg-accent/10 transition-all duration-200"
                >
                  <Key className="mr-2 h-4 w-4" />
                  Manage API Key
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-borders-subtle" />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-accent-red focus:text-accent-red hover:bg-accent-red/10"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete App
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-card border-borders-primary">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-text-primary">
                      Delete App
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-text-secondary">
                      Are you sure you want to delete &quot;{app.name}
                      &quot;? This action cannot be undone. All API keys and
                      data associated with this app will be permanently deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-borders-primary text-text-secondary hover:text-text-primary hover:bg-accent/10">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(app._id)}
                      className="bg-accent-red text-white hover:bg-accent-red/90"
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
        <div className="space-y-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Chain:</span>
            <Badge
              variant="outline"
              className="border-borders-primary text-text-secondary"
            >
              {addSpacesToCamelCase(app.chainName)}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Status:</span>
            <div className="flex items-center gap-2">
              <Activity
                className={`h-3 w-3 ${
                  app.isActive ? "text-accent-green" : "text-accent-red"
                }`}
              />
              <span
                className={
                  app.isActive ? "text-accent-green" : "text-accent-red"
                }
              >
                {app.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-lg text-sm">
            <div>
              <span className="text-text-secondary">
                Today&apos;s Requests:
              </span>
              <p className="font-medium text-text-primary">
                {app.dailyRequests.toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-text-secondary">Total Requests:</span>
              <p className="font-medium text-text-primary">
                {app.requests.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-lg text-sm">
            <div>
              <span className="text-text-secondary">Max RPS:</span>
              <p className="font-medium text-text-primary">{app.maxRps}</p>
            </div>
            <div>
              <span className="text-text-secondary">Daily Limit:</span>
              <p className="font-medium text-text-primary">
                {app.dailyRequestsLimit.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </StyledCard>
  );

  if (error) {
    return (
      <div className="space-y-section">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">
            My Apps
          </h1>
        </div>
        <StyledCard>
          <CardContent className="pt-2xl">
            <div className="text-center py-8">
              <div className="p-lg rounded-xl bg-accent-red/10 w-fit mx-auto mb-lg">
                <AppWindow className="h-12 w-12 text-accent-red" />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-text-primary">
                Error Loading Apps
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                There was a problem loading your apps. Please try refreshing the
                page.
              </p>
            </div>
          </CardContent>
        </StyledCard>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-section">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">
            My Apps
          </h1>
          <StyledButton buttonType="primary" asChild>
            <Link href="/dashboard/apps/new">
              <Plus className="mr-2 h-4 w-4" />
              Create App
            </Link>
          </StyledButton>
        </div>

        <div className="grid gap-card md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <StyledCard key={i}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-lg bg-muted" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-muted" />
                    <Skeleton className="h-3 w-24 bg-muted" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full bg-muted" />
                  <Skeleton className="h-3 w-3/4 bg-muted" />
                </div>
              </CardContent>
            </StyledCard>
          ))}
        </div>
      </div>
    );
  }

  if (apps.length === 0) {
    return (
      <div className="space-y-section">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">
            My Apps
          </h1>
          <StyledButton buttonType="primary" asChild>
            <Link href="/dashboard/apps/new">
              <Plus className="mr-2 h-4 w-4" />
              Create App
            </Link>
          </StyledButton>
        </div>

        <StyledCard>
          <CardContent className="pt-2xl">
            <div className="text-center py-8">
              <div className="p-lg rounded-xl bg-accent/10 w-fit mx-auto mb-lg">
                <AppWindow className="h-12 w-12 text-accent" />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-text-primary">
                No apps yet
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                Get started by creating your first app to access blockchain
                networks.
              </p>
              <div className="mt-2xl">
                <StyledButton buttonType="primary" asChild>
                  <Link href="/dashboard/apps/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First App
                  </Link>
                </StyledButton>
              </div>
            </div>
          </CardContent>
        </StyledCard>
      </div>
    );
  }

  return (
    <div className="space-y-section">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          My Apps
        </h1>
        <StyledButton buttonType="primary" asChild>
          <Link href="/dashboard/apps/new">
            <Plus className="mr-2 h-4 w-4" />
            Create App
          </Link>
        </StyledButton>
      </div>

      {/* Apps Grid */}
      <div className="grid gap-card md:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <AppCard key={app._id} app={app} />
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            Showing {apps.length} of {pagination.totalApps} apps
          </p>
          <div className="flex items-center space-x-2">
            <StyledButton
              buttonType="secondary"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={!pagination.hasPrevPage}
            >
              Previous
            </StyledButton>
            <span className="text-sm text-text-secondary">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <StyledButton
              buttonType="secondary"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={!pagination.hasNextPage}
            >
              Next
            </StyledButton>
          </div>
        </div>
      )}
    </div>
  );
}
