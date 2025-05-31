import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { queryKeys } from '@/lib/api/query-keys';
import { adminUseCase } from '@/admin/usecases/admin.usecase';
import {
  UpdateUserRequest,
  UpdateAppRequest,
  CreateChainRequest,
  UpdateChainRequest,
  UpdateDefaultSettingsRequest,
} from '@/lib/types/api.types';

// User hooks
export const useAdminUsers = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: queryKeys.adminUsersList(params),
    queryFn: () => adminUseCase.getUsers(params),
  });
};

export const useAdminUser = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.adminUserDetail(userId),
    queryFn: () => adminUseCase.getUserById(userId),
    enabled: !!userId,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ userId, updates }: { userId: string; updates: UpdateUserRequest }) =>
      adminUseCase.updateUser(userId, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.adminUsers() });
      queryClient.invalidateQueries({ queryKey: queryKeys.adminUserDetail(variables.userId) });
      toast({
        title: 'User updated',
        description: 'User has been updated successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'Failed to update user',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateUserAppLimits = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ userId, maxApps }: { userId: string; maxApps: number }) =>
      adminUseCase.updateUserAppLimits(userId, maxApps),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.adminUserDetail(variables.userId) });
      toast({
        title: 'Limits updated',
        description: 'User app limits have been updated successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'Failed to update limits',
        variant: 'destructive',
      });
    },
  });
};

// App hooks
export const useAdminApps = (params?: { page?: number; limit?: number; userId?: string }) => {
  return useQuery({
    queryKey: queryKeys.adminAppsList(params),
    queryFn: () => adminUseCase.getApps(params),
  });
};

export const useAdminApp = (appId: string) => {
  return useQuery({
    queryKey: queryKeys.adminAppDetail(appId),
    queryFn: () => adminUseCase.getAppById(appId),
    enabled: !!appId,
  });
};

export const useUpdateApp = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ appId, updates }: { appId: string; updates: UpdateAppRequest }) =>
      adminUseCase.updateApp(appId, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.adminApps() });
      queryClient.invalidateQueries({ queryKey: queryKeys.adminAppDetail(variables.appId) });
      toast({
        title: 'App updated',
        description: 'App has been updated successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'Failed to update app',
        variant: 'destructive',
      });
    },
  });
};

// Chain hooks
export const useAdminChains = () => {
  return useQuery({
    queryKey: queryKeys.adminChainsList(),
    queryFn: adminUseCase.getChains,
  });
};

export const useAdminChain = (chainId: string) => {
  return useQuery({
    queryKey: queryKeys.adminChainDetail(chainId),
    queryFn: () => adminUseCase.getChainById(chainId),
    enabled: !!chainId,
  });
};

export const useCreateChain = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: adminUseCase.createChain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.adminChains() });
      toast({
        title: 'Chain created',
        description: 'Chain has been created successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Creation failed',
        description: error instanceof Error ? error.message : 'Failed to create chain',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateChain = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ chainId, updates }: { chainId: string; updates: UpdateChainRequest }) =>
      adminUseCase.updateChain(chainId, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.adminChains() });
      queryClient.invalidateQueries({ queryKey: queryKeys.adminChainDetail(variables.chainId) });
      toast({
        title: 'Chain updated',
        description: 'Chain has been updated successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'Failed to update chain',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteChain = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: adminUseCase.deleteChain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.adminChains() });
      toast({
        title: 'Chain deleted',
        description: 'Chain has been deleted successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Deletion failed',
        description: error instanceof Error ? error.message : 'Failed to delete chain',
        variant: 'destructive',
      });
    },
  });
};

// Node health hooks
export const useNodeHealth = () => {
  return useQuery({
    queryKey: queryKeys.adminNodeHealthList(),
    queryFn: adminUseCase.getNodeHealth,
    refetchInterval: 30000, // Refresh every 30 seconds
  });
};

export const useNodeHealthByChain = (chain: string) => {
  return useQuery({
    queryKey: queryKeys.adminNodeHealthByChain(chain),
    queryFn: () => adminUseCase.getNodeHealthByChain(chain),
    enabled: !!chain,
    refetchInterval: 30000, // Refresh every 30 seconds
  });
};

// Settings hooks
export const useDefaultSettings = () => {
  return useQuery({
    queryKey: queryKeys.adminDefaultSettings(),
    queryFn: adminUseCase.getDefaultSettings,
  });
};

export const useUpdateDefaultSettings = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: adminUseCase.updateDefaultSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.adminDefaultSettings() });
      toast({
        title: 'Settings updated',
        description: 'Default settings have been updated successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'Failed to update settings',
        variant: 'destructive',
      });
    },
  });
};

// Stats hook
export const useAdminStats = () => {
  return useQuery({
    queryKey: queryKeys.adminStats(),
    queryFn: adminUseCase.getAdminStats,
    refetchInterval: 60000, // Refresh every minute
  });
};