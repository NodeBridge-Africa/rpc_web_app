// API Routes Configuration
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8888";

export const API_ROUTES = {
  // Auth Routes
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    UPDATE_PASSWORD: "/auth/password",
    UPDATE_EMAIL: "/auth/email",
    EXPORT_DATA: "/auth/export",
  },

  // App Routes
  APPS: {
    BASE: "/apps",
    CREATE: "/apps",
    LIST: "/apps",
    REGENERATE_KEY: (appId: string) => `/apps/${appId}/regenerate-key`,
    APP_USAGE: (appId: string) => `/apps/${appId}/usage`,
    ALL_USAGE: "/apps/usage/all",
  },

  // Admin Routes
  ADMIN: {
    // Node Health
    NODE_HEALTH: "/admin/node-health",
    NODE_HEALTH_BY_CHAIN: (chain: string) => `/admin/node-health/${chain}`,

    // Chain Management
    CHAINS: "/admin/chains",
    CHAIN_BY_ID: (chainId: string) => `/admin/chains/${chainId}`,

    // User Management
    USERS: "/admin/users",
    USER_BY_ID: (userId: string) => `/admin/users/${userId}`,
    USER_UPDATE_LIMITS: (userId: string) => `/admin/users/${userId}/app-limits`,

    // App Management
    APPS: "/admin/apps",
    APP_BY_ID: (appId: string) => `/admin/apps/${appId}`,

    // Default Settings
    DEFAULT_SETTINGS: "/admin/default-app-settings",
  },

  // Proxy Routes (for reference)
  PROXY: {
    EXECUTION: (chain: string, apiKey: string) => `/${chain}/exec/${apiKey}`,
    CONSENSUS: (chain: string, apiKey: string) => `/${chain}/cons/${apiKey}`,
  },

  // Health & Metrics
  HEALTH: "/health",
  METRICS: "/metrics",
} as const;

// Route Groups for NextAuth Middleware
export const PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/",
  "/about",
  "/blog",
  "/privacy",
  "/terms",
  "/sponsor",
] as const;

export const ADMIN_ROUTES = [
  "/admin",
  "/admin/users",
  "/admin/apps",
  "/admin/chains",
  "/admin/settings",
  "/admin/node-health",
] as const;

export const USER_ROUTES = [
  "/dashboard",
  "/dashboard/apps",
  "/dashboard/usage",
  "/dashboard/settings",
] as const;
