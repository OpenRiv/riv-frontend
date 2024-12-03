import { useMutation } from "@tanstack/react-query";
import { client } from "../../api/backend/client";

// 서버 추가를 위한 커스텀 훅
export const usePostServers = () => {
  // API 요청 함수
  const postServers = async (serverUnique: string): Promise<RespType> => {
    const response = await client<RespType>({
      url: "/servers",
      method: "post",
      data: { serverUnique },
    });
    return response.data;
  };

  // useMutation 정의
  return useMutation({
    mutationFn: postServers,
  });
};

// 응답 타입 정의
interface RespType {
  status: number;
  code: string;
  message: string;
  data: {
    serverId: number;
  };
}
