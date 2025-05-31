import axiosInstance from '@/lib/api/axios';
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
} from '@/lib/types/backend.types';

const APP_BASE_URL = '/apps';

export class AppUseCase {
  /**
   * Get all user apps with pagination
   */
  async getUserApps(page: number = 1, limit: number = 10): Promise<ListAppsResponse> {
    const response = await axiosInstance.get<ListAppsResponse>(
      `${APP_BASE_URL}?page=${page}&limit=${limit}`
    );
    return response.data;
  }

  /**
   * Get a specific app by ID (includes API key)
   */
  async getUserApp(appId: string): Promise<GetAppResponse> {
    const response = await axiosInstance.get<GetAppResponse>(
      `${APP_BASE_URL}/${appId}`
    );
    return response.data;
  }

  /**
   * Create a new app
   */
  async createApp(appData: CreateAppRequest): Promise<CreateAppResponse> {
    const response = await axiosInstance.post<CreateAppResponse>(
      APP_BASE_URL,
      appData
    );
    return response.data;
  }

  /**
   * Update an existing app
   */
  async updateApp(appId: string, updates: UpdateAppRequest): Promise<UpdateAppResponse> {
    const response = await axiosInstance.put<UpdateAppResponse>(
      `${APP_BASE_URL}/${appId}`,
      updates
    );
    return response.data;
  }

  /**
   * Delete an app
   */
  async deleteApp(appId: string): Promise<DeleteAppResponse> {
    const response = await axiosInstance.delete<DeleteAppResponse>(
      `${APP_BASE_URL}/${appId}`
    );
    return response.data;
  }

  /**
   * Regenerate API key for an app
   */
  async regenerateApiKey(appId: string): Promise<RegenerateKeyResponse> {
    const response = await axiosInstance.post<RegenerateKeyResponse>(
      `${APP_BASE_URL}/${appId}/regenerate-key`
    );
    return response.data;
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<DashboardStatsResponse> {
    const response = await axiosInstance.get<DashboardStatsResponse>(
      `${APP_BASE_URL}/dashboard/stats`
    );
    return response.data;
  }
}

export const appUseCase = new AppUseCase();