const DEFAULT_API_BASE_URL = 'http://localhost:5000/api/v1';

const resolveBaseUrl = () => {
  const envUrl = import.meta.env?.VITE_API_BASE_URL;
  if (typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.replace(/\/+$/, '');
  }
  return DEFAULT_API_BASE_URL;
};

const API_BASE_URL = resolveBaseUrl();

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
};

const buildQueryString = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    query.append(key, Array.isArray(value) ? value.join(',') : value);
  });
  const serialized = query.toString();
  return serialized ? `?${serialized}` : '';
};

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

export const apiClient = async (path, options = {}) => {
  const controller = options.signal ? null : new AbortController();
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    signal: options.signal ?? controller?.signal,
  };

  const response = await fetch(`${API_BASE_URL}${path}`, config);
  const payload = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status,
      payload,
    );
  }

  return payload;
};

// ========================
// User endpoints
// ========================

export const getUserByWallet = (walletAddress, options = {}) =>
  apiClient(`/users/wallet/${walletAddress}`, options);

export const getUserById = (userId, options = {}) =>
  apiClient(`/users/${userId}`, options);

export const getUserStats = (userId, options = {}) =>
  apiClient(`/users/${userId}/stats`, options);

export const getUserReferrals = (userId, options = {}) =>
  apiClient(`/users/${userId}/referrals`, options);

export const getUserTeam = (userId, options = {}) =>
  apiClient(`/users/${userId}/team`, options);

export const getUserLevels = (userId, { orbit } = {}, options = {}) => {
  const query = buildQueryString({ orbit });
  return apiClient(`/users/${userId}/levels${query}`, options);
};

export const getUserMatrix = (userId, orbit, level, options = {}) =>
  apiClient(`/users/${userId}/matrix/${orbit}/${level}`, options);

// ========================
// Payment endpoints
// ========================

export const getUserPayments = (userId, params = {}, options = {}) => {
  const query = buildQueryString(params);
  return apiClient(`/payments/user/${userId}${query}`, options);
};

export const getUserEarnedPayments = (userId, params = {}, options = {}) => {
  const query = buildQueryString(params);
  return apiClient(`/payments/user/${userId}/earned${query}`, options);
};

export const getUserMissedPayments = (userId, params = {}, options = {}) => {
  const query = buildQueryString(params);
  return apiClient(`/payments/user/${userId}/missed${query}`, options);
};

export const getPaymentsByLevel = (userId, options = {}) =>
  apiClient(`/payments/user/${userId}/by-level`, options);

export const getUserTotalEarned = (userId, options = {}) =>
  apiClient(`/payments/user/${userId}/total-earned`, options);

export const getUserTotalMissed = (userId, options = {}) =>
  apiClient(`/payments/user/${userId}/total-missed`, options);

// ========================
// Platform statistics
// ========================

export const getPlatformStats = (options = {}) =>
  apiClient('/statistics/platform', options);

export const getLeaderboard = (params = {}, options = {}) => {
  const query = buildQueryString(params);
  return apiClient(`/statistics/leaderboard${query}`, options);
};

export const getRecentUsers = (params = {}, options = {}) => {
  const query = buildQueryString(params);
  return apiClient(`/statistics/recent${query}`, options);
};

// ========================
// Activity feed
// ========================

export const getActivityFeed = (params = {}, options = {}) => {
  const query = buildQueryString(params);
  return apiClient(`/activity/feed${query}`, options);
};