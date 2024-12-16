import { Item } from "./ListView";

export const sortItems: Item[] = [
  { name: "정렬 기준", isToggle: false },
  { name: "최근 날짜", isToggle: true },
  { name: "오래된 날짜", isToggle: true },
];

export const categories = [
  { name: "카테고리 선택", isToggle: false },
  { name: "전체", isToggle: true },
  { name: "디자인", isToggle: true },
  { name: "프론트엔드", isToggle: true },
  { name: "백엔드", isToggle: true },
  { name: "PM", isToggle: true },
  { name: "아웃소싱 TF", isToggle: true },
];

export const deleteAndFix: Item[] = [
  { name: "수정하기", isToggle: false },
  { name: "삭제하기", isToggle: false, className: "text-red-01" },
];
