import { atom } from "recoil";

export interface AuthenticationModalState {
  open: boolean;
}

//this state knows what types to take in because we specified them above
const defaultModalState: AuthenticationModalState = {
  open: false,
};

//this atom is similar to useState hook where default state is default modal state
export const AuthenticationModalState = atom<AuthenticationModalState>({
  key: "AuthenticationModalState", //every atom needs a unique key
  default: defaultModalState, //supplies default values we defined above for this atom
});
