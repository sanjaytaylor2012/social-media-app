import { Post } from "@/atoms/postAtom";
import PostItem from "@/HomeScreen/PostItem";
import usePost from "@/hooks/usePost";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  Flex,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CommentInput from "../PostModal/CommentInput";
import CommentItem from "../PostModal/CommentItem";
import MobilePostItem from "./MobilePostItem";

type MobileCommentsModalProps = {
  item: Post;
  isOpen: boolean;
  setClose: (input: boolean) => void;
};

const MobileCommentsModal: React.FC<MobileCommentsModalProps> = ({
  isOpen,
  setClose,
  item,
}) => {
  const { addComment, loading } = usePost(item);

  const [comment, setComment] = useState("");

  const handleAddComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (comment.length > 0) {
      await addComment(comment);
      setComment("");
      //   event.target.reset();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setClose(false)}>
      <ModalOverlay />
      <ModalContent my="0rem" height={"100vh"} width="100vw">
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody width={"100vw"}>
          <Stack height={"100%"} justify={"space-between"}>
            <Stack>
              {item.comments.map((comment) => {
                return <CommentItem comment={comment} post={item} />;
              })}
            </Stack>
            <Box position="fixed" width="90%" bottom={0}>
              <CommentInput
                loading={loading}
                setComment={setComment}
                handleAddComment={handleAddComment}
              />
            </Box>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default MobileCommentsModal;
