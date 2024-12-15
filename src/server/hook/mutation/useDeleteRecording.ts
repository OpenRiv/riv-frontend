import { useMutation } from "@tanstack/react-query";
import { client } from "../../../common/api/backend/client";

// 레코딩 삭제를 위한 API 요청 훅
export const useDeleteRecoding = () => {
  // API 요청 함수
  const deleteRecoding = async ({ recodingId }: Props): Promise<RespType> => {
    const response = await client<RespType>({
      url: `/recoding/${recodingId}`,
      method: "delete",
    });
    return response.data;
  };

  // useMutation 정의
  return useMutation({
    mutationFn: deleteRecoding,
  });
};

// 함수 파라미터 타입
interface Props {
  recodingId: number;
}

// 응답 타입 정의
interface RespType {
  status: number;
  code: string;
  message: string;
  data: {
    recodingId: number;
    deletedAt: string;
  };
}
