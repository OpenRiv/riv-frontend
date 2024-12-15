import { useUserGuilds } from "../../../../common/hook/query/use_get_user_guilds";
import ServerCard from "../../../component/card/ServerCard";
import { useResServerCard } from "../../../hook/useResServerCard";
import "react-loading-skeleton/dist/skeleton.css";
import ServerSectionLoading from "../skeleton/server_section";
import { useGetBotInGuild } from "../../../../common/hook/query/use_get_guilds_member";
import { processAndGroupGuilds } from "../utils/guild_filter";
export default function ServerSection() {
  const { count } = useResServerCard();
  const { data: guildList, isLoading, isError } = useUserGuilds();
  const { data: guildWithBotList } = useGetBotInGuild();

  // 로딩 상태
  if (isLoading) {
    return <ServerSectionLoading />;
  }

  // 에러 상태
  if (isError || !guildList) {
    return <></>;
  }

  // 필터링 및 그룹화
  const groupedGuilds = processAndGroupGuilds(
    guildList,
    guildWithBotList,
    count
  );

  return (
    <section className="flex flex-col items-center justify-center space-y-[4rem] mb-[4rem] mt-[2rem] w-full">
      {groupedGuilds.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className="flex flex-row items-center justify-center space-x-[4rem] w-full"
        >
          {group.map((guild) => (
            <ServerCard
              key={guild.id}
              guildId={guild.id}
              svIcon={
                guild.icon
                  ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
                  : "https://cdn.discordapp.com/embed/avatars/0.png"
              }
              serverName={guild.name}
              isOwner={guild.owner}
              isRiv={guild.isRiv}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
