import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { getAccessToken, refreshAccessToken } from "./allegro-application-auth";

const allegroApiClient = axios.create({
  baseURL: "https://api.allegro.pl", // Allegro API base URL
});

let isRefreshing = false;
let failedQueue: Array<{
  config: AxiosRequestConfig;
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      if (prom.config.headers) {
        prom.config.headers["Authorization"] = `Bearer ${token}`;
      }
      prom.resolve(allegroApiClient(prom.config));
    }
  });
  failedQueue = [];
};

// Request interceptor to add authorization headers
allegroApiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAccessToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
allegroApiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Check if the error is due to token expiration
    if (error.response?.status === 401) {
      if (isRefreshing) {
        // Queue the request while token is being refreshed
        return new Promise((resolve, reject) => {
          failedQueue.push({ config: originalRequest, resolve, reject });
        });
      }

      //   if (originalRequest) {
      //     originalRequest._retry = true;
      //   }
      isRefreshing = true;

      try {
        const newTokens = await refreshAccessToken();
        processQueue(null, newTokens.accessToken); // Retry all queued requests with new token
        return allegroApiClient(originalRequest); // Retry the original request
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default allegroApiClient;
