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

type DeletePostModalProps = {
  open: boolean;
  setOpen: (input: boolean) => void;
  userDoc: UserType;
  item: Post;
  user: User | null | undefined;
};

const DeletePostModal: React.FC<DeletePostModalProps> = ({
  open,
  setOpen,
  userDoc,
  item,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeletePost = async () => {
    try {
      setLoading(true);
      const batch = writeBatch(firestore);

      batch.delete(
        doc(firestore, `users/${user!.email!.split("@")[0]}/posts/${item.id}`)
      );

      const imageRef = ref(storage, `posts/${item.id}/image`);
      deleteObject(imageRef);
      const docRef = doc(firestore, `users/${user!.email!.split("@")[0]}`);

      batch.update(docRef, {
        numPosts: increment(-1),
      });

      batch.commit();
      router.reload();
    } catch (error: any) {
      console.log("handleCreatePost error: ", error.message);
    }
  };

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent width="350px">
        <ModalBody>
          <Flex justify="center">
            <Text onClick={handleDeletePost} cursor="pointer" color="blue.500">
              Delete Post
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default DeletePostModal;
