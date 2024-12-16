import { useNavigate } from "react-router-dom";
import { AspectRatio } from "../../../common/component/radix/AspectRatio";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../common/component/radix/Avator";
import { handleTap } from "../../../common/view/main/utils/handleTap";
import { useInviteBot } from "../../hook/query/useGetInviteBot";
import Entry from "../button/Entry";

export default function ServerCard({
  guildId,
  svIcon,
  isOwner = true,
  serverName = "Riv's Server",
  isRiv = false,
}: ServerCardProps) {
  const navigate = useNavigate();

  // useInviteBot 훅 호출
  const { data, isError, isLoading } = useInviteBot({
    guildId,
    redirectUrl: `${window.location.origin}/login/oauth2/code/discord`,
  });

  // Entry 버튼 클릭 핸들러
  const handleEntryClick = () => {
    if (isRiv) {
      // 리브가 있는 서버 - 설정 페이지로 이동
      navigate(`/setup/${guildId}`);
      localStorage.setItem("svIcon", svIcon);
      localStorage.setItem("svName", serverName);
    } else {
      // 리브가 없는 서버 - 봇 초대 로직 처리
      if (isLoading) {
        alert("봇 초대 URL을 불러오는 중입니다. 잠시만 기다려주세요.");
        return;
      }
      if (isError || !data?.redirectUrl) {
        alert("봇 초대 URL을 가져오는 중 오류가 발생했습니다.");
        return;
      }
      localStorage.setItem("guildId", guildId); // 길드 ID 저장
      handleTap({ url: data.redirectUrl }); // Discord 봇 초대 URL 열기
    }
  };

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
        <Entry isRiv={isRiv} onClick={handleEntryClick} />
      </div>
    </div>
  );
}

// Props 타입 정의
interface ServerCardProps {
  guildId: string;
  svIcon: string;
  isOwner?: boolean;
  serverName?: string;
  isRiv?: boolean;
}
