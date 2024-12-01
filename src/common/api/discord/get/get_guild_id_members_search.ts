import { discordClientAuth } from "../discord_client";

// 특정 사용자를 id로 검색하는 API 요청 함수
export const getGuildsIdMembersSearch = async (
  guildId: string,
  query: string,
  limit: number = 1
) => {
  try {
    const response = await discordClientAuth<GuildMember[]>({
      url: `/guilds/${guildId}/members/search`,
      method: "GET",
      params: {
        query, // 검색 키워드 (예: 사용자 ID 또는 이름)
        limit, // 검색 결과의 최대 개수
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error searching members in guild ${guildId}:`, error);
    throw new Error("Failed to search guild members");
  }
};

export interface GuildMember {
  user: {
    id: string; // 사용자 ID
    username: string; // 사용자 이름
    discriminator: string; // 사용자 태그 번호 (예: #1234)
    avatar?: string | null; // 사용자 아바타 해시
    bot?: boolean; // 사용자가 봇인지 여부
  };
  nick?: string; // 길드 내 닉네임
  roles: string[]; // 사용자 역할 ID 목록
  joined_at: string; // 길드에 가입한 날짜
  premium_since?: string | null; // 부스트를 시작한 날짜 (없을 경우 null)
  deaf: boolean; // 음소거 상태
  mute: boolean; // 음소거 상태
}
