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
  const [open, setOpen] = useState(false);
  const { getComments, setLoading } = usePost(item);
  const { onLike, onUnLike, loading } = usePost(item);

  return (
    <>
      <PostHeader item={item} />
      <Image
        onClick={() => {
          setLoading(true);
          getComments(item.creatorDisplayName);
        }}
        objectFit="cover"
        src={item.imageURL}
        width="300px"
        height="300px"
      />
      <HomeScreenPostInfoSection
        getComments={getComments(item.creatorDisplayName)}
        setPostModalOpen={setOpen}
        item={item}
        loading={loading}
        onLike={onLike}
        onUnLike={onUnLike}
      />

      <PostModal item={item} open={open} setOpen={setOpen} />
    </>
  );
};
export default PostItem;
