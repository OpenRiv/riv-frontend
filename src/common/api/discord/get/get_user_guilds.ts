import { discordClientAuth } from "../discord_client";

export const getUserGuilds = async () => {
  try {
    const response = await discordClientAuth<DiscordGuild[]>({
      url: "/users/@me/guilds",
      method: "GET",
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user guilds:", error);
    throw new Error("Failed to fetch user guilds");
  }
};

export interface DiscordGuild {
  id: string; // 길드 ID
  name: string; // 길드 이름
  icon?: string | null; // 길드 아이콘 해시
  owner: boolean; // 사용자가 길드 소유자인지 여부
  permissions: string; // 사용자의 길드 권한 (비트 플래그)
  features: string[]; // 길드 기능 목록
}
