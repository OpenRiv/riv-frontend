import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  requireAuth?: boolean; // 요청 시 인증 필요 여부
}

export const discordClient = axios.create({
  baseURL: import.meta.env.VITE_DISCORD_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

discordClient.interceptors.request.use(
  (config: CustomInternalAxiosRequestConfig) => {
    if (config.requireAuth) {
      const accessToken = localStorage.getItem("accessToken"); // AccessToken 가져오기
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`; // Authorization 헤더 추가
      } else {
        console.warn("Access token is missing. Authentication may fail.");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 처리 및 디버깅
discordClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response; // 성공적인 응답 반환
  },
  (error) => {
    if (error.response) {
      console.error(
        `Response error: ${error.response.status}`,
        error.response.data
      );
    } else if (error.request) {
      console.error("Request error: No response received", error.request);
    } else {
      console.error("Unexpected error:", error.message);
    }
    return Promise.reject(error);
  }
);

// 인증 요청을 위한 래퍼 함수
export const discordClientAuth = async <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return discordClient({
    ...config,
    requireAuth: true,
  } as CustomInternalAxiosRequestConfig);
};
