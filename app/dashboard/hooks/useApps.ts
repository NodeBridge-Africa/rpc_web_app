import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { appUseCase } from "../usecases/app.usecase";
import {
  CreateAppRequest,
  UpdateAppRequest,
  AppResponse,
} from "@/lib/types/backend.types";

// Query Keys
export const APP_KEYS = {
  all: ["apps"] as const,
  lists: (route?: string) => [...APP_KEYS.all, "list", route] as const,
  list: (page: number, limit: number, route?: string) =>
    [...APP_KEYS.lists(route), page, limit] as const,
  details: () => [...APP_KEYS.all, "detail"] as const,
  detail: (id: string) => [...APP_KEYS.details(), id] as const,
  stats: (route?: string) => [...APP_KEYS.all, "stats", route] as const,
};

export const useUserApps = (page: number = 1, limit: number = 10, route?: string) => {
  return useQuery({
    queryKey: APP_KEYS.list(page, limit, route),
    queryFn: () => appUseCase.getUserApps(page, limit),
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useUserApp = (appId: string) => {
  return useQuery({
    queryKey: APP_KEYS.detail(appId),
    queryFn: () => appUseCase.getUserApp(appId),
    enabled: !!appId,
  });
};

export const useDashboardStats = (route?: string) => {
  return useQuery({
    queryKey: APP_KEYS.stats(route),
    queryFn: () => appUseCase.getDashboardStats(),
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useCreateApp = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (appData: CreateAppRequest) => appUseCase.createApp(appData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: APP_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: APP_KEYS.stats() });
      toast({
        title: "Success",
        description: data.data.message,
      });
    },
    onError: (error) => {
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
        description: data.data.message,
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
        description: data.data.message,
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
        description: data.data.message,
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
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useAllAppsUsageAnalytics = () => {
  return useQuery({
    queryKey: [...APP_KEYS.all, "usage", "all"],
    queryFn: () => appUseCase.getAllAppsUsageAnalytics(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
