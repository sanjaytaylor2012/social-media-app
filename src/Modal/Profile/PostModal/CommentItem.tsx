import { Comment } from "@/atoms/postAtom";
import { Flex, Icon, Stack, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect } from "react";
import { AiOutlineInstagram } from "react-icons/ai";

type CommentItemProps = {
  comment: Comment;
};

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <Flex>
      {comment.commentorProfilePic === "" ? (
        <Icon as={AiOutlineInstagram} />
      ) : (
        <Image
          objectFit="cover"
          borderRadius="full"
          boxSize="40px"
          src={comment.commentorProfilePic}
          mr={4}
        />
      )}

      <Stack>
        <Text fontWeight="600" mb={-2}>
          {comment.commentorName}
        </Text>
        <Text fontSize="8pt" color="gray.400">
          {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow() ===
          "Invalid date"
            ? "a few seconds ago"
            : moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
        </Text>
      </Stack>

      <Text>{comment.body}</Text>
    </Flex>
  );
};
export default CommentItem;
