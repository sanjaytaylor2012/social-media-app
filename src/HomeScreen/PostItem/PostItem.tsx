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
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import HomeScreenPostInfoSection from "./HomeScreenPostInfoSection";
import PostHeader from "./PostHeader";
import { motion, useAnimation, useSpring } from "framer-motion";

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

  const [isLiked, setIsLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

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
    <Stack
      // ml={{ sm: "10px" }}
      width={{ base: "100vw", sm: "300px", md: "100%" }}
      position="relative"
    >
      <PostHeader router={router} user={user} item={item} />
      {showHeart && (
        <Flex position="absolute" top="35%" left="34%">
          <motion.div
            animate={{ scale: [1, 2, 2, 1, 1] }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <Icon z-index={1} as={AiFillHeart} fontSize={100} color="white" />
          </motion.div>
        </Flex>
      )}
      <Image
        objectFit="cover"
        // position="absolute"
        src={item.imageURL}
        width={{ base: "100vw", sm: "300px", md: "400px" }}
        height={{ base: "125vw", sm: "375px", md: "500px" }}
        onDoubleClick={() => {
          if (!isLiked) {
            onLike();
            setShowHeart(true);

            // setTimeout(function () {
            //   setShowHeart(false);
            // }, 100000);
          }
        }}
      />

      <HomeScreenPostInfoSection
        isLiked={isLiked}
        setIsLiked={setIsLiked}
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
