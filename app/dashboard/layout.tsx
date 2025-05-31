"use client";

import { ReactNode, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { useLogout } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  AppWindow,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { APP_KEYS } from "./hooks/useApps";
import { appUseCase } from "./usecases/app.usecase";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  {
    name: "Overview",
    value: "overview",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  { name: "My Apps", value: "apps", icon: AppWindow, href: "/dashboard/apps" },
  {
    name: "Settings",
    value: "settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const { mutate: logout } = useLogout();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const queryClient = useQueryClient();

  // Prefetch data on layout mount to improve navigation performance
  useEffect(() => {
    const prefetchData = async () => {
      // Prefetch dashboard stats for overview
      queryClient.prefetchQuery({
        queryKey: APP_KEYS.stats("overview"),
        queryFn: () => appUseCase.getDashboardStats(),
        staleTime: 1000 * 60 * 10,
      });

      // Prefetch user apps for overview
      queryClient.prefetchQuery({
        queryKey: APP_KEYS.list(1, 5, "overview"),
        queryFn: () => appUseCase.getUserApps(1, 5),
        staleTime: 1000 * 60 * 10,
      });

      // Prefetch user apps for apps page
      queryClient.prefetchQuery({
        queryKey: APP_KEYS.list(1, 10, "apps"),
        queryFn: () => appUseCase.getUserApps(1, 10),
        staleTime: 1000 * 60 * 10,
      });
    };

    if (session?.user) {
      prefetchData();
    }
  }, [session?.user, queryClient]);

  // Determine current tab based on pathname
  const currentTab =
    navigation.find(
      (nav) =>
        pathname === nav.href ||
        (nav.href !== "/dashboard" && pathname.startsWith(nav.href))
    )?.value || "overview";

  const handleTabChange = (value: string) => {
    const nav = navigation.find((n) => n.value === value);
    if (nav) {
      router.push(nav.href);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-card border-r transition-transform duration-300 ease-in-out lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <Logo className="h-8 w-auto" />
            <span className="text-lg font-semibold">Dashboard</span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex-1 p-4">
            <Tabs
              value={currentTab}
              onValueChange={handleTabChange}
              orientation="vertical"
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent gap-1">
                {navigation.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className="flex items-center justify-start gap-3 w-full h-12 px-4 text-left data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* User info */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {user?.email?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{user?.email}</p>
                <p className="text-xs text-muted-foreground">User</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Top bar */}
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            <div className="flex-1" />

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user?.email?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Account</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
