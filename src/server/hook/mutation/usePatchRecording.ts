import { useMutation } from "@tanstack/react-query";
import { client } from "../../../common/api/backend/client";

// 레코딩 수정(Patch)을 위한 API 요청 훅
export const usePatchRecoding = () => {
  // API 요청 함수
  const patchRecording = async ({
    recodingId,
    title,
    text,
  }: Props): Promise<RespType> => {
    const response = await client<RespType>({
      url: `/recoding/${recodingId}`,
      method: "patch",
      data: {
        title,
        text,
      },
    });
    return response.data;
  };
  return useMutation({
    mutationFn: patchRecording,
  });
};

// 함수 파라미터 타입
interface Props {
  recodingId: number;
  title: string;
  text: string;
}

// 응답 타입 정의
interface RespType {
  status: number;
  code: string;
  message: string;
  data: {
    recodingId: number;
    updatedAt: string;
  };
}
