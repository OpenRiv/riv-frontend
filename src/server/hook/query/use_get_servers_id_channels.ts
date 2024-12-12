import { useQuery } from "@tanstack/react-query";
import { client } from "../../../common/api/backend/client";

// 특정 서버에 속한 모든 채널 ID를 조회하는 API 훅
export const useGetServerIdChannels = ({ serverId }: Props) => {
  const getServerIdChannels = async ({ serverId }: Props) => {
    const response = await client<RespType>({
      url: `/servers/${serverId}/channels`,
      method: "get",
      params: {
        serverId,
      },
    });
    return response.data.data.channelList[0];
  };

  return useQuery({
    queryKey: ["servers-id-channels", serverId],
    queryFn: () => getServerIdChannels({ serverId }),
  });
};

interface Props {
  serverId: number;
}

interface RespType {
  status: number;
  code: string;
  message: string;
  data: {
    serverId: number;
    channelList: number[];
  };
}
