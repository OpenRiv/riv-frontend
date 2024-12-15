import { useInfiniteQuery } from "@tanstack/react-query";
import { client } from "../../../common/api/backend/client";

export const useGetServerChannelsId = ({
  channelId,
  size = 9,
}: InfiniteProps) => {
  const getServerChannelsId = async ({
    channelId,
    pageParam = 0, // 기본값 설정
    size,
  }: InfiniteQueryProps) => {
    const response = await client<RespType>({
      url: `/servers/channels/${channelId}`,
      method: "get",
      params: {
        page: pageParam,
        size: size,
      },
    });
    return response.data;
  };

  return useInfiniteQuery({
    queryKey: ["servers-channels-channelId", channelId],
    queryFn: ({ pageParam }) =>
      getServerChannelsId({ channelId, pageParam, size }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.last ? undefined : allPages.length; // 다음 페이지 번호 계산
    },
    initialPageParam: 0, // 초기 페이지 설정
    enabled: !!channelId, // channelId가 유효할 때만 활성화
  });
};

interface InfiniteProps {
  channelId: number;
  size?: number;
}

interface InfiniteQueryProps {
  channelId: number;
  pageParam?: number;
  size: number;
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
