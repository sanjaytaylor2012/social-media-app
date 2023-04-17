import { Post } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
import usePost from "@/hooks/usePost";
import MobilePostModal from "@/Modal/Profile/MobilePostModal.tsx/MobilePostModal";
import PostModal from "@/Modal/Profile/PostModal/PostModal";
import { Tooltip, Stack, Flex, Icon, Text, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

type GridPostItemProps = { item: Post; userDoc: UserType };

const GridPostItem: React.FC<GridPostItemProps> = ({ item, userDoc }) => {
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const { getComments } = usePost(item);

  return (
    <>
      <Image
        display={{ base: "none", sm: "flex" }}
        onClick={() => {
          // getComments(item.creatorDisplayName);
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
      <Image
        display={{ base: "flex", sm: "none" }}
        onClick={() => {
          // getComments(item.creatorDisplayName);
          setOpenMobile(true);
        }}
        _hover={{
          filter: "brightness(70%)",
        }}
        objectFit="cover"
        src={item.imageURL}
        width={{ base: "30vw", md: "20vw" }}
        height={{ base: "30vw", md: "20vw" }}
      />
      <PostModal item={item} open={open} setOpen={setOpen} />
      <MobilePostModal
        item={item}
        isOpen={openMobile}
        setClose={setOpenMobile}
      />
    </>
  );
};
export default GridPostItem;
