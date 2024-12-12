import { ChevronDown } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../common/component/radix/avator";
import { cn } from "../../../common/utils/cn";

export default function ServerProfile({
  svIcon,
  svName,
  className = "",
}: SPProps) {
  return (
    <button
      className={cn(
        className,
        "active:border-[0.15rem] active:border-discord-left w-[16.5rem] h-[2.75rem] bg-[#17181E] rounded-[0.35rem] text-white group"
      )}
    >
      <div className="flex flex-row items-center justify-between px-[0.75rem]">
        <div className="flex flex-row items-center space-x-[0.5rem]">
          <Avatar className="size-[1.5rem]">
            <AvatarImage src={svIcon || ""} />
            <AvatarFallback className="text-white bg-gray-03 text-[1.75rem] font-semibold">
              {svName.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <p className="font-semibold">{svName}</p>
        </div>
        <ChevronDown className="transition-transform duration-200 group-hover:rotate-180" />
      </div>
    </button>
  );
}

interface SPProps {
  svIcon: string | null;
  svName: string;
  className?: string;
}
