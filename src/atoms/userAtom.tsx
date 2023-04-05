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
