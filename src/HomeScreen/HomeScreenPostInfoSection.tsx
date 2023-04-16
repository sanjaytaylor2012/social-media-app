import { CommentState, Post } from "@/atoms/postAtom";
import { auth } from "@/firebase/clientApp";
import PostModal from "@/Modal/Profile/PostModal/PostModal";
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
  getComments: (input: string) => Promise<void>;
};

const HomeScreenPostInfoSection: React.FC<HomeScreenPostInfoSectionProps> = ({
  item,
  onLike,
  onUnLike,
  loading,
  getComments,
}) => {
  const [currentCommentState, setCurrentCommentState] =
    useRecoilState(CommentState);

  const [user] = useAuthState(auth);

  const [open, setOpen] = useState(false);

  const [openPostModal, setOpenPostModal] = useState(false);

  const isLiked = !!currentCommentState.profileLikes.find(
    (item) => item.name === user!.email!.split("@")[0]
  );

  return (
    <Flex direction="column">
      <Divider
        width={{ base: "100vw", sm: "300px", md: "400px" }}
        color="gray.300"
        border="1px solid"
      />
      <Flex ml={{ base: 2, sm: 0, md: 0 }}>
        <Icon
          cursor="pointer"
          fontSize={30}
          color="black"
          as={AiFillHeart}
          mr={4}
          onClick={() => {
            getComments(item.creatorDisplayName);
            setOpenPostModal(true);
          }}
        />

        <Icon
          cursor="pointer"
          mb={2}
          fontSize={30}
          as={TbMessageCircle2}
          _hover={{ color: "gray.300" }}
          onClick={() => {
            getComments(item.creatorDisplayName);
            setOpenPostModal(true);
          }}
        />
      </Flex>

      {/* {currentCommentState.likes === 1 && (
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
      )} */}
      <Flex ml={{ base: 2, sm: 0, md: 0 }}>
        <Flex>
          <Text
            sx={{ float: "left", shapeOutside: "circle(50%)" }}
            width="auto"
            mr={2}
            fontWeight={600}
          >
            {item.creatorDisplayName}
          </Text>
        </Flex>

        <Text>{item.body}</Text>
      </Flex>

      <Text
        ml={{ base: 2, sm: 0, md: 0 }}
        cursor="pointer"
        _hover={{ color: "gray.300" }}
        onClick={() => {
          getComments(item.creatorDisplayName);
          setOpenPostModal(true);
        }}
      >
        View all comments
      </Text>

      <ViewLikesModal open={open} setOpen={setOpen} />
      <PostModal item={item} open={openPostModal} setOpen={setOpenPostModal} />
    </Flex>
  );
};
export default HomeScreenPostInfoSection;
