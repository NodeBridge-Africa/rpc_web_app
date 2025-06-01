import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { appUseCase } from "../usecases/app.usecase";
import { CreateAppRequest, UpdateAppRequest } from "@/lib/types/backend.types";
import { useRouter } from "next/navigation";
// Query Keys
export const APP_KEYS = {
  all: ["apps"] as const,
  lists: () => [...APP_KEYS.all, "list"] as const,
  list: (page: number, limit: number) =>
    [...APP_KEYS.lists(), page, limit] as const,
  details: () => [...APP_KEYS.all, "detail"] as const,
  detail: (id: string) => [...APP_KEYS.details(), id] as const,
  stats: () => [...APP_KEYS.all, "stats"] as const,
};

export const useUserApps = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: APP_KEYS.list(page, limit),
    queryFn: () => appUseCase.getUserApps(page, limit),
  });
};

export const useUserApp = (appId: string) => {
  return useQuery({
    queryKey: APP_KEYS.detail(appId),
    queryFn: () => appUseCase.getUserApp(appId),
    enabled: !!appId,
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: APP_KEYS.stats(),
    queryFn: () => appUseCase.getDashboardStats(),
  });
};

export const useCreateApp = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (appData: CreateAppRequest) => appUseCase.createApp(appData),
    onSuccess: (data) => {
      window.location.href = `/dashboard/apps/${data.data._id}`;
      queryClient.invalidateQueries({ queryKey: APP_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: APP_KEYS.stats() });
      toast({
        title: "Success",
        description: data.message || "App created successfully",
      });
    },
    onError: (error) => {
      console.log("error", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create app",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateApp = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      appId,
      updates,
    }: {
      appId: string;
      updates: UpdateAppRequest;
    }) => appUseCase.updateApp(appId, updates),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: APP_KEYS.lists() });
      queryClient.invalidateQueries({
        queryKey: APP_KEYS.detail(variables.appId),
      });
      toast({
        title: "Success",
        description: data.message,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update app",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteApp = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (appId: string) => appUseCase.deleteApp(appId),
    onSuccess: (data, appId) => {
      queryClient.invalidateQueries({ queryKey: APP_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: APP_KEYS.stats() });
      queryClient.removeQueries({ queryKey: APP_KEYS.detail(appId) });
      toast({
        title: "Success",
        description: data.message || "App deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete app",
        variant: "destructive",
      });
    },
  });
};

export const useRegenerateApiKey = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (appId: string) => appUseCase.regenerateApiKey(appId),
    onSuccess: (data, appId) => {
      queryClient.invalidateQueries({ queryKey: APP_KEYS.detail(appId) });
      toast({
        title: "Success",
        description: data.message,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to regenerate API key",
        variant: "destructive",
      });
    },
  });
};

export const useAppUsageAnalytics = (appId: string) => {
  return useQuery({
    queryKey: [...APP_KEYS.detail(appId), "usage"],
    queryFn: () => appUseCase.getAppUsageAnalytics(appId),
    enabled: !!appId,
  });
};

export const useAllAppsUsageAnalytics = () => {
  return useQuery({
    queryKey: [...APP_KEYS.all, "usage", "all"],
    queryFn: () => appUseCase.getAllAppsUsageAnalytics(),
  });
};
