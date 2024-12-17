import { discordClientBotAuth } from "../discord_client";
import { DiscordGuild } from "./getUserGuilds";

// 특정 길드에 봇이 포함되어 있는지 확인하는 함수
export const getBotInGuild = async () => {
  try {
    const response = await discordClientBotAuth<DiscordGuild[]>({
      url: "/users/@me/guilds",
      method: "GET",
    });

    const guilds = response.data;
    // 길드 목록에서 특정 guildId를 찾음
    return guilds;
  } catch (error) {
    console.error("Error fetching guilds for bot:", error);
    throw new Error("Failed to fetch guild list for bot");
  }
};
