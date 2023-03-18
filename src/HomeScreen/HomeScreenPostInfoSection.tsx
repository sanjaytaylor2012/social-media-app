import { CommentState, Post } from "@/atoms/postAtom";
import { auth } from "@/firebase/clientApp";
import ViewLikesModal from "@/Modal/Profile/PostModal/ViewLikesModal";
import { Flex, Divider, Icon, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import { useRecoilState } from "recoil";

type HomeScreenPostInfoSectionProps = {
  item: Post;
  onLike: (postId: string) => Promise<void>;
  onUnLike: (postId: string) => Promise<void>;
  loading: boolean;
  setPostModalOpen: (input: boolean) => void;
  getComments: (input: string) => Promise<void>;
};

const HomeScreenPostInfoSection: React.FC<HomeScreenPostInfoSectionProps> = ({
  item,
  onLike,
  onUnLike,
  loading,
  setPostModalOpen,
  getComments,
}) => {
  const [currentCommentState, setCurrentCommentState] =
    useRecoilState(CommentState);

  const [user] = useAuthState(auth);

  const [open, setOpen] = useState(false);

  const isLiked = !!currentCommentState.profileLikes.find(
    (item) => item.name === user!.email!.split("@")[0]
  );

  return (
    <Flex direction="column">
      <Divider width="100%" color="gray.300" border="1px solid" />
      <Flex>
        {isLiked ? (
          <Icon
            cursor="pointer"
            fontSize={30}
            color="red.500"
            as={AiFillHeart}
            mr={4}
            onClick={() => onUnLike(item.id as string)}
          />
        ) : (
          <Icon
            cursor="pointer"
            mr={4}
            fontSize={30}
            as={AiOutlineHeart}
            onClick={() => onLike(item.id as string)}
          />
        )}

        <Icon mb={2} fontSize={30} as={TbMessageCircle2} />
      </Flex>

      {currentCommentState.likes === 1 && (
        <Text fontWeight={600} cursor="pointer" _hover={{ color: "gray.300" }}>
          Liked by {currentCommentState.profileLikes[0].name}
        </Text>
      )}
      {currentCommentState.likes > 1 && (
        <Text
          fontWeight={600}
          cursor="pointer"
          _hover={{ color: "gray.300" }}
          onClick={() => setOpen(true)}
        >
          Liked by {currentCommentState.profileLikes[0].name} and{" "}
          {currentCommentState.likes - 1} others
        </Text>
      )}

      {currentCommentState.comments.length > 2 && (
        <Text
          cursor="pointer"
          _hover={{ color: "gray.300" }}
          onClick={() => {
            getComments(item.creatorDisplayName);
            setPostModalOpen(true);
          }}
        >
          View all {currentCommentState.comments.length} comments
        </Text>
      )}

      <ViewLikesModal open={open} setOpen={setOpen} />
    </Flex>
  );
};
export default HomeScreenPostInfoSection;
