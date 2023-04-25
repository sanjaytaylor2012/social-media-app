import { Timestamp } from "@google-cloud/firestore";
import { atom } from "recoil";

export interface Story {
  src: string;
  creatorName: string;
  createdAt: Timestamp;
  id: string;
  creatorProfilePic?: string;
}

export interface UserStoryItem {
  name: string;
  creatorProfilePic?: string;
  stories: Story[];
}

interface StoriesState {
  UserStoryItems: UserStoryItem[];
}

const defaultStoriesState: StoriesState = {
  UserStoryItems: [],
};

export const storiesState = atom({
  key: "storiesState",
  default: defaultStoriesState,
});
