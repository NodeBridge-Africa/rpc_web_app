"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUpdateApp } from "@/app/dashboard/hooks/useApps";

const editAppSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  description: z
    .string()
    .max(200, "Description must be less than 200 characters")
    .optional(),
});

type EditAppFormData = z.infer<typeof editAppSchema>;

interface EditAppModalProps {
  app: {
    _id: string;
    name: string;
    description?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditAppModal({ app, open, onOpenChange }: EditAppModalProps) {
  const updateAppMutation = useUpdateApp();

  const form = useForm<EditAppFormData>({
    resolver: zodResolver(editAppSchema),
    defaultValues: {
      name: app.name,
      description: app.description || "",
    },
  });

  // Update form values when app prop changes
  useEffect(() => {
    form.reset({
      name: app.name,
      description: app.description || "",
    });
  }, [app, form]);

  const onSubmit = (data: EditAppFormData) => {
    updateAppMutation.mutate(
      {
        appId: app._id,
        updates: data,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
          <DialogDescription>
            Update your application details. Only name and description can be modified.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="My DApp"
                      disabled={updateAppMutation.isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    A unique name for your application
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="A brief description of your application..."
                      rows={3}
                      disabled={updateAppMutation.isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    Help you remember what this app is for
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={updateAppMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateAppMutation.isPending}>
                {updateAppMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Application"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}