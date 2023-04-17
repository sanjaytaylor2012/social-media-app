import { Post } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
import { auth } from "@/firebase/clientApp";
import usePost from "@/hooks/usePost";
import DeletePostModal from "@/Modal/Profile/PostModal/DeletePostModal/DeletePostModal";
import PostInfoSection from "@/Modal/Profile/PostModal/PostInfoSection";
import { Flex, Stack, Divider, Image, Text, Icon } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineInstagram } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

type PostHeaderProps = { item: Post };

const PostHeader: React.FC<PostHeaderProps> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <>
      <Flex ml={{ base: 2, sm: 0 }} align="center" justify="space-between">
        <Flex align="center">
          {item.creatorProfilePic === undefined ? (
            <Icon fontSize={30} mr={1} as={AiOutlineInstagram} />
          ) : (
            <Image
              objectFit="cover"
              borderRadius="full"
              boxSize="40px"
              src={item.creatorProfilePic}
              mr={2}
            />
          )}
          <Text
            _hover={{ color: "gray.400" }}
            fontWeight="600"
            cursor="pointer"
            mr={2}
            onClick={() => {
              router.push(`/${item.creatorDisplayName}`);
            }}
          >
            {item.creatorDisplayName}
          </Text>
          <Text fontSize="10pt" color="gray.400">
            {moment(new Date(item?.createdAt?.seconds * 1000)).fromNow()}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
export default PostHeader;
