"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "../ui/Loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const user = session?.user;

  useEffect(() => {
    if (status === "loading") return; // Don't do anything while loading
    
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated" && user) {
      if (requireAdmin && !user.isAdmin) {
        router.push("/dashboard");
      } else if (!requireAdmin && user.isAdmin) {
        router.push("/admin/dashboard");
      }
    }
  }, [status, user, requireAdmin, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Return null while redirecting
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (requireAdmin && !user.isAdmin) {
    return null;
  }

  return <>{children}</>;
}
