import { Post } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
import usePost from "@/hooks/usePost";
import MobileCommentsModal from "@/Modal/Profile/MobilePostModal.tsx/MobileCommentsModal";
import PostModal from "@/Modal/Profile/PostModal/PostModal";
import PostModalHeader from "@/Modal/Profile/PostModal/PostModalHeader";
import ViewLikesModal from "@/Modal/Profile/PostModal/ViewLikesModal";
import { Tooltip, Stack, Flex, Icon, Text, Image } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { NextRouter } from "next/router";
import React, { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import HomeScreenPostInfoSection from "./HomeScreenPostInfoSection";
import PostHeader from "./PostHeader";

type PostItemProps = {
  item: Post;
  user: User | null | undefined;
  router: NextRouter;
};

const PostItem: React.FC<PostItemProps> = ({ item, user, router }) => {
  // const { getComments, setLoading } = usePost(item);
  const { onLike, onUnLike, loading } = usePost(item);
  const [openLikesModal, setOpenLikesModal] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openMobileComments, setOpenMobileComments] = useState(false);

  return (
    <Stack width={{ base: "100vw", sm: "100%" }}>
      <PostHeader router={router} user={user} item={item} />
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
        // getComments={getComments}
        setOpenMobileComments={setOpenMobileComments}
        setOpenLikesModal={setOpenLikesModal}
        setOpenPostModal={setOpenPostModal}
        item={item}
        loading={loading}
        onLike={onLike}
        onUnLike={onUnLike}
        router={router}
        user={user}
      />

      <ViewLikesModal
        router={router}
        item={item}
        open={openLikesModal}
        setOpen={setOpenLikesModal}
      />
      <PostModal
        user={user}
        item={item}
        open={openPostModal}
        setOpen={setOpenPostModal}
        router={router}
      />
      <MobileCommentsModal
        router={router}
        item={item}
        isOpen={openMobileComments}
        setClose={setOpenMobileComments}
        user={user}
      />
    </Stack>
  );
};
export default PostItem;
