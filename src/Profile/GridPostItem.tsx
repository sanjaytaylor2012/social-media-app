import { Post } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
import usePost from "@/hooks/usePost";
import MobilePostModal from "@/Modal/Profile/MobilePostModal.tsx/MobilePostModal";
import PostModal from "@/Modal/Profile/PostModal/PostModal";
import { Tooltip, Stack, Flex, Icon, Text, Image } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { NextRouter } from "next/router";
import React, { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

type GridPostItemProps = {
  item: Post;
  userDoc: UserType;
  user: User | undefined | null;
  router: NextRouter;
};

const GridPostItem: React.FC<GridPostItemProps> = ({
  item,
  userDoc,
  user,
  router,
}) => {
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

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
      <PostModal
        router={router}
        user={user}
        item={item}
        open={open}
        setOpen={setOpen}
      />
      <MobilePostModal
        item={item}
        isOpen={openMobile}
        setClose={setOpenMobile}
        router={router}
        user={user}
      />
    </>
  );
};
export default GridPostItem;
