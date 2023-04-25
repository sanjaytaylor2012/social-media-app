import { storiesState, Story } from "@/atoms/storiesAtom";
import { currentUserStates } from "@/atoms/userAtom";
import { Flex, Icon, Image, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useRecoilState } from "recoil";
import NewStoryModal from "./NewStoryModal";
import StoryCarouselObject from "./StoryCarouselObject";
import StoryModal from "./StoryModal";
import ViewStoryModal from "./ViewStoryModal";

type StoriesCarouselProps = { profilePicUser: string };

const StoriesCarousel: React.FC<StoriesCarouselProps> = ({
  profilePicUser,
}) => {
  const [stories, setStories] = useRecoilState(storiesState);
  const [openNewStoryModal, setOpenNewStoryModal] = useState(false);
  const [currentUserProfileState, setCurrentUserProfileState] =
    useRecoilState(currentUserStates);
  const [openStoriesView, setOpenStoriesView] = useState(false);

  return (
    <Flex
      border="1px solid"
      width="100%"
      overflowX="scroll"
      //   overflowY="hidden"
    >
      <Flex mr={1} align="end" onClick={() => setOpenNewStoryModal(true)}>
        <Image
          boxSize="70px"
          borderRadius="full"
          objectFit="cover"
          src={profilePicUser}
        />
        <Icon
          ml={-4}
          boxSize="20px"
          borderRadius="full"
          backgroundColor="blue.500"
          color="white"
          as={AiOutlinePlus}
        />
      </Flex>
      {stories.UserStoryItems.map((storyObject) => {
        return (
          <StoryCarouselObject
            setOpenStoriesView={setOpenStoriesView}
            item={storyObject}
          />
        );
      })}

      <StoryModal
        openNewStoryModal={openNewStoryModal}
        setOpenNewStoryModal={setOpenNewStoryModal}
      />
    </Flex>
  );
};
export default StoriesCarousel;
