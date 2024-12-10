import { useNavigate } from "react-router-dom";
import { AspectRatio } from "../../../common/component/radix/aspect_ratio";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../common/component/radix/avator";
import Entry from "../button/entry";
import { useGetServersServer } from "../../hook/query/use_get_servers_server";
import Skeleton from "react-loading-skeleton";
import { handleTap } from "../../../common/view/main/utils/handle_tap";

export default function ServerCard({
  guildId,
  svIcon,
  isOwner = true,
  serverName = "Riv's Server",
  isRiv = false,
}: ServerCardProps) {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetServersServer({
    serverUnique: guildId,
    isRiv: isRiv,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-start space-y-[1rem]">
        <Skeleton height={"12rem"} width={"22rem"} />
        <div className="flex flex-row justify-between w-full">
          <div>
            <Skeleton width={"7rem"} height={"1.5rem"} />
            <Skeleton width={"5rem"} height={"1.2rem"} />
          </div>
          <Skeleton width={"6rem"} height={"4rem"} />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-white">Error: 서버 정보를 불러올 수 없습니다.</div>
    );
  }

  return (
    <div className="w-[22.1875rem]">
      <div className="relative mb-[0.75rem]">
        <AspectRatio ratio={7 / 4} className="overflow-hidden rounded-[0.4rem]">
          {svIcon ? (
            <img src={svIcon} className="w-full h-full object-cover blur-lg" />
          ) : (
            <div className="bg-gray-03 rounded-[0.4rem] w-full h-full" />
          )}
        </AspectRatio>

        <Avatar className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 size-[6.5625rem] border-[0.15rem] border-[#A9A9A9]">
          <AvatarImage src={svIcon || ""} />
          <AvatarFallback className="text-white bg-gray-03 text-[1.75rem] font-semibold">
            {serverName.slice(0, 1) || "R"}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p className="text-gray-09 font-bold">{serverName}</p>
          <p className="text-gray-06 font-medium">
            {isOwner ? "Owner" : "Member"}
          </p>
        </div>
        <Entry
          isRiv={isRiv}
          onClick={() => {
            // 리브가 있는 서버 - 회의록 관리 페이지 이동
            if (data && isRiv) {
              const id: number = data;
              navigate(`/setup/${id}`);
            }
            // 리브가 없는 서버 - 리브봇 추가 로직
            if (!isRiv) {
              // 리다이렉트 url
              const redirectUrl: string = `${
                import.meta.env.VITE_API_URL
              }/login/oauth2/code/discord`;
              // 리브 봇 추가 url
              const botAddUrl: string = `${
                import.meta.env.VITE_BOT_ADD
              }&guild_id=${guildId}&redirect_uri=${redirectUrl}`;
              // 창 띄우기
              handleTap({ url: botAddUrl });
              // 길드 id 저장하기
              localStorage.setItem("guildId", guildId);
            }
          }}
        />
      </div>
    </div>
  );
}

interface ServerCardProps {
  guildId: string;
  svIcon?: string | null;
  isOwner?: boolean;
  serverName?: string;
  isRiv?: boolean;
}
