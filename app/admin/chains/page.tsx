"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Chain } from "@/lib/types/api.types";
import {
  useAdminChains,
  useCreateChain,
  useUpdateChain,
  useDeleteChain,
} from "@/app/admin/hooks/useAdminData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Plus, Network, Trash2, Edit } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const chainSchema = z.object({
  name: z.string().min(1, "Chain name is required"),
  chainId: z.number().min(1, "Chain ID must be positive"),
  isEnabled: z.boolean().default(true),
});

type ChainInput = z.infer<typeof chainSchema>;

export default function AdminChainsPage() {
  const { data: chains, isLoading } = useAdminChains();
  const { mutate: createChain } = useCreateChain();
  const { mutate: updateChain } = useUpdateChain();
  const { mutate: deleteChain } = useDeleteChain();

  const [createDialog, setCreateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<Chain | null>(null);
  const form = useForm<ChainInput>({
    resolver: zodResolver(chainSchema),
    defaultValues: {
      name: "",
      chainId: 1,
      isEnabled: true,
    },
  });

  const handleCreateChain = (data: ChainInput) => {
    createChain(data);
    setCreateDialog(false);
    form.reset();
  };

  const handleToggleActive = (chain: Chain) => {
    updateChain({
      chainId: chain._id,
      updates: { isEnabled: !chain.isEnabled },
    });
  };

  const handleDeleteChain = () => {
    if (deleteDialog) {
      deleteChain(deleteDialog._id);
      setDeleteDialog(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chains</h1>
          <p className="text-muted-foreground">
            Manage supported blockchain networks
          </p>
        </div>
        <Button onClick={() => setCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Chain
        </Button>
      </div>

      {/* Chains grid */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chains?.map((chain) => (
            <Card key={chain._id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    {chain.name}
                  </CardTitle>
                  <Badge variant={chain.isEnabled ? "default" : "secondary"}>
                    {chain.isEnabled ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <CardDescription>Chain ID: {chain.chainId}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={chain.isEnabled}
                      onCheckedChange={() => handleToggleActive(chain)}
                    />
                    <span className="text-sm text-muted-foreground">
                      {chain.isEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteDialog(chain)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {(!chains || chains.length === 0) && (
            <Card className="col-span-full">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Network className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">No chains configured</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Add your first blockchain network to get started
                </p>
                <Button onClick={() => setCreateDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Chain
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Create dialog */}
      <Dialog open={createDialog} onOpenChange={setCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Chain</DialogTitle>
            <DialogDescription>
              Configure a new blockchain network
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateChain)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chain Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ethereum" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chainId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chain ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isEnabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Enable this chain immediately
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setCreateDialog(false);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Chain</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteDialog}
        onOpenChange={() => setDeleteDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chain</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deleteDialog?.name}? This action
              cannot be undone and will affect all apps using this chain.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteChain}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
