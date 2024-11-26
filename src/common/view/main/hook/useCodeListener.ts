import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postOauth2Token } from "../../../api/discord/get/post_oauth2_token";

// redirectUrl으로부터 code 값을 리스닝하는 훅입니다.
export function useCodeListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCode = (event: MessageEvent) => {
      const allowedOrigins = [
        "http://localhost:5173", // 로컬 개발 환경
        "https://riv-frontend.vercel.app", // 배포된 환경
      ];

      // 메시지의 origin이 허용된 목록에 있는지 확인
      if (!allowedOrigins.includes(event.origin)) {
        console.error(`${event.origin}`);
        return;
      }

      const { authCode } = event.data;

      if (authCode) {
        fetchAccessToken(authCode);
      }
    };

    // AccessToken을 가져오는 비동기 함수
    const fetchAccessToken = async (authCode: string) => {
      try {
        // Code를 사용해 accessToken 요청
        const accessToken = await postOauth2Token(authCode);
        // accessToken 저장
        localStorage.setItem("accessToken", accessToken);
        navigate("/server");
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener("message", handleAuthCode);

    return () => {
      window.removeEventListener("message", handleAuthCode);
    };
  }, [navigate]);
}
