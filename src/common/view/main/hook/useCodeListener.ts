import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Discord API를 통해 accessToken을 가져오는 함수
async function fetchAccessToken(code: string): Promise<string> {
  try {
    const response = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
        client_secret: import.meta.env.VITE_DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code, // code 값
        redirect_uri: import.meta.env.VITE_DISCORD_REDIRECT_URI,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // accessToken 반환
    return response.data.access_token;
  } catch (error) {
    console.error("Failed to fetch access token:", error);
    throw error;
  }
}

// Discord API를 통해 사용자 정보를 가져오는 함수
async function fetchUserInfo(accessToken: string) {
  try {
    const response = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
}

// redirectUrl으로부터 code 값을 리스닝하는 훅
export function useCodeListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCode = async (event: MessageEvent) => {
      const allowedOrigins = [
        "http://localhost:5173", // 로컬 개발 환경
        "https://riv-frontend.vercel.app", // 배포된 환경
      ];

      if (!allowedOrigins.includes(event.origin)) {
        console.error(`Invalid origin: ${event.origin}`);
        return;
      }

      const { authCode } = event.data;

      if (authCode) {
        console.log("Received code:", authCode);

        // 로컬 스토리지에 code 저장
        localStorage.setItem("code", authCode);

        try {
          // Step 1: Fetch accessToken using the code
          const accessToken = await fetchAccessToken(authCode);
          console.log("Received accessToken:", accessToken);

          // Step 2: Fetch user info using the accessToken
          const userInfo = await fetchUserInfo(accessToken);
          console.log("Fetched user info:", userInfo);

          // Step 3: Store accessToken and user info for further use
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));

          // 인증 완료 후 서버 페이지로 이동
          navigate("/server", { replace: true });
        } catch (error) {
          console.error("Error during OAuth process:", error);
        }
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
