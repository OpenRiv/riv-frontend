import { useUserGuilds } from "../../../../common/hook/query/use_get_user_guilds";
import ServerCard from "../../../component/card/server_card";
import { useResServerCard } from "../../../hook/use_res_server_card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ServerSection() {
  const { count } = useResServerCard();
  const { data: guildList, isLoading, isError } = useUserGuilds();

  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center space-y-[4rem] mb-[4rem] mt-[2rem]">
        {[...Array(3)].map((_, groupIndex) => (
          <div key={groupIndex} className={`flex space-x-[4rem]`}>
            {[...Array(count)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-start space-y-[1rem]"
              >
                <Skeleton height={"12rem"} width={"22rem"} />
                <div className="flex flex-row justify-between w-full">
                  <div>
                    <Skeleton width={"7rem"} height={"1.5rem"} />
                    <Skeleton width={"5rem"} height={"1.2rem"} />
                  </div>
                  <Skeleton width={"6rem"} height={"4rem"} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    );
  }

  // 에러 상태 처리
  if (isError || !guildList) {
    return <></>;
  }

  // 데이터 로드 완료 시 그룹화
  const groupedGuilds = [];
  for (let i = 0; i < guildList.length; i += count) {
    groupedGuilds.push(guildList.slice(i, i + count));
  }

  return (
    <section className="flex flex-col items-center justify-center space-y-[4rem] mb-[4rem] mt-[2rem]">
      {groupedGuilds.map((group, groupIndex) => (
        <div key={groupIndex} className="flex space-x-[4rem]">
          {group.map((guild) => (
            <ServerCard
              key={guild.id}
              svIcon={
                guild.icon
                  ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
                  : "https://cdn.discordapp.com/embed/avatars/0.png"
              }
              serverName={guild.name}
              isOwner={guild.owner}
              isRiv={false}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
