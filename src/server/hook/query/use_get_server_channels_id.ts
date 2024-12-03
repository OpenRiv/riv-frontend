import { useQuery } from "@tanstack/react-query";
import { client } from "../../../common/api/backend/client";

// 특정 채널의 요약본 텍스트 파일 목록을 페이징 처리하여 조회하는 API 훅
export const useGetServerChannelsId = ({
  channelId,
  page = 0,
  size = 9,
}: Props) => {
  const getServerChannelsId = async ({
    channelId,
    page = 0,
    size = 9,
  }: Props) => {
    const response = await client<RespType>({
      url: `/servers/channels/${channelId}`,
      method: "get",
      params: {
        page: page,
        size: size,
      },
    });
    return response.data;
  };

  return useQuery({
    queryKey: ["servers-channels-channelId", channelId, page, size],
    queryFn: () => getServerChannelsId({ channelId, page, size }),
  });
};

interface Props {
  channelId: number;
  page?: number;
  size?: number;
}

interface RespType {
  status: number;
  code: string;
  message: string;
  data: {
    textInfoList: textInfoList[];
    pages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
  };
}
export interface textInfoList {
  recodingId: number;
  title: string;
  subtext: string;
  createdAt: string;
}
