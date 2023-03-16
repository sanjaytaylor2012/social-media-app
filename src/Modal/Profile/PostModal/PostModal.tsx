import { CommentState, Post } from "@/atoms/postAtom";
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

type ViewFollowingModalProps = {
  userDoc: UserType;
  open: boolean;
  setOpen: (input: boolean) => void;
  item: Post;
};

const ViewFollowingModal: React.FC<ViewFollowingModalProps> = ({
  open,
  setOpen,
  item,
  userDoc,
}) => {
  const { addComment, loading, onUnLike, onLike } = usePost(userDoc, item);
  const [comment, setComment] = useState("");
  const [commentState, setCommentState] = useRecoilState(CommentState);

  //   useEffect(() => {
  //     getComments(item);
  //   }, []);

  const handleAddComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (comment.length > 0) {
      await addComment(comment, item.id as string);
      setComment("");
      //   event.target.reset();
    }
  };

  return (
    <Modal size="4xl" isOpen={open} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        {/* <ModalHeader>
          <Flex justify="center">
            <Text fontSize="12pt" fontWeight={400}>
              Following
            </Text>
          </Flex>
          <Divider border="1px solid" borderColor="gray.300" />
        </ModalHeader> */}
        <ModalCloseButton />
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
                <PostModalHeader userDoc={userDoc} item={item} />

                {loading ? (
                  <ProfilePostLoader />
                ) : (
                  <Stack height="50vh" overflowX="hidden" overflowY="auto">
                    {commentState.comments.map((comment: any) => {
                      return <CommentItem comment={comment} />;
                    })}
                  </Stack>
                )}

                <PostInfoSection
                  onLike={onLike}
                  onUnLike={onUnLike}
                  item={item}
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
