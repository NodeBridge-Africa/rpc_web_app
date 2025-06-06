"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useCreateApp } from "@/app/dashboard/hooks/useApps";
import { useAvailableChains } from "@/app/dashboard/hooks/useChains";
import { ChainResponse } from "@/lib/types/backend.types";

const createAppSchema = z.object({
  name: z.string().min(3, "App name must be at least 3 characters"),
  description: z.string().optional(),
  chainId: z.string().min(1, "Please select a blockchain network"),
});

type CreateAppFormData = z.infer<typeof createAppSchema>;

export default function CreateAppPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedChain, setSelectedChain] = useState<ChainResponse | null>(
    null
  );

  // Fetch available chains
  const { data: chainsData, isLoading: chainsLoading } = useAvailableChains();

  const availableChains =
    chainsData?.data?.filter((chain) => chain.isEnabled) || [];

  const form = useForm<CreateAppFormData>({
    resolver: zodResolver(createAppSchema),
    defaultValues: {
      name: "",
      description: "",
      chainId: "",
    },
  });

  const createAppMutation = useCreateApp();

  const onSubmit = (data: CreateAppFormData) => {
    if (!selectedChain) {
      toast({
        title: "Error",
        description: "Please select a blockchain network",
        variant: "destructive",
      });
      return;
    }

    createAppMutation.mutate(
      {
        name: data.name,
        description: data.description,
        chainName: selectedChain.name,
        chainId: selectedChain.chainId.toString(),
      },
      {
        onSuccess: (response) => {
          form.reset();
          setSelectedChain(null);
          router.push(`/dashboard/apps/${response.data._id}`);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/apps">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create New App</h1>
          <p className="text-muted-foreground">
            Set up a new application to access blockchain networks
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>App Information</CardTitle>
          <CardDescription>
            Enter the details for your new application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>App Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="My DeFi App"
                        {...field}
                        disabled={createAppMutation.isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose a unique name for your application
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
                        placeholder="A decentralized finance application for..."
                        className="resize-none"
                        {...field}
                        disabled={createAppMutation.isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      Briefly describe what your application does
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="chainId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blockchain Network</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        const chain = availableChains.find(
                          (c) => c._id === value
                        );
                        setSelectedChain(chain || null);
                      }}
                      defaultValue={field.value}
                      disabled={chainsLoading || createAppMutation.isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a blockchain network" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {chainsLoading ? (
                          <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        ) : availableChains.length > 0 ? (
                          availableChains.map((chain) => (
                            <SelectItem key={chain._id} value={chain._id}>
                              {chain.name} (Chain ID: {chain.chainId})
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-4 text-center text-sm text-muted-foreground">
                            No blockchain networks available
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the blockchain network your app will connect to
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard/apps")}
                  disabled={createAppMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createAppMutation.isPending || chainsLoading}
                >
                  {createAppMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create App"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
