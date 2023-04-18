import { Post } from "@/atoms/postAtom";
import { NavBarState } from "@/atoms/SearchBarAtom";
import { auth } from "@/firebase/clientApp";
import { Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { NextRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import { useRecoilState } from "recoil";
import PostModal from "../PostModal/PostModal";
import ViewLikesModal from "../PostModal/ViewLikesModal";

type MobilePostInfoSectionProps = {
  item: Post;
  onLike: () => Promise<void>;
  onUnLike: () => Promise<void>;
  loading: boolean;
  setOpenComments: (input: boolean) => void;
  setOpenLikesModal: (input: boolean) => void;
  openLikesModal: boolean;
  user: User | undefined | null;
  router: NextRouter;
};

const MobilePostInfoSection: React.FC<MobilePostInfoSectionProps> = ({
  item,
  onLike,
  onUnLike,
  setOpenComments,
  setOpenLikesModal,
  router,
  user,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (item.likeProfiles) {
      setIsLiked(
        !!item.likeProfiles.find(
          (item) => item.name === user!.email!.split("@")[0]
        )
      );
    }
  }, []);

  return (
    <Flex direction="column">
      <Flex ml={{ base: 2, sm: 0, md: 0 }} align="center">
        {isLiked ? (
          <Icon
            cursor="pointer"
            mr={4}
            fontSize={30}
            as={AiFillHeart}
            color="red.500"
            onClick={() => {
              onUnLike();
              setIsLiked(false);
            }}
          />
        ) : (
          <Icon
            cursor="pointer"
            fontSize={30}
            color="black"
            as={AiOutlineHeart}
            mr={4}
            onClick={() => {
              onLike();
              setIsLiked(true);
            }}
          />
        )}

        <Icon
          cursor="pointer"
          mr={4}
          fontSize={30}
          as={TbMessageCircle2}
          _hover={{ color: "gray.300" }}
          onClick={() => {
            setOpenComments(true);
          }}
        />
      </Flex>

      {item.likeProfiles?.length === 1 && (
        <Text
          ml={{ base: 2, sm: 0, md: 0 }}
          fontWeight={600}
          cursor="pointer"
          _hover={{ color: "gray.300" }}
          onClick={() => setOpenLikesModal(true)}
        >
          Liked by {item.likeProfiles[0].name}
        </Text>
      )}
      {item.likeProfiles?.length > 1 && (
        <Text
          ml={{ base: 2, sm: 0, md: 0 }}
          fontWeight={600}
          cursor="pointer"
          _hover={{ color: "gray.300" }}
          onClick={() => setOpenLikesModal(true)}
        >
          Liked by {item.likeProfiles[0].name} and {item.likes - 1} others
        </Text>
      )}

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
      {item.comments?.length === 0 ? (
        <Text
          ml={{ base: 2, sm: 0, md: 0 }}
          cursor="pointer"
          _hover={{ color: "gray.400" }}
          color="gray.500"
          onClick={() => {
            // getComments(item.creatorDisplayName);
            setOpenComments(true);
          }}
        >
          Add a comment
        </Text>
      ) : (
        <Text
          ml={{ base: 2, sm: 0, md: 0 }}
          cursor="pointer"
          _hover={{ color: "gray.400" }}
          color="gray.500"
          onClick={() => {
            // getComments(item.creatorDisplayName);
            setOpenComments(true);
          }}
        >
          View all comments
        </Text>
      )}

      {item.comments.length > 1 && (
        <Stack spacing={-1}>
          <Flex>
            <Text
              ml={{ base: 2, sm: 0, md: 0 }}
              fontWeight={600}
              cursor="pointer"
              _hover={{ color: "gray.300" }}
              onClick={() => {
                router.push(`/${item.comments[0].commentorName}`);
              }}
              mr={2}
            >
              {item.comments[0].commentorName}
            </Text>
            <Text>{item.comments[0].body}</Text>
          </Flex>
          <Flex>
            <Text
              ml={{ base: 2, sm: 0, md: 0 }}
              fontWeight={600}
              cursor="pointer"
              _hover={{ color: "gray.300" }}
              onClick={() => {
                router.push(`/${item.comments[1].commentorName}`);
              }}
              mr={2}
            >
              {item.comments[1].commentorName}
            </Text>
            <Text cursor="pointer">{item.comments[1].body}</Text>
          </Flex>
        </Stack>
      )}

      {item.comments.length == 1 && (
        <Flex>
          <Text
            ml={{ base: 2, sm: 0, md: 0 }}
            fontWeight={600}
            cursor="pointer"
            _hover={{ color: "gray.300" }}
            onClick={() => {
              router.push(`/${item.comments[0].commentorName}`);
            }}
            mr={2}
          >
            {item.comments[0].commentorName}
          </Text>
          <Text cursor="pointer">{item.comments[0].body}</Text>
        </Flex>
      )}
    </Flex>
  );
};
export default MobilePostInfoSection;
