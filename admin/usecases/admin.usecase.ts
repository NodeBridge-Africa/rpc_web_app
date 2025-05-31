import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/lib/types/routes";
import {
  ApiResponse,
  User,
  App,
  Chain,
  NodeHealth,
  DefaultAppSettings,
  AdminStats,
  UpdateUserRequest,
  UpdateAppRequest,
  CreateChainRequest,
  UpdateChainRequest,
  UpdateDefaultSettingsRequest,
} from "@/lib/types/api.types";
import {
  AdminSuccessResponse,
  AdminUsersListResponse,
  AdminAppsListResponse,
  AdminChainsListResponse,
  AdminDefaultSettingsResponse,
  NodeHealthResponse,
} from "@/lib/types/backend.types";

export const adminUseCase = {
  // User Management
  async getUsers(params?: {
    page?: number;
    limit?: number;
  }): Promise<{ users: User[]; total: number }> {
    const { data } = await axiosInstance.get<AdminUsersListResponse>(
      API_ROUTES.ADMIN.USERS,
      { params: params || {} }
    );

    if (!data.success || !data.data) {
      throw new Error("Failed to fetch users");
    }

    // Transform backend response to frontend types
    return {
      users: data.data.users.map((user) => ({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
      total: data.data.total,
    };
  },

  async getUserById(userId: string): Promise<User> {
    const { data } = await axiosInstance.get<ApiResponse<User>>(
      API_ROUTES.ADMIN.USER_BY_ID(userId)
    );

    if (data.status !== "success" || !data.data) {
      throw new Error(data.error || "Failed to fetch user");
    }

    return data.data;
  },

  async updateUser(userId: string, updates: UpdateUserRequest): Promise<User> {
    const { data } = await axiosInstance.patch<ApiResponse<User>>(
      API_ROUTES.ADMIN.USER_BY_ID(userId),
      updates
    );

    if (data.status !== "success" || !data.data) {
      throw new Error(data.error || "Failed to update user");
    }

    return data.data;
  },

  async updateUserAppLimits(userId: string, maxApps: number): Promise<void> {
    const { data } = await axiosInstance.patch<ApiResponse>(
      API_ROUTES.ADMIN.USER_UPDATE_LIMITS(userId),
      { maxApps }
    );

    if (data.status !== "success") {
      throw new Error(data.error || "Failed to update user app limits");
    }
  },

  // App Management
  async getApps(params?: {
    page?: number;
    limit?: number;
    userId?: string;
  }): Promise<{ apps: App[]; total: number }> {
    const { data } = await axiosInstance.get<AdminAppsListResponse>(
      API_ROUTES.ADMIN.APPS,
      { params: params || {} }
    );

    if (!data.success || !data.data) {
      throw new Error("Failed to fetch apps");
    }

    // Transform backend response to frontend types
    return {
      apps: data.data.apps.map((app) => ({
        _id: app._id,
        userId: app.userId,
        name: app.name,
        apiKey: app.apiKey,
        chainName: app.chainName,
        isActive: app.isActive,
        requests: app.requests,
        dailyRequests: app.dailyRequests,
        maxRps: app.maxRps,
        dailyRequestsLimit: app.dailyRequestsLimit,
        lastResetDate: app.lastResetDate,
        createdAt: app.createdAt,
        updatedAt: app.updatedAt,
      })),
      total: data.data.total,
    };
  },

  async getAppById(appId: string): Promise<App> {
    const { data } = await axiosInstance.get<ApiResponse<App>>(
      API_ROUTES.ADMIN.APP_BY_ID(appId)
    );

    if (data.status !== "success" || !data.data) {
      throw new Error(data.error || "Failed to fetch app");
    }

    return data.data;
  },

  async updateApp(appId: string, updates: UpdateAppRequest): Promise<App> {
    const { data } = await axiosInstance.patch<ApiResponse<App>>(
      API_ROUTES.ADMIN.APP_BY_ID(appId),
      updates
    );

    if (data.status !== "success" || !data.data) {
      throw new Error(data.error || "Failed to update app");
    }

    return data.data;
  },

  // Chain Management
  async getChains(): Promise<Chain[]> {
    const { data } = await axiosInstance.get<AdminChainsListResponse>(
      API_ROUTES.ADMIN.CHAINS
    );

    if (!data.success || !data.data) {
      throw new Error("Failed to fetch chains");
    }

    // Transform backend response to frontend types
    return data.data.map((chain) => ({
      _id: chain._id,
      name: chain.name,
      chainId: chain.chainId,
      isActive: chain.isEnabled, // Backend uses 'isEnabled', frontend uses 'isActive'
      createdAt: chain.createdAt,
      updatedAt: chain.updatedAt,
    }));
  },

  async getChainById(chainId: string): Promise<Chain> {
    const { data } = await axiosInstance.get<ApiResponse<Chain>>(
      API_ROUTES.ADMIN.CHAIN_BY_ID(chainId)
    );

    if (data.status !== "success" || !data.data) {
      throw new Error(data.error || "Failed to fetch chain");
    }

    return data.data;
  },

  async createChain(chain: CreateChainRequest): Promise<Chain> {
    const { data } = await axiosInstance.post<ApiResponse<Chain>>(
      API_ROUTES.ADMIN.CHAINS,
      chain
    );

    if (data.status !== "success" || !data.data) {
      throw new Error(data.error || "Failed to create chain");
    }

    return data.data;
  },

  async updateChain(
    chainId: string,
    updates: UpdateChainRequest
  ): Promise<Chain> {
    const { data } = await axiosInstance.patch<ApiResponse<Chain>>(
      API_ROUTES.ADMIN.CHAIN_BY_ID(chainId),
      updates
    );

    if (data.status !== "success" || !data.data) {
      throw new Error(data.error || "Failed to update chain");
    }

    return data.data;
  },

  async deleteChain(chainId: string): Promise<void> {
    const { data } = await axiosInstance.delete<ApiResponse>(
      API_ROUTES.ADMIN.CHAIN_BY_ID(chainId)
    );

    if (data.status !== "success") {
      throw new Error(data.error || "Failed to delete chain");
    }
  },

  // Node Health
  async getNodeHealth(): Promise<NodeHealth[]> {
    // Get all chains first, then fetch health for each
    const chains = await this.getChains();

    const healthPromises = chains.map(async (chain) => {
      try {
        return await this.getNodeHealthByChain(chain.name);
      } catch (error) {
        // If health check fails, return unhealthy status
        return {
          chain: chain.name,
          status: "unhealthy" as const,
          details: {
            execution: {
              status: "unhealthy",
              error: "Failed to fetch health data",
            },
            consensus: {
              status: "unhealthy",
              error: "Failed to fetch health data",
            },
          },
        };
      }
    });

    return Promise.all(healthPromises);
  },

  async getNodeHealthByChain(chain: string): Promise<NodeHealth> {
    const { data } = await axiosInstance.get<NodeHealthResponse>(
      API_ROUTES.ADMIN.NODE_HEALTH_BY_CHAIN(chain)
    );

    // Backend returns node health data directly (not wrapped in success/data structure)
    // Transform backend response to frontend types
    return {
      chain: data.chain,
      status: data.overallStatus,
      details: {
        execution: {
          status: data.execution.status,
          latency: undefined, // Backend doesn't provide latency in this format
          error: data.execution.error,
        },
        consensus: {
          status: data.consensus.status,
          latency: undefined, // Backend doesn't provide latency in this format
          error: data.consensus.error,
        },
        prometheus: data.prometheus
          ? {
              status:
                data.prometheus.availableNodes > 0 ? "healthy" : "unhealthy",
              latency: undefined, // Backend doesn't provide latency in this format
            }
          : undefined,
      },
    };
  },

  // Default Settings
  async getDefaultSettings(): Promise<DefaultAppSettings> {
    const { data } = await axiosInstance.get<AdminDefaultSettingsResponse>(
      API_ROUTES.ADMIN.DEFAULT_SETTINGS
    );

    if (!data.success || !data.data) {
      throw new Error("Failed to fetch default settings");
    }

    return data.data;
  },

  async updateDefaultSettings(
    updates: UpdateDefaultSettingsRequest
  ): Promise<DefaultAppSettings> {
    const { data } = await axiosInstance.patch<AdminDefaultSettingsResponse>(
      API_ROUTES.ADMIN.DEFAULT_SETTINGS,
      updates
    );

    if (!data.success || !data.data) {
      throw new Error("Failed to update default settings");
    }

    return data.data;
  },

  // Stats (custom endpoint - not in original API)
  async getAdminStats(): Promise<AdminStats> {
    // This would need to be implemented on the backend
    // For now, we'll aggregate from other endpoints
    const [users, apps, chains] = await Promise.all([
      this.getUsers({ limit: 1 }),
      this.getApps({ limit: 1 }),
      this.getChains(),
    ]);

    return {
      totalUsers: users.total,
      totalApps: apps.total,
      activeChains: chains.filter((c) => c.isActive).length,
      totalRequests: 0, // Would need backend implementation
    };
  },
};
