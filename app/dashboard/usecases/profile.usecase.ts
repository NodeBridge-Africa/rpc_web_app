import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/lib/types/routes";
import { AuthMeResponse } from "@/lib/types/backend.types";

export class ProfileUseCase {
  /**
   * Get current user profile information
   */
  async getProfile(): Promise<AuthMeResponse> {
    const response = await axiosInstance.get<AuthMeResponse>(
      API_ROUTES.AUTH.ME
    );
    if (!response.data.success) {
      throw new Error("Failed to get profile");
    }
    return response.data;
  }
}

export const profileUseCase = new ProfileUseCase();
