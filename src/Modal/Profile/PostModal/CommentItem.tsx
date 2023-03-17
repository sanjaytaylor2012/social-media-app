import { Comment } from "@/atoms/postAtom";
import { auth } from "@/firebase/clientApp";
import { Flex, Icon, Stack, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineInstagram } from "react-icons/ai";

type CommentItemProps = {
  comment: Comment;
};

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const [user] = useAuthState(auth);

  return (
    <Flex width="100%" justify="start">
      {comment.commentorProfilePic === "" ? (
        <Icon fontSize="30pt" as={AiOutlineInstagram} mr={4} />
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
        <Flex justify="start">
          <Text fontWeight="600" mb={-2} mr={2}>
            {comment.commentorName}
          </Text>
          <Text>{comment.body}</Text>
        </Flex>
        <Text fontSize="8pt" color="gray.400">
          {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow() ===
          "Invalid date"
            ? "a few seconds ago"
            : moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
        </Text>
      </Stack>
    </Flex>
  );
};
export default CommentItem;
