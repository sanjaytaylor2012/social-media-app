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

// const defaultUserState: userType = {
//   selectedPost: null,
// };

// export const userState = atom({
//   key: "userState",
//   default: defaultUserState,
// });
