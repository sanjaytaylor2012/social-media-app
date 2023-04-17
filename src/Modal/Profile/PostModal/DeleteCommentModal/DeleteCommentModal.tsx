import { Comment, Post, postState } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import usePost from "@/hooks/usePost";
import useProfile from "@/hooks/useProfile";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  Divider,
  ModalCloseButton,
  ModalBody,
  Stack,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

type DeleteCommentModalProps = {
  open: boolean;
  setOpen: (input: boolean) => void;
  comment: Comment;
  post: Post;
};

const DeleteCommentModal: React.FC<DeleteCommentModalProps> = ({
  open,
  setOpen,
  comment,
  post,
}) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const { setCurrentPostState, currentPostState } = usePost(post);

  const handleDeleteComment = async () => {
    try {
      setLoading(true);
      const batch = writeBatch(firestore);

      batch.delete(doc(firestore, `posts/${post.id}/comments/${comment.id}`));

      batch.commit();

      const updatedPosts = currentPostState.posts.map((postItem) => {
        if (postItem.id === post.id) {
          const updatedComments = postItem.comments.filter((commentcheck) => {
            commentcheck.id !== comment.id;
          });
          const updatedPost = {
            ...postItem,
            comments: updatedComments,
          };
          return updatedPost;
        } else {
          return postItem;
        }
      });

      setCurrentPostState((prev) => ({
        ...prev,
        posts: updatedPosts,
      }));

      setLoading(false);
      setOpen(false);
    } catch (error: any) {
      console.log("handleDeleteComment error: ", error.message);
    }
  };

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent width="350px">
        <ModalBody>
          <Flex justify="center">
            <Text
              onClick={handleDeleteComment}
              cursor="pointer"
              color="blue.500"
            >
              Delete Comment
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default DeleteCommentModal;
