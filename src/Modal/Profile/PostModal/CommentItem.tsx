import { Comment, Post } from "@/atoms/postAtom";
import { auth } from "@/firebase/clientApp";
import { Flex, Icon, Stack, Image, Text, Button } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineInstagram } from "react-icons/ai";
import { MdOutlineMenu } from "react-icons/md";
import DeleteCommentModal from "./DeleteCommentModal/DeleteCommentModal";

type CommentItemProps = {
  comment: Comment;
  post: Post;
};

const CommentItem: React.FC<CommentItemProps> = ({ comment, post }) => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);

  return (
    <Flex width="100%" justify="start">
      {comment.commentorProfilePic === "" ? (
        <Icon fontSize="30pt" as={AiOutlineInstagram} mr={4} />
      ) : (
        <Image
          resize="none"
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
          {user!.email!.split("@")[0] === comment.commentorName ? (
            <Text
              cursor="pointer"
              onClick={() => setOpen(true)}
              _hover={{ color: "gray.300" }}
            >
              {comment.body}
            </Text>
          ) : (
            <Text>{comment.body}</Text>
          )}
        </Flex>

        <Text fontSize="8pt" color="gray.400">
          {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow() ===
          "Invalid date"
            ? "a few seconds ago"
            : moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
        </Text>
      </Stack>

      <DeleteCommentModal
        post={post}
        setOpen={setOpen}
        open={open}
        comment={comment}
      />
    </Flex>
  );
};
export default CommentItem;
