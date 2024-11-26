import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  requireAuth?: boolean;
}

export const discordClient = axios.create({
  baseURL: import.meta.env.DISCORD_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

discordClient.interceptors.request.use(
  (config: CustomInternalAxiosRequestConfig) => {
    if (config.requireAuth && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

discordClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    console.log(error.response.data);
    if (error.response) {
      console.error("Response error:", error.response.status);

      /* 액세스 토큰 만료 시 로직 처리 */
      if (error.response.data.code === "TOKEN_003") {
        localStorage.clear();
        window.location.href = "/";
      }
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export const discordClientAuth = <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return discordClient({
    ...config,
    requireAuth: true,
  } as CustomInternalAxiosRequestConfig);
};