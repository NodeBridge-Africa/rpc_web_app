import axiosInstance from '@/lib/api/axios';
import { API_ROUTES } from '@/lib/types/routes';
import {
  ListAppsResponse,
  CreateAppResponse,
  GetAppResponse,
  UpdateAppResponse,
  DeleteAppResponse,
  RegenerateKeyResponse,
  CreateAppRequest,
  UpdateAppRequest,
  DashboardStatsResponse,
  AppUsageAnalyticsResponse,
  AllAppsUsageAnalyticsResponse,
} from '@/lib/types/backend.types';

export class AppUseCase {
  /**
   * Get all user apps with pagination
   */
  async getUserApps(page: number = 1, limit: number = 10): Promise<ListAppsResponse> {
    const response = await axiosInstance.get<ListAppsResponse>(
      `${API_ROUTES.APPS.LIST}?page=${page}&limit=${limit}`
    );
    return response.data;
  }

  /**
   * Get a specific app by ID (includes API key)
   */
  async getUserApp(appId: string): Promise<GetAppResponse> {
    const response = await axiosInstance.get<GetAppResponse>(
      `${API_ROUTES.APPS.BASE}/${appId}`
    );
    return response.data;
  }

  /**
   * Create a new app
   */
  async createApp(appData: CreateAppRequest): Promise<CreateAppResponse> {
    const response = await axiosInstance.post<CreateAppResponse>(
      API_ROUTES.APPS.CREATE,
      appData
    );
    return response.data;
  }

  /**
   * Update an existing app
   */
  async updateApp(appId: string, updates: UpdateAppRequest): Promise<UpdateAppResponse> {
    const response = await axiosInstance.put<UpdateAppResponse>(
      `${API_ROUTES.APPS.BASE}/${appId}`,
      updates
    );
    return response.data;
  }

  /**
   * Delete an app
   */
  async deleteApp(appId: string): Promise<DeleteAppResponse> {
    const response = await axiosInstance.delete<DeleteAppResponse>(
      `${API_ROUTES.APPS.BASE}/${appId}`
    );
    return response.data;
  }

  /**
   * Regenerate API key for an app
   */
  async regenerateApiKey(appId: string): Promise<RegenerateKeyResponse> {
    const response = await axiosInstance.post<RegenerateKeyResponse>(
      API_ROUTES.APPS.REGENERATE_KEY(appId)
    );
    return response.data;
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<DashboardStatsResponse> {
    const response = await axiosInstance.get<DashboardStatsResponse>(
      `${API_ROUTES.APPS.BASE}/dashboard/stats`
    );
    return response.data;
  }

  /**
   * Get detailed usage analytics for a specific app
   */
  async getAppUsageAnalytics(appId: string): Promise<AppUsageAnalyticsResponse> {
    const response = await axiosInstance.get<AppUsageAnalyticsResponse>(
      API_ROUTES.APPS.APP_USAGE(appId)
    );
    return response.data;
  }

  /**
   * Get aggregated usage analytics for all user's apps
   */
  async getAllAppsUsageAnalytics(): Promise<AllAppsUsageAnalyticsResponse> {
    const response = await axiosInstance.get<AllAppsUsageAnalyticsResponse>(
      API_ROUTES.APPS.ALL_USAGE
    );
    return response.data;
  }
}

export const appUseCase = new AppUseCase();