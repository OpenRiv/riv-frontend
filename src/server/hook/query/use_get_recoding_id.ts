import { useQuery } from "@tanstack/react-query";
import { client } from "../../../common/api/backend/client";

// 특정 recodingId와 channelId로 레코딩 정보를 조회하는 API 훅
export const useGetRecodingId = ({ recodingId }: Props) => {
  const getRecodingId = async ({ recodingId }: Props) => {
    const response = await client<RespType>({
      url: `/recoding/${recodingId}`,
      method: "get",
    });
    return response.data.data;
  };

  return useQuery({
    queryKey: ["get-recoding-id", recodingId],
    queryFn: () => getRecodingId({ recodingId }),
  });
};

interface Props {
  recodingId: number;
}

interface RespType {
  status: number;
  code: string;
  message: string;
  data: {
    recodingId: number;
    title: string;
    text: string;
    createdAt: string;
  };
}
