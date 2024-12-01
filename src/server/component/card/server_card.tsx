import { useNavigate } from "react-router-dom";
import { AspectRatio } from "../../../common/component/radix/aspect_ratio";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../common/component/radix/avator";
import Entry from "../button/entry";
import { useRivInGuild } from "../../view/server/hook/use_riv_in_guild";

export default function ServerCard({
  guildId,
  svIcon,
  isOwner = true,
  serverName = "Riv's Server",
}: ServerCardProps) {
  const navigate = useNavigate();
  const { isRiv } = useRivInGuild(guildId);
  return (
    <div className="w-[22.1875rem]">
      <div className="relative mb-[0.75rem]">
        <AspectRatio ratio={7 / 4} className="overflow-hidden rounded-[0.4rem]">
          {svIcon ? (
            <img src={svIcon} className=" w-full h-full object-cover blur-lg" />
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
            navigate(`/setup`);
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
}
