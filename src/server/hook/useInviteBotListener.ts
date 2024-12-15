import { useQueryClient } from "@tanstack/react-query";
import { usePostServers } from "./mutation/usePostServer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function useInviteBotListener() {
  const { mutate } = usePostServers();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCode = (event: MessageEvent) => {
      const allowedOrigins = [
        "http://localhost:5173", // 로컬 개발 환경
        "https://riv-frontend.vercel.app", // 배포된 환경
        "https://www.riv-discord.online", // 도메인
      ];

      // 메시지의 origin 확인
      if (!allowedOrigins.includes(event.origin)) {
        return;
      }

      // 메시지가 트리거로 작동
      const guildId = localStorage.getItem("guildId");
      if (guildId) {
        mutate(guildId, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["userGuilds"],
            });
            queryClient.invalidateQueries({
              queryKey: ["botInGuild"],
            });
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            toast.success("리브가 성공적으로 추가되었습니다.");
          },
          onError: () => {
            toast.error("에러가 발생했습니다.");
          },
        });
        localStorage.removeItem("guildId");
      }
    };

    // 메시지 이벤트 리스너 등록
    window.addEventListener("message", handleAuthCode);

    // 클린업 함수: 이벤트 리스너 제거
    return () => {
      window.removeEventListener("message", handleAuthCode);
    };
  }, [navigate]);
}
