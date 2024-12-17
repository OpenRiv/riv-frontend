import { discordClientAuth } from "../discord_client";

// Discord 사용자 정보 가져오기
export const getUserInfo = async () => {
  try {
    const response = await discordClientAuth<RespTpye>({
      url: "/users/@me",
      method: "GET",
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Failed to fetch user info");
  }
};

// 응답값
interface RespTpye {
  id: string; // 사용자 고유 ID
  username: string; // 사용자 이름
  discriminator: string; // 사용자 태그 (#0000 형식)
  global_name?: string | null; // 글로벌 이름
  email?: string | null; // 이메일 주소
  avatar?: string | null; // 아바타 해시
  accent_color?: number | null; // 프로필 색상
  avatar_decoration_data?: string | null; // 아바타 데코레이션 데이터 (구조 미확정)
  banner?: string | null; // 배너 이미지 해시
  banner_color?: string | null; // 배너 색상
  clan?: string | null; // 클랜 정보 (추가적 데이터 필요)
  locale?: string; // 사용자 지역 설정
  mfa_enabled: boolean; // MFA(2단계 인증) 활성화 여부
  premium_type: number; // Nitro 구독 상태 (0: 없음, 1: Nitro Classic, 2: Nitro)
  primary_guild?: string | null; // 주요 길드 정보
  flags: number; // 계정 플래그
  public_flags: number; // 공개 계정 플래그
  verified: boolean; // 이메일 인증 여부
}
