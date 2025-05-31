import axiosInstance from '@/lib/api/axios';
import { API_ROUTES } from '@/lib/types/routes';
import {
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  UpdateEmailRequest,
  UpdateEmailResponse,
  ExportDataResponse,
} from '@/lib/types/backend.types';

export class AuthUseCase {
  /**
   * Update user password
   */
  async updatePassword(data: UpdatePasswordRequest): Promise<UpdatePasswordResponse> {
    const response = await axiosInstance.patch<UpdatePasswordResponse>(
      API_ROUTES.AUTH.UPDATE_PASSWORD,
      data
    );
    return response.data;
  }

  /**
   * Update user email
   */
  async updateEmail(data: UpdateEmailRequest): Promise<UpdateEmailResponse> {
    const response = await axiosInstance.patch<UpdateEmailResponse>(
      API_ROUTES.AUTH.UPDATE_EMAIL,
      data
    );
    return response.data;
  }

  /**
   * Export user data
   */
  async exportUserData(): Promise<ExportDataResponse> {
    const response = await axiosInstance.get<ExportDataResponse>(
      API_ROUTES.AUTH.EXPORT_DATA
    );
    return response.data;
  }
}

export const authUseCase = new AuthUseCase();