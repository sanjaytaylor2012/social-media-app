import { Post } from "@/atoms/postAtom";
import PostItem from "@/HomeScreen/PostItem";
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
import React from "react";
import MobilePostItem from "./MobilePostItem";

type MobilePostModalProps = {
  item: Post;
  isOpen: boolean;
  setClose: (input: boolean) => void;
};

const MobilePostModal: React.FC<MobilePostModalProps> = ({
  isOpen,
  setClose,
  item,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setClose(false)}>
      <ModalOverlay />
      <ModalContent my="0rem" height={"100vh"} width="100vw">
        <ModalHeader>Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody width={"100vw"}>
          <MobilePostItem item={item} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default MobilePostModal;
