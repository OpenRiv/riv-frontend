import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { usePostServers } from "../../../hook/mutation/usePostServer";

export const useGuildIdListener = () => {
  const [guildId, setGuildId] = useState<string | null>(null);
  const { mutate: postServers } = usePostServers();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { status, message } = event.data;

      if (status === "success") {
        toast.success(message);

        // localStorage에서 guildId 가져오기
        const storedGuildId = localStorage.getItem("guildId");
        setGuildId(storedGuildId); // 상태 업데이트
        localStorage.removeItem("guildId");
      } else if (status === "error") {
        toast.error(message);
      }
    };

    // 메시지 이벤트 리스너 등록
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (guildId) {
      postServers(guildId); // guildId 업데이트 시 서버 요청
    }
  }, [guildId, postServers]);

  return guildId; // guildId 상태 반환 (필요할 경우)
};
