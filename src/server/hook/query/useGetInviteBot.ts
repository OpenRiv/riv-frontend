import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { client2 } from "../../../common/api/backend2/client";

// useInviteBot 훅
export const useInviteBot = ({
  guildId,
  redirectUrl,
}: Props): UseQueryResult<RespType, Error> => {
  return useQuery<RespType, Error>({
    queryKey: ["inviteBot", guildId, redirectUrl], // 캐싱을 위한 쿼리 키
    queryFn: async () => {
      // 유효성 검사
      if (!guildId || !redirectUrl) {
        throw new Error("guildId와 redirectUrl이 필요합니다.");
      }

      try {
        // API 요청
        const response = await client2.get<RespType>("/invite-bot", {
          params: {
            guildId,
            redirectUri: redirectUrl,
          },
        });

        // 응답 데이터 반환
        return response.data;
      } catch (error: any) {
        // API 요청 실패 시 에러 처리
        throw new Error(
          error.response?.data?.message ||
            "봇 초대 URL을 가져오는 데 실패했습니다."
        );
      }
    },
    enabled: !!guildId && !!redirectUrl, // guildId와 redirectUrl이 없으면 비활성화
    retry: 1, // 요청 실패 시 한 번만 재시도
  });
};

// API 응답 타입 정의
interface RespType {
  redirectUrl: string; // 리디렉션 URL
  message?: string; // 추가 메시지
}

// API 호출 파라미터 타입
interface Props {
  guildId: string;
  redirectUrl: string;
}
