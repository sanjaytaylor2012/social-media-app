import { Comment, CommentState, Post } from "@/atoms/postAtom";
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

type ViewFollowingModalProps = {
  open: boolean;
  setOpen: (input: boolean) => void;
  item: Post;
};

const ViewFollowingModal: React.FC<ViewFollowingModalProps> = ({
  open,
  setOpen,
  item,
}) => {
  const { addComment, onUnLike, onLike, loading } = usePost(item);
  const [comment, setComment] = useState("");
  const [commentState, setCommentState] = useRecoilState(CommentState);

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
      await addComment(comment, item.id as string);
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
                <PostModalHeader item={item} />

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
                    {commentState.comments.map((comment: any) => {
                      return (
                        <CommentItem
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
    </Modal>
  );
};
export default ViewFollowingModal;
