import { CommentState, Post } from "@/atoms/postAtom";
import { Flex, Divider, Icon, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import { useRecoilState } from "recoil";

type PostInfoSectionProps = {
  item: Post | undefined;
  onLike: (postId: string) => Promise<void>;
  onUnLike: (postId: string) => Promise<void>;
};

const PostInfoSection: React.FC<PostInfoSectionProps> = ({
  item,
  onLike,
  onUnLike,
}) => {
  const [currentCommentState, setCurrentCommentState] =
    useRecoilState(CommentState);

  return (
    <Flex direction="column">
      <Divider width="100%" color="gray.300" border="1px solid" />
      <Flex>
        {currentCommentState.isLiked ? (
          <Icon
            cursor="pointer"
            fontSize={30}
            color="red.500"
            as={AiFillHeart}
            mr={4}
            onClick={() => onUnLike(item!.id)}
          />
        ) : (
          <Icon
            cursor="pointer"
            mr={4}
            fontSize={30}
            as={AiOutlineHeart}
            onClick={() => onLike(item.id)}
          />
        )}

        <Icon mb="20px" fontSize={30} as={TbMessageCircle2} />
      </Flex>
      <Text>Liked by {currentCommentState.likes} people</Text>
      <Text fontSize="10pt" color="gray.400">
        {moment(new Date(item.createdAt?.seconds * 1000)).fromNow()}
      </Text>
    </Flex>
  );
};
export default PostInfoSection;
