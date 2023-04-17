import { Post } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
import { firestore, storage } from "@/firebase/clientApp";
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
  Button,
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
import { useRecoilState } from "recoil";

type ViewLikesModalProps = {
  item: Post;
  open: boolean;
  setOpen: (input: boolean) => void;
};

const ViewLikesModal: React.FC<ViewLikesModalProps> = ({
  item,
  open,
  setOpen,
}) => {
  const router = useRouter();

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent width="350px">
        <ModalBody>
          {item.likeProfiles.length != 0 &&
            item.likeProfiles.map((item) => {
              return (
                <Flex align="center" justify="space-between">
                  <Flex align="center">
                    <Image
                      objectFit="cover"
                      borderRadius="full"
                      boxSize="40px"
                      src={item.profilePic}
                      mr={4}
                    />
                    <Text>{item.name}</Text>
                  </Flex>
                  <Button
                    height="30px"
                    variant="login"
                    onClick={() => {
                      router.push(`/${item.name}`);
                      router.reload();
                    }}
                  >
                    View Profile
                  </Button>
                </Flex>
              );
            })}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default ViewLikesModal;
