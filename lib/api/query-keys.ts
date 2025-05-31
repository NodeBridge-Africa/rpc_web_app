// Following the effective React Query keys pattern from tkdodo
export const queryKeys = {
  all: ["nodebridge"] as const,
  auth: () => [...queryKeys.all, "auth"] as const,
  authMe: () => [...queryKeys.auth(), "me"] as const,

  apps: () => [...queryKeys.all, "apps"] as const,
  appsList: (filters?: { chainName?: string }) =>
    [...queryKeys.apps(), "list", filters] as const,
  appDetail: (id: string) => [...queryKeys.apps(), "detail", id] as const,

  admin: () => [...queryKeys.all, "admin"] as const,

  // Admin Users
  adminUsers: () => [...queryKeys.admin(), "users"] as const,
  adminUsersList: (filters?: { page?: number; limit?: number }) =>
    [...queryKeys.adminUsers(), "list", filters] as const,
  adminUserDetail: (id: string) =>
    [...queryKeys.adminUsers(), "detail", id] as const,

  // Admin Apps
  adminApps: () => [...queryKeys.admin(), "apps"] as const,
  adminAppsList: (filters?: {
    page?: number;
    limit?: number;
    userId?: string;
  }) => [...queryKeys.adminApps(), "list", filters] as const,
  adminAppDetail: (id: string) =>
    [...queryKeys.adminApps(), "detail", id] as const,

  // Admin Chains
  adminChains: () => [...queryKeys.admin(), "chains"] as const,
  adminChainsList: () => [...queryKeys.adminChains(), "list"] as const,
  adminChainDetail: (id: string) =>
    [...queryKeys.adminChains(), "detail", id] as const,

  // Admin Node Health
  adminNodeHealth: () => [...queryKeys.admin(), "nodeHealth"] as const,
  adminNodeHealthList: () => [...queryKeys.adminNodeHealth(), "list"] as const,
  adminNodeHealthByChain: (chain: string) =>
    [...queryKeys.adminNodeHealth(), "chain", chain] as const,

  // Admin Settings
  adminSettings: () => [...queryKeys.admin(), "settings"] as const,
  adminDefaultSettings: () =>
    [...queryKeys.adminSettings(), "default"] as const,

  // Admin Stats
  adminStats: () => [...queryKeys.admin(), "stats"] as const,
} as const;
