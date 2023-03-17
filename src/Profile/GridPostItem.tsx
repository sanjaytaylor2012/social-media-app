import { Post } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
import usePost from "@/hooks/usePost";
import PostModal from "@/Modal/Profile/PostModal/PostModal";
import { Tooltip, Stack, Flex, Icon, Text, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

type GridPostItemProps = { item: Post; userDoc: UserType };

const GridPostItem: React.FC<GridPostItemProps> = ({ item, userDoc }) => {
  const [open, setOpen] = useState(false);
  const { getComments, setLoading } = usePost(userDoc, item);

  return (
    <>
      <Image
        onClick={() => {
          setLoading(true);
          getComments();
          setOpen(true);
        }}
        _hover={{
          filter: "brightness(70%)",
        }}
        objectFit="cover"
        src={item.imageURL}
        width={{ base: "30vw", md: "20vw" }}
        height={{ base: "30vw", md: "20vw" }}
      />
      <PostModal userDoc={userDoc} item={item} open={open} setOpen={setOpen} />
    </>
  );
};
export default GridPostItem;
