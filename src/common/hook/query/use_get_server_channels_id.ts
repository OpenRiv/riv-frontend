import { useQuery } from "@tanstack/react-query";
import { client } from "../../api/backend/client";

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
  channelId: string;
  page?: number;
  size?: number;
}

interface RespType {
  status: number;
  code: string;
  message: string;
  data: {
    textInfoList: Array<{
      recodingId: number;
      title: string;
      subtext: string;
      createdAt: string;
    }>;
    pages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
  };
}
