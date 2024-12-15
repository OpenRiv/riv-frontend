import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postOauth2Token } from "../../../api/discord/post/post_oauth2_token";
import { usePostServers } from "../../../../server/hook/mutation/usePostServer";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// redirectUrl으로부터 code 값을 리스닝하는 훅입니다.
export function useCodeListener() {
  const navigate = useNavigate();
  const { mutate } = usePostServers();
  const queryClient = useQueryClient();

  useEffect(() => {
    // localStorage에 guildId 값이 있으면 useEffect 실행하지 않음
    const guildId = localStorage.getItem("guildId");

    console.log("봇 추가 로직0");

    if (guildId) {
      console.log("봇 추가 로직1, guildId:", guildId);
      mutate(guildId, {
        onSuccess: () => {
          console.log("봇 추가 로직2");
          navigate("/server");
          queryClient.invalidateQueries({
            queryKey: ["userGuilds"],
          });
          toast.success("리브가 성공적으로 추가되었습니다.");
          console.log("봇 추가 로직3");
        },
        onError: () => {
          toast.error("에러가 발생했습니다.");
        },
      });
      localStorage.removeItem("guildId");
      console.log("봇 추가 로직4");
      return;
    }

    const handleAuthCode = (event: MessageEvent) => {
      const allowedOrigins = [
        "http://localhost:5173", // 로컬 개발 환경
        "https://riv-frontend.vercel.app", // 배포된 환경
        "https://www.riv-discord.online", // 도메인
      ];

      // 메시지의 origin이 허용된 목록에 있는지 확인
      if (!allowedOrigins.includes(event.origin)) {
        console.error(`${event.origin}은 허용되지 않은 origin입니다.`);
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
        console.error("AccessToken 가져오기 실패:", e);
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener("message", handleAuthCode);

    // 이벤트 리스너 정리
    return () => {
      window.removeEventListener("message", handleAuthCode);
    };
  }, [navigate]);
}
