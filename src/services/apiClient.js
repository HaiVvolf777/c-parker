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

export const getUserByWallet = (walletAddress, options = {}) =>
  apiClient(`/users/wallet/${walletAddress}`, options);

export const getUserStats = (userId, options = {}) =>
  apiClient(`/users/${userId}/stats`, options);


