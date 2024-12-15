import { useQuery } from "@tanstack/react-query";
import { client } from "../../../common/api/backend/client";

// 서버의 unique id로 서버 id를 조회하는 API 요청 훅
export const useGetServersServer = ({ serverUnique, isRiv = false }: Props) => {
  const getServerChannelsId = async ({
    serverUnique,
  }: Pick<Props, "serverUnique">) => {
    const response = await client<RespType>({
      url: `/servers/server`,
      method: "get",
      params: {
        serverUnique,
      },
    });
    return response.data.data.serverId;
  };

  return useQuery({
    queryKey: ["servers-server", serverUnique],
    queryFn: () => getServerChannelsId({ serverUnique }),
    enabled: isRiv, // isRiv가 false면 쿼리를 비활성화
  });
};

interface Props {
  serverUnique: string;
  isRiv?: boolean;
}

interface RespType {
  status: number;
  code: string;
  message: string;
  data: {
    serverId: number;
  };
}
