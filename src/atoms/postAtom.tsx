import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Comment {
  commentorProfilePic?: any;
  commentorName: string;
  body: string;
  createdAt: Timestamp;
  id?: string;
  likes: number;
}

export interface Like {
  name: string;
  profilePic: string;
}

export type Post = {
  id?: string | undefined;
  creatorId: string;
  creatorDisplayName: string;
  body: string;
  numberOfComments: number;
  imageURL?: string;
  createdAt: Timestamp;
  creatorProfilePic?: string;
  likes: number;
  likeProfiles: Like[];
  comments: Comment[];
};

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
};

export const postState = atom({
  key: "postState",
  default: defaultPostState,
});
