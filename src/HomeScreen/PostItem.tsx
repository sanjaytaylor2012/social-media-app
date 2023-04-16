import { Post } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
import usePost from "@/hooks/usePost";
import PostModal from "@/Modal/Profile/PostModal/PostModal";
import PostModalHeader from "@/Modal/Profile/PostModal/PostModalHeader";
import { Tooltip, Stack, Flex, Icon, Text, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import HomeScreenPostInfoSection from "./HomeScreenPostInfoSection";
import PostHeader from "./PostHeader";

type PostItemProps = { item: Post };

const PostItem: React.FC<PostItemProps> = ({ item }) => {
  const { getComments, setLoading } = usePost(item);
  const { onLike, onUnLike, loading } = usePost(item);

  return (
    <Stack mb={10} width={{ base: "100vw", sm: "100%" }}>
      <PostHeader item={item} />
      <Image
        // onClick={() => {
        //   setLoading(true);
        //   getComments(item.creatorDisplayName);
        // }}
        objectFit="cover"
        src={item.imageURL}
        width={{ base: "100vw", sm: "300px", md: "400px" }}
        height={{ base: "125vw", sm: "375px", md: "500px" }}
        // width={{ base: "40%", md: "70%" }}
        // height={{ base: "70%", md: "90%" }}
      />

      <HomeScreenPostInfoSection
        getComments={getComments}
        item={item}
        loading={loading}
        onLike={onLike}
        onUnLike={onUnLike}
      />
    </Stack>
  );
};
export default PostItem;
