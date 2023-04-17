import { Post } from "@/atoms/postAtom";
import HomeScreenPostInfoSection from "@/HomeScreen/HomeScreenPostInfoSection";
import PostHeader from "@/HomeScreen/PostHeader";
import usePost from "@/hooks/usePost";
import { Stack, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import MobileCommentsModal from "./MobileCommentsModal";
import MobilePostInfoSection from "./MobilePostInfoSection";

type MobilePostItemProps = { item: Post };

const MobilePostItem: React.FC<MobilePostItemProps> = ({ item }) => {
  // const { getComments, setLoading } = usePost(item);
  const { onLike, onUnLike, loading } = usePost(item);
  const [openComments, setOpenComments] = useState(false);

  return (
    <Stack width={{ base: "100vw", sm: "100%" }}>
      <PostHeader item={item} />
      <Image
        // onClick={() => {
        //   setLoading(true);
        //   getComments(item.creatorDisplayName);
        // }}
        objectFit="cover"
        src={item.imageURL}
        width={{ base: "90%", sm: "300px", md: "400px" }}
        height={{ base: "125vw", sm: "375px", md: "500px" }}
        // width={{ base: "40%", md: "70%" }}
        // height={{ base: "70%", md: "90%" }}
      />

      <MobilePostInfoSection
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
      />
    </Stack>
  );
};
export default MobilePostItem;
