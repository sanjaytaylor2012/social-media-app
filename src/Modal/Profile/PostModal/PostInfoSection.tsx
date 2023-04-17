import { Post } from "@/atoms/postAtom";
import { auth } from "@/firebase/clientApp";
import { Flex, Divider, Icon, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import { useRecoilState } from "recoil";
import ViewLikesModal from "./ViewLikesModal";

type PostInfoSectionProps = {
  item: Post;
  onLike: () => Promise<void>;
  onUnLike: () => Promise<void>;
  loading: boolean;
};

const PostInfoSection: React.FC<PostInfoSectionProps> = ({
  item,
  onLike,
  onUnLike,
  loading,
}) => {
  const [user] = useAuthState(auth);

  const [open, setOpen] = useState(false);

  const isLiked = !!item.likeProfiles.find(
    (item) => item.name === user!.email!.split("@")[0]
  );

  return (
    <Flex direction="column">
      <Divider width="100%" color="gray.300" border="1px solid" />
      <Flex>
        {isLiked ? (
          <Icon
            cursor="pointer"
            fontSize={30}
            color="red.500"
            as={AiFillHeart}
            mr={4}
            onClick={() => onUnLike()}
          />
        ) : (
          <Icon
            cursor="pointer"
            mr={4}
            fontSize={30}
            as={AiOutlineHeart}
            onClick={() => onLike()}
          />
        )}

        <Icon mb="20px" fontSize={30} as={TbMessageCircle2} />
      </Flex>

      {item.likeProfiles.length === 1 && (
        <Text
          fontWeight={600}
          cursor="pointer"
          _hover={{ color: "gray.300" }}
          onClick={() => setOpen(true)}
        >
          Liked by {item.likeProfiles[0].name}
        </Text>
      )}
      {item.likeProfiles.length > 1 && (
        <Text
          fontWeight={600}
          cursor="pointer"
          _hover={{ color: "gray.300" }}
          onClick={() => setOpen(true)}
        >
          Liked by {item.likeProfiles[0].name} and {item.likes - 1} others
        </Text>
      )}

      <Text fontSize="10pt" color="gray.400">
        {moment(new Date(item?.createdAt?.seconds * 1000)).fromNow()}
      </Text>
      <ViewLikesModal item={item} open={open} setOpen={setOpen} />
    </Flex>
  );
};
export default PostInfoSection;
