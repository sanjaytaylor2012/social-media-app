import { Comment, Post } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
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
  Image,
  Icon,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import { useRecoilState } from "recoil";
import { AiOutlineInstagram } from "react-icons/ai";
import CommentItem from "./CommentItem";
import ProfilePostLoader from "@/Profile/ProfilePostLoader";
import CommentInput from "./CommentInput";
import PostModalHeader from "./PostModalHeader";
import PostInfoSection from "./PostInfoSection";
import { FiMenu } from "react-icons/fi";
import { query, collection, where, orderBy } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { User } from "firebase/auth";
import DeletePostModal from "./DeletePostModal/DeletePostModal";
import ViewLikesModal from "./ViewLikesModal";
import { NextRouter } from "next/router";

type PostModalProps = {
  open: boolean;
  setOpen: (input: boolean) => void;
  item: Post;
  user: User | null | undefined;
  router: NextRouter;
};

const PostModal: React.FC<PostModalProps> = ({
  open,
  setOpen,
  item,
  user,
  router,
}) => {
  const { addComment, onUnLike, onLike, loading } = usePost(item);
  const [comment, setComment] = useState("");
  const [openDeletePostModal, setOpenDeletePostModal] = useState(false);
  const [openLikesModal, setOpenLikesModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    !!messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [commentState.comments]);

  const handleAddComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (comment.length > 0) {
      await addComment(comment);
      setComment("");
      //   event.target.reset();
    }
  };

  return (
    <Modal size="3xl" isOpen={open} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        {/* <ModalCloseButton /> */}
        <ModalBody p={0}>
          <Flex width="100%">
            <Image
              objectFit="cover"
              height="600px"
              width="400px"
              src={item.imageURL}
            />
            <Stack width="100%" justify="space-between">
              <Stack ml={4} mt={4}>
                <PostModalHeader
                  user={user}
                  setOpenDeletePostModal={setOpenDeletePostModal}
                  item={item}
                />

                {/* {loading ? (
                  <ProfilePostLoader />
                ) : (
                  <Stack height="30vh" overflowX="hidden" overflowY="auto">
                    {commentState.comments.map((comment: Comment) => {
                      return (
                        <CommentItem
                          comment={comment}
                          post={item}
                          key={comment.id}
                        />
                      );
                    })}
                  </Stack>
                )} */}

                {loading === false && (
                  <Stack maxHeight="50vh" overflowX="hidden" overflowY="auto">
                    {item.comments.map((comment: any) => {
                      return (
                        <CommentItem
                          router={router}
                          user={user}
                          post={item}
                          key={comment.id}
                          comment={comment}
                        />
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </Stack>
                )}

                <PostInfoSection
                  setOpenLikesModal={setOpenLikesModal}
                  user={user}
                  onLike={onLike}
                  onUnLike={onUnLike}
                  item={item}
                  loading={loading}
                />
              </Stack>
              <CommentInput
                loading={loading}
                setComment={setComment}
                handleAddComment={handleAddComment}
              />
            </Stack>
          </Flex>
        </ModalBody>
      </ModalContent>
      <DeletePostModal
        router={router}
        user={user}
        item={item}
        open={openDeletePostModal}
        setOpen={setOpenDeletePostModal}
      />
      <ViewLikesModal
        router={router}
        item={item}
        open={openLikesModal}
        setOpen={setOpenLikesModal}
      />
    </Modal>
  );
};
export default PostModal;
