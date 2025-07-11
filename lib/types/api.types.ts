// API Response Types
export interface ApiResponse<T = any> {
  success?: boolean;
  status?: "success" | "error";
  data?: T;
  message?: string;
  error?: string;
}

// User Types
export interface User {
  _id: string;
  email: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// App Types
export interface App {
  _id: string;
  userId: string;
  name: string;
  apiKey?: string; // Optional for security when excluded in listings
  chainName: string;
  isActive: boolean;
  requests: number;
  dailyRequests: number;
  maxRps: number;
  dailyRequestsLimit: number;
  lastResetDate: string;
  createdAt: string;
  updatedAt: string;
}

// Chain Types
export interface Chain {
  _id: string;
  name: string;
  chainId: number;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

// Admin Types
export interface NodeHealthNode {
  nodeIndex: number;
  nodeUrl: string;
  status: "available" | "unavailable";
  error: string | null;
  syncing?:
    | boolean
    | "unknown"
    | {
        startingBlock: string;
        currentBlock: string;
        highestBlock: string;
        warpChunksAmount: string | null;
        warpChunksProcessed: string | null;
        stages: Array<{
          name: string;
          block: string;
        }>;
      };
  head_slot?: string | "unknown";
}

export interface NodeHealthService {
  status: "healthy" | "unhealthy" | "not_configured";
  totalNodes: number;
  availableNodes: number;
  nodes: NodeHealthNode[];
}

export interface NodeHealth {
  chain: string;
  timestamp: string;
  overall: "healthy" | "unhealthy" | "degraded" | "not_configured";
  execution: NodeHealthService;
  consensus: NodeHealthService;
  metrics: NodeHealthService;
}

export interface DefaultAppSettings {
  _id: string;
  maxRps: number;
  dailyRequestsLimit: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalApps: number;
  activeChains: number;
  totalDailyRequests: number;
  totalRequests: number;
}

// Request Types
export interface UpdateUserRequest {
  isActive?: boolean;
  isAdmin?: boolean;
}

export interface UpdateAppRequest {
  isActive?: boolean;
  maxRps?: number;
  dailyRequestsLimit?: number;
}

export interface CreateChainRequest {
  name: string;
  chainId: number;
  isEnabled: boolean;
}

export interface UpdateChainRequest {
  isEnabled?: boolean;
}

export interface UpdateDefaultSettingsRequest {
  maxRps?: number;
  dailyRequestsLimit?: number;
}
