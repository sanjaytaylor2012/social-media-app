import { Post } from "@/atoms/postAtom";
import PostItem from "@/HomeScreen/PostItem/PostItem";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { NextRouter } from "next/router";
import React from "react";
import MobilePostItem from "./MobilePostItem";

type MobilePostModalProps = {
  item: Post;
  isOpen: boolean;
  setClose: (input: boolean) => void;
  user: User | undefined | null;
  router: NextRouter;
};

const MobilePostModal: React.FC<MobilePostModalProps> = ({
  isOpen,
  setClose,
  item,
  user,
  router,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setClose(false)}>
      <ModalOverlay />
      <ModalContent my="0rem" height={"100vh"} width="100vw">
        <ModalHeader>Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody width={"100vw"}>
          <MobilePostItem user={user} router={router} item={item} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default MobilePostModal;
