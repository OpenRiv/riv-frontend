import { atom } from "recoil";

export const sectionState = atom<boolean>({
  key: "section",
  default: true,
});
