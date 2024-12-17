import { Item } from "./ListView";

export const sortItems: Item[] = [
  { name: "정렬 기준", isToggle: false },
  { name: "최근 날짜", isToggle: true },
  { name: "오래된 날짜", isToggle: true },
];

export const deleteAndFix: Item[] = [
  { name: "수정하기", isToggle: false },
  { name: "삭제하기", isToggle: false, className: "text-red-01" },
];
