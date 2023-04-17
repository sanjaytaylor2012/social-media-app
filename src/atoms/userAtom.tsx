import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface UserType {
  displayName: string;
  uid: string;
  profilePic: string;
  email: string;
  numPosts: number;
  followers: number;
  following: number;
  bio: string;
}

const defaultUserType: UserType = {
  displayName: "",
  uid: "",
  profilePic: "",
  email: "",
  numPosts: 0,
  followers: 0,
  following: 0,
  bio: "",
};

export const currentUserInfo = atom<UserType>({
  key: "UserState",
  default: defaultUserType,
});

export interface followProfile {
  name: string;
  profilePic?: string;
}

interface UserStates {
  myFollowings: followProfile[];
  totalFollowings: number;
  myFollowers: followProfile[];
  totalFollowers: number;
  // visitedCommunities
}

const defaultUserStates: UserStates = {
  myFollowings: [],
  totalFollowings: 0,
  myFollowers: [],
  totalFollowers: 0,
};

export const currentProfileStates = atom<UserStates>({
  key: "UserState",
  default: defaultUserStates,
});

export const currentUserStates = atom<UserStates>({
  key: "CurrentUserState",
  default: defaultUserStates,
});
