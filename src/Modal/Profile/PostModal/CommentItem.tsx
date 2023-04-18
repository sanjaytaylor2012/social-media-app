import { Comment, Post } from "@/atoms/postAtom";
import { NavBarState } from "@/atoms/SearchBarAtom";
import { auth } from "@/firebase/clientApp";
import { Flex, Icon, Stack, Image, Text, Button } from "@chakra-ui/react";
import { User } from "firebase/auth";
import moment from "moment";
import { NextRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineInstagram } from "react-icons/ai";
import { MdOutlineMenu } from "react-icons/md";
import { useRecoilState } from "recoil";
import DeleteCommentModal from "./DeleteCommentModal/DeleteCommentModal";

type CommentItemProps = {
  comment: Comment;
  post: Post;
  user: User | null | undefined;
  router: NextRouter;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  post,
  user,
  router,
}) => {
  const [open, setOpen] = useState(false);
  const [navState, setNavState] = useRecoilState(NavBarState);

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
          <Text
            cursor="pointer"
            _hover={{ color: "gray.300" }}
            fontWeight="600"
            mb={-2}
            mr={2}
            onClick={() => {
              setNavState({
                selectedTab: "Profile",
                previousTab: "Home",
              });
              router.push(`/${comment.commentorName}`);
            }}
          >
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
