import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

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
};

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  numPosts: number;
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  numPosts: 0,
};

export const postState = atom({
  key: "postState",
  default: defaultPostState,
});

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

interface CommentState {
  selectedPost: Post | null;
  comments: Comment[];
  profileLikes: Like[];
  // isLiked: boolean;
  likes: number;
  // postVotes?
}

const defaultCommentState: CommentState = {
  selectedPost: null,
  comments: [],
  profileLikes: [],
  // isLiked: false,
  likes: 0,
};

export const CommentState = atom({
  key: "CommentState",
  default: defaultCommentState,
});

export type HomeScreenPost = {
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
};

interface HomePostState {
  selectedPost: Post | null;
  posts: Post[];
  // postVotes?
}

const defaultHomePostState: HomePostState = {
  selectedPost: null,
  posts: [],
};

export const homeScreenPostState = atom({
  key: "postState",
  default: defaultHomePostState,
});
