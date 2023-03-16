import { UserType } from "@/atoms/userAtom";
import { firestore, storage } from "@/firebase/clientApp";
import {
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
  Modal,
} from "@chakra-ui/react";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import React, { useRef, useState } from "react";
import { MdAddToPhotos } from "react-icons/md";

type SelectPicProps = {
  setSelectedFile: (input: string) => void;
  selectedFile: string;
  open: boolean;
  setOpen: (input: boolean) => void;
  userDoc: UserType;
  setImageModal: (input: boolean) => void;
};

const SelectPic: React.FC<SelectPicProps> = ({
  selectedFile,
  setSelectedFile,
  open,
  setOpen,
  userDoc,
  setImageModal,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  const onSelectImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as string);
      }
    };
    setOpen(false);
    setImageModal(true);
  };

  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent width="350px">
          <ModalHeader>
            <Flex justify="center">
              <Text fontSize="12pt" fontWeight={400}>
                Change Profile Picture
              </Text>
            </Flex>
            <Divider border="1px solid" borderColor="gray.300" />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack align="center" mb={55}>
              <Icon mt={20} fontSize={60} as={MdAddToPhotos} />
              <Text>Drag a photo </Text>
              <Button
                fontWeight={500}
                height="30px"
                variant="login"
                bg="blue.400"
                onClick={() => {
                  selectedFileRef.current?.click();
                }}
              >
                Select from computer
              </Button>
              <input
                ref={selectedFileRef}
                type="file"
                hidden
                onChange={onSelectImage}
              />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default SelectPic;
