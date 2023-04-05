import { atom } from "recoil";

interface NavBarStates {
  selectedTab: string;
  previousTab: string;
}

const defaultNavBarState: NavBarStates = {
  selectedTab: "Home",
  previousTab: "",
};

export const NavBarState = atom<NavBarStates>({
  key: "NavBarState",
  default: defaultNavBarState,
});
