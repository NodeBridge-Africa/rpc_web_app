"use client";

import { ReactNode, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { useLogout } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  AppWindow,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { APP_KEYS } from "./hooks/useApps";
import { appUseCase } from "./usecases/app.usecase";
import { NavigationItem, UserAvatar } from "@/components/ui/design-system";

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
    name: "Usage",
    value: "usage",
    icon: BarChart3,
    href: "/dashboard/usage",
  },
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
        queryKey: APP_KEYS.stats(),
        queryFn: () => appUseCase.getDashboardStats(),
        staleTime: 1000 * 60 * 10,
      });

      // Prefetch user apps for overview
      queryClient.prefetchQuery({
        queryKey: APP_KEYS.list(1, 5),
        queryFn: () => appUseCase.getUserApps(1, 5),
        staleTime: 1000 * 60 * 10,
      });

      // Prefetch user apps for apps page
      queryClient.prefetchQuery({
        queryKey: APP_KEYS.list(1, 10),
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

  const handleNavigation = (href: string) => {
    router.push(href);
    setSidebarOpen(false);
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
            "fixed inset-y-0 left-0 z-40 flex flex-col bg-secondary border-r border-borders-primary transition-transform duration-300 ease-in-out lg:translate-x-0",
            "w-[280px]", // Design system sidebar width
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-borders-primary px-6">
            <Logo className="h-8 w-auto" />
            <span className="text-lg font-semibold text-text-primary">
              Dashboard
            </span>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-lg space-y-1">
            {navigation.map((item) => (
              <NavigationItem
                key={item.value}
                icon={item.icon}
                name={item.name}
                isActive={currentTab === item.value}
                onClick={() => handleNavigation(item.href)}
              />
            ))}
          </div>

          {/* User info */}
          <div className="border-t border-borders-primary p-lg">
            <div className="flex items-center gap-3">
              <UserAvatar email={user?.email} size="md" />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-text-primary truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-text-tertiary">User</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-[280px]">
          {/* Top bar */}
          <header className="sticky top-0 z-30 flex h-16 items-center gap-lg border-b border-borders-primary bg-nav-gradient px-lg sm:px-2xl">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-text-secondary hover:text-text-primary hover:bg-accent/10 transition-all duration-200"
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-accent/10 transition-all duration-200"
                >
                  <UserAvatar email={user?.email} size="sm" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-card border-borders-primary shadow-card"
              >
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-text-primary">
                      Account
                    </p>
                    <p className="text-xs leading-none text-text-secondary">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-borders-subtle" />
                <DropdownMenuItem
                  className="cursor-pointer text-text-secondary hover:text-text-primary hover:bg-accent/10 transition-all duration-200"
                  onClick={() => logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          {/* Page content */}
          <main className="flex-1 p-container sm:p-2xl lg:p-3xl bg-background">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
