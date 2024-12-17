import { useQuery } from "@tanstack/react-query";
import { client } from "../../../common/api/backend/client";

// 특정 서버에 속한 모든 회의 카테고리를 조회하는 훅
export const useGetServersChannelsIdCategory = ({ channelId }: Props) => {
  const getServerIdChannels = async ({ channelId }: Props) => {
    const response = await client<RespType>({
      url: `/servers/channels/${channelId}/categories`,
      method: "get",
      params: {
        channelId,
      },
    });
    return response.data.data.categories;
  };

  return useQuery({
    queryKey: ["servers-channels-categories", channelId],
    queryFn: () => getServerIdChannels({ channelId }),
  });
};

interface Props {
  channelId: number;
}

interface RespType {
  status: number;
  code: string;
  message: string;
  data: {
    channelId: number;
    categories: string[];
  };
}
