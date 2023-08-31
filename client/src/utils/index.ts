import { RecoilState, atom } from "recoil";

const loadingState: RecoilState<boolean> = atom<boolean>({
  key: "loading",
  default: false,
});

export * from "./user";
export * from "./blog";
export { loadingState };