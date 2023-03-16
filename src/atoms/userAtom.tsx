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

// interface UserStates {
//   myFollowings: UserType[];
//   // visitedCommunities
// }

// const defaultUserStates: UserStates = {
//   myFollowings: [],
// };

// export const UserStates = atom<UserStates>({
//   key: "UserState",
//   default: defaultUserStates,
// });

export interface followProfile {
  name: string;
  profilePic?: string;
}

interface UserStates {
  myFollowings: followProfile[];
  totalFollowings: number;
  // visitedCommunities
}

const defaultUserStates: UserStates = {
  myFollowings: [],
  totalFollowings: 0,
};

export const UserStates = atom<UserStates>({
  key: "UserState",
  default: defaultUserStates,
});

export const UserStates1 = atom<UserStates>({
  key: "UserState1",
  default: defaultUserStates,
});

interface FollowerStates {
  myFollowers: followProfile[];
  totalFollowers: number;
  // visitedCommunities
}

const defaultFollowerStates: FollowerStates = {
  myFollowers: [],
  totalFollowers: 0,
};

export const FollowerStates = atom<FollowerStates>({
  key: "FollowerState",
  default: defaultFollowerStates,
});
