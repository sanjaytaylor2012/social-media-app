import { UserStoryItem } from "@/atoms/storiesAtom";
import React from "react";
import { Flex, Icon, Image, Box } from "@chakra-ui/react";

type StoryCarouselObjectProps = {
  item: UserStoryItem;
  setOpenStoriesView: (input: boolean) => void;
};

const StoryCarouselObject: React.FC<StoryCarouselObjectProps> = ({
  item,
  setOpenStoriesView,
}) => {
  return (
    <Image
      mr={1}
      boxSize="70px"
      borderRadius="full"
      objectFit="cover"
      src={item.creatorProfilePic}
      onClick={() => {
        setOpenStoriesView(true);
      }}
    />
  );
};
export default StoryCarouselObject;
