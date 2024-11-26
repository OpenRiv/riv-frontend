import { discordClientAuth } from "./discord_client";

// Discord 사용자 정보 가져오기
export const getUserInfo = async () => {
  try {
    const response = await discordClientAuth<{
      id: string;
      username: string;
      email?: string;
    }>({
      url: "/users/@me",
      method: "GET",
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Failed to fetch user info");
  }
};
