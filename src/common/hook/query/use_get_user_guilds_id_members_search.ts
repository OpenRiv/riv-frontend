import { useQuery } from "@tanstack/react-query";
import {
  getGuildsIdMembersSearch,
  GuildMember,
} from "../../api/discord/get/get_guild_id_members_search";

export const useGuildMemberSearch = (
  guildId: string,
  query: string,
  limit: number = 1
) => {
  return useQuery<GuildMember[]>({
    queryKey: ["guildMemberSearch", guildId, query, limit],
    queryFn: () => getGuildsIdMembersSearch(guildId, query, limit),
    enabled: !!guildId && !!query, // guildId와 query가 존재할 때만 쿼리 실행
  });
};
