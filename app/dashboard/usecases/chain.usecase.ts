import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/lib/types/routes";
import { AdminChainsListResponse } from "@/lib/types/backend.types";

export class ChainUseCase {
  /**
   * Get all available chains for app creation
   */
  async getAvailableChains(): Promise<AdminChainsListResponse> {
    const response = await axiosInstance.get<AdminChainsListResponse>(
      API_ROUTES.ADMIN.CHAINS
    );
    if (!response.data.success) {
      throw new Error("Failed to get available chains");
    }
    return response.data;
  }
}

export const chainUseCase = new ChainUseCase();
