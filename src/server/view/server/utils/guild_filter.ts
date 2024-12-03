import { DiscordGuild } from "../../../../common/api/discord/get/get_user_guilds";

export const processAndGroupGuilds = (
  guildList: DiscordGuild[],
  guildWithBotList: DiscordGuild[] | undefined,
  count: number
) => {
  const ADMINISTRATOR_BIT = 0x8; // ADMINISTRATOR 권한
  const MANAGE_GUILD_BIT = 0x20; // MANAGE_GUILD 권한

  // `botGuildIds` 생성
  const botGuildIds = guildWithBotList?.map((guild) => guild.id) || [];

  // `isRiv` 추가 및 정렬
  const updatedGuildList = guildList
    .map((guild) => ({
      ...guild,
      isRiv: botGuildIds.includes(guild.id), // isRiv 추가
    }))
    .sort((a, b) => {
      if (a.isRiv && !b.isRiv) return -1;
      if (!a.isRiv && b.isRiv) return 1;
      return 0;
    });

  // 초대 권한이 있는 길드만 필터링 및 그룹화
  return updatedGuildList.reduce((groups, guild) => {
    const numericPermissions = parseInt(guild.permissions, 10);

    // 초대 권한 확인 (ADMINISTRATOR 또는 MANAGE_GUILD 권한 포함)
    const invitePermissionGuild =
      (numericPermissions & ADMINISTRATOR_BIT) === ADMINISTRATOR_BIT ||
      (numericPermissions & MANAGE_GUILD_BIT) === MANAGE_GUILD_BIT;

    if (invitePermissionGuild) {
      const lastGroup = groups[groups.length - 1];
      if (!lastGroup || lastGroup.length === count) {
        groups.push([guild]); // 새로운 그룹 생성
      } else {
        lastGroup.push(guild); // 기존 그룹에 추가
      }
    }
    return groups;
  }, [] as (DiscordGuild & { isRiv: boolean })[][]);
};
