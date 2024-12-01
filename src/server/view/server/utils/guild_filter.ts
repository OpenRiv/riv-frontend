import { DiscordGuild } from "../../../../common/api/discord/get/get_user_guilds";

export const filterAndGroupGuilds = (
  guildList: DiscordGuild[],
  count: number
) => {
  const INVITE_PERMISSION_BIT = 0x1; // CREATE_INSTANT_INVITE 권한

  return guildList.reduce((groups, guild) => {
    const numericPermissions = parseInt(guild.permissions, 10);
    if (
      (numericPermissions & INVITE_PERMISSION_BIT) ===
      INVITE_PERMISSION_BIT
    ) {
      const lastGroup = groups[groups.length - 1];
      if (!lastGroup || lastGroup.length === count) {
        groups.push([guild]); // 새로운 그룹 생성
      } else {
        lastGroup.push(guild); // 기존 그룹에 추가
      }
    }
    return groups;
  }, [] as DiscordGuild[][]);
};
