import { useQuery } from "@tanstack/react-query";
import { getBotInGuild } from "../../api/discord/get/get_guilds_member";

export const useGetBotInGuild = () => {
  return useQuery({
    queryKey: ["botInGuild"],
    queryFn: () => getBotInGuild(),
  });
};
