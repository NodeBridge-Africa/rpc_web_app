"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { App } from "@/lib/types/api.types";
import { DataTable } from "@/app/admin/components/DataTable";
import { useAdminApps, useUpdateApp } from "@/app/admin/hooks/useAdminData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Settings, Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addSpacesToCamelCase } from "@/lib/utils";

export default function AdminAppsPage() {
  const [page] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading } = useAdminApps({ page, limit });
  const { mutate: updateApp } = useUpdateApp();
  const { toast } = useToast();
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    app?: App;
  }>({ open: false });
  const [formData, setFormData] = useState({
    maxRps: 0,
    dailyRequestsLimit: 0,
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyApiKey = async (apiKey: string) => {
    await navigator.clipboard.writeText(apiKey);
    setCopiedId(apiKey);
    toast({
      title: "API Key copied",
      description: "The API key has been copied to your clipboard.",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEditApp = (app: App) => {
    setFormData({
      maxRps: app.maxRps,
      dailyRequestsLimit: app.dailyRequestsLimit,
    });
    setEditDialog({ open: true, app });
  };

  const handleUpdateApp = () => {
    if (editDialog.app) {
      updateApp({
        appId: editDialog.app._id,
        updates: formData,
      });
      setEditDialog({ open: false });
    }
  };

  const columns: ColumnDef<App>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "chainName",
      header: "Chain",
      cell: ({ row }) => (
        <Badge variant="outline">
          {addSpacesToCamelCase(row.getValue("chainName"))}
        </Badge>
      ),
    },
    {
      accessorKey: "apiKey",
      header: "API Key",
      cell: ({ row }) => {
        const apiKey = row.getValue("apiKey") as string;
        const iscopied = copiedId === apiKey;
        return (
          <div className="flex items-center gap-2">
            <code className="text-xs bg-muted px-2 py-1 rounded">
              {apiKey.substring(0, 8)}...
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleCopyApiKey(apiKey)}
            >
              {iscopied ? (
                <CheckCircle className="h-3 w-3 text-green-600" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        );
      },
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
      accessorKey: "dailyRequests",
      header: "Daily Usage",
      cell: ({ row }) => {
        const app = row.original;
        const percentage = (app.dailyRequests / app.dailyRequestsLimit) * 100;
        return (
          <div className="space-y-1">
            <div className="text-sm">
              {app.dailyRequests.toLocaleString()} /{" "}
              {app.dailyRequestsLimit.toLocaleString()}
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "maxRps",
      header: "Rate Limit",
      cell: ({ row }) => <div>{row.getValue("maxRps")} RPS</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const app = row.original;

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
              <DropdownMenuItem onClick={() => handleEditApp(app)}>
                <Settings className="mr-2 h-4 w-4" />
                Edit Limits
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  updateApp({
                    appId: app._id,
                    updates: { isActive: !app.isActive },
                  })
                }
              >
                {app.isActive ? "Deactivate" : "Activate"} App
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
        <h1 className="text-3xl font-bold tracking-tight">Apps</h1>
        <p className="text-muted-foreground">
          Manage applications and their rate limits
        </p>
      </div>

      {/* Apps table */}
      <DataTable
        columns={columns}
        data={data?.apps || []}
        isLoading={isLoading}
      />

      {/* Edit dialog */}
      <Dialog
        open={editDialog.open}
        onOpenChange={(open) => setEditDialog({ open })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit App Limits</DialogTitle>
            <DialogDescription>
              Update rate limits for {editDialog.app?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="maxRps">Max Requests Per Second</Label>
              <Input
                id="maxRps"
                type="number"
                value={formData.maxRps}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxRps: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dailyLimit">Daily Request Limit</Label>
              <Input
                id="dailyLimit"
                type="number"
                value={formData.dailyRequestsLimit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dailyRequestsLimit: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialog({ open: false })}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateApp}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
