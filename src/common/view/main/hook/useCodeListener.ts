import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// redirectUrl으로부터 code 값을 리스닝하는 훅입니다.
export function useCodeListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCode = (event: MessageEvent) => {
      // 허용된 origin 목록
      const allowedOrigins = [
        "http://localhost:5173", // 로컬 개발 환경
        "https://riv-frontend.vercel.app", // 배포된 환경
      ];

      // 메시지의 origin이 허용된 목록에 있는지 확인
      if (!allowedOrigins.includes(event.origin)) {
        console.error(`Invalid origin: ${event.origin}`);
        return;
      }

      const { authCode } = event.data;

      if (authCode) {
        // 로컬 스토리지에 저장
        localStorage.setItem("code", authCode);

        // 인증 완료 후 서버 페이지로 이동
        navigate("/server", { replace: true });
      }
    };

    // 메시지 이벤트 리스너 등록
    window.addEventListener("message", handleAuthCode);

    return () => {
      // 리스너 제거
      window.removeEventListener("message", handleAuthCode);
    };
  }, [navigate]);
}
