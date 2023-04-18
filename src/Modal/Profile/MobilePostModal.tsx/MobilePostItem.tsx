import { Post } from "@/atoms/postAtom";
import HomeScreenPostInfoSection from "@/HomeScreen/PostItem/HomeScreenPostInfoSection";
import PostHeader from "@/HomeScreen/PostItem/PostHeader";
import usePost from "@/hooks/usePost";
import { Stack, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { NextRouter } from "next/router";
import { useState } from "react";
import DeletePostModal from "../PostModal/DeletePostModal/DeletePostModal";
import ViewLikesModal from "../PostModal/ViewLikesModal";
import MobileCommentsModal from "./MobileCommentsModal";
import MobilePostHeader from "./MobilePostHeader";
import MobilePostInfoSection from "./MobilePostInfoSection";

type MobilePostItemProps = {
  item: Post;
  user: User | undefined | null;
  router: NextRouter;
};

const MobilePostItem: React.FC<MobilePostItemProps> = ({
  item,
  user,
  router,
}) => {
  // const { getComments, setLoading } = usePost(item);
  const { onLike, onUnLike, loading } = usePost(item);
  const [openComments, setOpenComments] = useState(false);
  const [openDeletePostModal, setOpenDeletePostModal] = useState(false);
  const [openLikesModal, setOpenLikesModal] = useState(false);

  return (
    <Stack width={{ base: "100vw", sm: "100%" }}>
      <MobilePostHeader
        setOpenDeletePostModal={setOpenDeletePostModal}
        router={router}
        user={user}
        item={item}
      />
      <Image
        // onClick={() => {
        //   setLoading(true);
        //   getComments(item.creatorDisplayName);
        // }}
        objectFit="cover"
        src={item.imageURL}
        width={{ base: "89%", sm: "300px", md: "400px" }}
        height={{ base: "125vw", sm: "375px", md: "500px" }}
        // width={{ base: "40%", md: "70%" }}
        // height={{ base: "70%", md: "90%" }}
      />

      <MobilePostInfoSection
        setOpenLikesModal={setOpenLikesModal}
        user={user}
        openLikesModal={openLikesModal}
        // getComments={getComments}
        item={item}
        loading={loading}
        onLike={onLike}
        onUnLike={onUnLike}
        setOpenComments={setOpenComments}
      />
      <MobileCommentsModal
        item={item}
        isOpen={openComments}
        setClose={setOpenComments}
        router={router}
        user={user}
      />
      <DeletePostModal
        router={router}
        user={user}
        open={openDeletePostModal}
        setOpen={setOpenDeletePostModal}
        item={item}
      />
      <ViewLikesModal
        router={router}
        item={item}
        open={openLikesModal}
        setOpen={setOpenLikesModal}
      />
    </Stack>
  );
};
export default MobilePostItem;
