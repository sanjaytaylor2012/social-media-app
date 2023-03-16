import { UserType } from "@/atoms/userAtom";
import { firestore, storage } from "@/firebase/clientApp";
import {
  Flex,
  Icon,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Image,
  Modal,
} from "@chakra-ui/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";
import React, {
  ReactEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BsArrowLeft } from "react-icons/bs";
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type ImageViewProps = {
  setSelectedFile: (input: string) => void;
  selectedFile: string;
  userDoc: UserType;
  imageModal: boolean;
  setImageModal: (input: boolean) => void;
  setOpen: (input: boolean) => void;
};

const ImageView: React.FC<ImageViewProps> = ({
  setSelectedFile,
  selectedFile,
  userDoc,
  imageModal,
  setImageModal,
  setOpen,
}) => {
  const router = useRouter();

  const onSelectImage = async () => {
    try {
      const picRef = doc(
        firestore,
        `users/${userDoc.displayName}`
        // "profilePic"
      );
      const postDocRef = await getDoc(picRef);

      if (selectedFile) {
        const imageRef = ref(storage, `profilePics/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        //update post doc with image file
        await updateDoc(picRef, {
          profilePic: downloadURL,
        });

        setImageModal(false);
        router.reload();
      }
    } catch (error) {}
  };

  return (
    <>
      <Modal isOpen={imageModal} onClose={() => setImageModal(false)}>
        <ModalOverlay />
        <ModalContent width="350px">
          <ModalHeader>
            <Flex justify="space-between" align="center">
              <Icon
                onClick={() => {
                  setSelectedFile("");
                  setImageModal(false);
                  setOpen(true);
                }}
                cursor="pointer"
                fontSize={30}
                as={BsArrowLeft}
              />
              <Text fontWeight={400} fontSize="12pt">
                View image
              </Text>
              <Text
                cursor="pointer"
                color="blue.400"
                fontWeight={400}
                fontSize="12pt"
                onClick={onSelectImage}
              >
                Save
              </Text>
            </Flex>
          </ModalHeader>

          <ModalBody>
            <Image src={selectedFile} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ImageView;
