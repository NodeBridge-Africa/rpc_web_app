import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/lib/types/routes";
import { AuthLoginResponse, AuthRegisterResponse, AuthMeResponse } from "@/lib/types/backend.types";
import { LoginInput, RegisterInput } from "@/lib/validators/auth.validators";
import { AuthResponse, User } from "@/lib/types/api.types";

export const authUseCase = {
  async login(credentials: LoginInput): Promise<AuthResponse> {
    const { data } = await axiosInstance.post<AuthLoginResponse>(
      API_ROUTES.AUTH.LOGIN,
      credentials
    );

    if (!data.success || !data.data) {
      throw new Error("Login failed");
    }

    // Transform backend response to match frontend types
    return {
      token: data.data.token,
      user: {
        _id: data.data.user.id,
        email: data.data.user.email,
        isAdmin: data.data.user.isAdmin,
        isActive: data.data.user.isActive,
        createdAt: data.data.user.createdAt,
        updatedAt: data.data.user.updatedAt,
      }
    };
  },

  async register(credentials: RegisterInput): Promise<AuthResponse> {
    const { email, password } = credentials; // Omit confirmPassword
    const { data } = await axiosInstance.post<AuthRegisterResponse>(
      API_ROUTES.AUTH.REGISTER,
      { email, password }
    );
    
    if (!data.success || !data.data) {
      throw new Error("Registration failed");
    }

    // Transform backend response to match frontend types
    return {
      token: data.data.token,
      user: {
        _id: data.data.user.id,
        email: data.data.user.email,
        isAdmin: data.data.user.isAdmin,
        isActive: data.data.user.isActive,
        createdAt: data.data.user.createdAt,
        updatedAt: data.data.user.updatedAt,
      }
    };
  },

  async logout(): Promise<void> {
    await axiosInstance.post(API_ROUTES.AUTH.LOGOUT);
  },

  async getMe(): Promise<User> {
    const { data } = await axiosInstance.get<AuthMeResponse>(
      API_ROUTES.AUTH.ME
    );

    if (!data.success || !data.data) {
      throw new Error("Failed to fetch user");
    }

    // Transform backend response to match frontend types
    return {
      _id: data.data.user.id,
      email: data.data.user.email,
      isAdmin: false, // Not returned by /auth/me endpoint
      isActive: data.data.user.isActive,
      createdAt: data.data.user.createdAt,
      updatedAt: data.data.user.updatedAt,
    };
  },
};
