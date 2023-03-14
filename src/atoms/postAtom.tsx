import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Post = {
  id?: string;
  creatorId: string;
  creatorDisplayName: string;
  body: string;
  numberOfComments: number;
  imageURL?: string;
  createdAt: Timestamp;
  creatorProfilePic?: string;
  likes: number;
};

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  // postVotes?
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
};

export const postState = atom({
  key: "postState",
  default: defaultPostState,
});
