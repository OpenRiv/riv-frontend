import { useQuery } from "@tanstack/react-query";
import { getBotInGuild } from "../../api/discord/get/getGuildsMember";

export const useGetBotInGuild = () => {
  return useQuery({
    queryKey: ["botInGuild"],
    queryFn: () => getBotInGuild(),
  });
};
