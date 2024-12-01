import { useGuildMemberSearch } from "../../../../common/hook/query/use_get_user_guilds_id_members_search";

// Riv 봇이 해당 길드에 있는지 확인하는 hook
export const useRivInGuild = (guildId: string) => {
  // botId를 query로 고정하여 useGuildMemberSearch 호출
  const { data, isLoading, isError } = useGuildMemberSearch(
    guildId,
    import.meta.env.VITE_RIV_ID,
    1
  );

  // 봇 존재 여부를 확인
  const isRiv = data?.some(
    (member) =>
      member.user.id === import.meta.env.VITE_RIV_ID && member.user.bot
  );

  return { isRiv: isRiv || false, isLoading, isError };
};
