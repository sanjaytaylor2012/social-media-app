//For the search bar input

import { atom } from "recoil";
import { UserType } from "./userAtom";

interface InputUserStates {
  users: UserType[];
}

const defaultInputUserStates: InputUserStates = {
  users: [],
};

export const InputPostState = atom({
  key: "InputPostState",
  default: defaultInputUserStates,
});

export const CrossCheckPostState = atom({
  key: "crossCheckPostState",
  default: defaultInputUserStates,
});
