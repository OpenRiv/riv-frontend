import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  requireAuth?: boolean;
  requireBotAuth?: boolean;
}

export const discordClient = axios.create({
  baseURL: import.meta.env.VITE_DISCORD_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 인증 요청 인터셉터
discordClient.interceptors.request.use(
  (config: CustomInternalAxiosRequestConfig) => {
    // 사용자 인증
    if (config.requireAuth) {
      const accessToken = localStorage.getItem("accessToken"); // AccessToken 가져오기
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`; // 사용자 Authorization 헤더 추가
      } else {
        console.warn("Access token is missing. Authentication may fail.");
      }
    }

    // 봇 인증
    if (config.requireBotAuth) {
      const botToken = import.meta.env.VITE_BOT_TOKEN; // 봇 토큰 가져오기
      if (botToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bot ${botToken}`; // 봇 Authorization 헤더 추가
      } else {
        console.warn("Bot token is missing. Authentication may fail.");
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

// 인증 요청을 위한 공통 래퍼 함수
const discordClientWithAuth = async <T>(
  config: AxiosRequestConfig,
  requireAuth?: boolean,
  requireBotAuth?: boolean
): Promise<AxiosResponse<T>> => {
  return discordClient({
    ...config,
    requireAuth,
    requireBotAuth,
  } as CustomInternalAxiosRequestConfig);
};

// 사용자 인증 요청을 위한 래퍼 함수
export const discordClientAuth = async <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return discordClientWithAuth(config, true, false);
};

// 봇 인증 요청을 위한 래퍼 함수
export const discordClientBotAuth = async <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return discordClientWithAuth(config, false, true);
};
