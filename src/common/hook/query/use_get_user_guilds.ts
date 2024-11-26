import { useQuery } from "@tanstack/react-query";
import {
  DiscordGuild,
  getUserGuilds,
} from "../../api/discord/get/get_user_guilds";

export const useUserGuilds = () => {
  return useQuery<DiscordGuild[]>({
    queryKey: ["userGuilds"],
    queryFn: getUserGuilds,
  });
};
