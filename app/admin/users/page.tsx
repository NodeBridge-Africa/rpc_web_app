"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { User } from "@/lib/types/api.types";
import { DataTable } from "@/app/admin/components/DataTable";
import { useAdminUsers, useUpdateUser } from "@/app/admin/hooks/useAdminData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Shield, UserCog } from "lucide-react";
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

export default function AdminUsersPage() {
  const [page] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading } = useAdminUsers({ page, limit });
  const { mutate: updateUser } = useUpdateUser();
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    user?: User;
    action?: "toggleActive" | "toggleAdmin";
  }>({ open: false });

  const handleToggleActive = (user: User) => {
    updateUser({
      userId: user._id,
      updates: { isActive: !user.isActive },
    });
  };

  const handleToggleAdmin = (user: User) => {
    updateUser({
      userId: user._id,
      updates: { isAdmin: !user.isAdmin },
    });
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.getValue("isActive") ? "default" : "secondary"}>
          {row.getValue("isActive") ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      accessorKey: "isAdmin",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant={row.getValue("isAdmin") ? "destructive" : "outline"}>
          {row.getValue("isAdmin") ? "Admin" : "User"}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <div className="text-muted-foreground">
          {format(new Date(row.getValue("createdAt")), "MMM d, yyyy")}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  setConfirmDialog({
                    open: true,
                    user,
                    action: "toggleActive",
                  })
                }
              >
                <UserCog className="mr-2 h-4 w-4" />
                {user.isActive ? "Deactivate" : "Activate"} User
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  setConfirmDialog({
                    open: true,
                    user,
                    action: "toggleAdmin",
                  })
                }
              >
                <Shield className="mr-2 h-4 w-4" />
                {user.isAdmin ? "Remove" : "Grant"} Admin
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Manage user accounts and permissions
        </p>
      </div>

      {/* Users table */}
      <DataTable
        columns={columns}
        data={data?.users || []}
        isLoading={isLoading}
      />

      {/* Confirmation dialog */}
      <AlertDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ open })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.action === "toggleActive" && (
                <>
                  Are you sure you want to{" "}
                  {confirmDialog.user?.isActive ? "deactivate" : "activate"}{" "}
                  this user? They will{" "}
                  {confirmDialog.user?.isActive
                    ? "lose access to their account"
                    : "regain access to their account"}
                  .
                </>
              )}
              {confirmDialog.action === "toggleAdmin" && (
                <>
                  Are you sure you want to{" "}
                  {confirmDialog.user?.isAdmin ? "remove" : "grant"} admin
                  privileges for this user?
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (confirmDialog.user && confirmDialog.action) {
                  if (confirmDialog.action === "toggleActive") {
                    handleToggleActive(confirmDialog.user);
                  } else if (confirmDialog.action === "toggleAdmin") {
                    handleToggleAdmin(confirmDialog.user);
                  }
                }
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
