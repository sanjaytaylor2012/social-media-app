import { Story } from "@/atoms/storiesAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  Divider,
  ModalCloseButton,
  ModalBody,
  Stack,
  Icon,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
  increment,
  serverTimestamp,
  Timestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdAddToPhotos } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

type ViewStoryModalProps = {
  selectedFile: string;
  setSelectedModal: (input: string) => void;
  setOpenNewStoryModal: (input: boolean) => void;
};

const ViewStoryModal: React.FC<ViewStoryModalProps> = ({
  selectedFile,
  setSelectedModal,
  setOpenNewStoryModal,
}) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const handleCreateStory = async () => {
    const id = uuidv4();

    const newStory: Story = {
      createdAt: serverTimestamp() as Timestamp,
      creatorName: user!.email!.split("@")[0],
      id: id,
      src: selectedFile,
    };

    try {
      setLoading(true);
      const batch = writeBatch(firestore);

      const postDocRef = doc(firestore, `stories/${id}`);
      batch.set(postDocRef, newStory);

      await batch.commit();

      const imageRef = ref(storage, `stories/${id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, {
        src: downloadURL,
      });

      const userDoc = await getDoc(
        doc(firestore, `users/${user!.email!.split("@")[0]}`)
      );

      await updateDoc(postDocRef, {
        creatorProfilePic: userDoc!.data()!.profilePic,
      });

      setLoading(false);
      setOpenNewStoryModal(false);
    } catch (error: any) {
      console.log("create story error: ", error.message);
    }
  };

  return (
    <>
      <ModalOverlay />
      <ModalContent width="350px">
        <ModalHeader>
          <Flex justify="center">
            <Text fontSize="12pt" fontWeight={400}>
              View Story
            </Text>
          </Flex>
          <Divider border="1px solid" borderColor="gray.300" />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack align="center">
            <Image src={selectedFile} />
            <Button
              isLoading={loading}
              onClick={handleCreateStory}
              variant="login"
            >
              Post
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </>
  );
};
export default ViewStoryModal;
