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
import React, { useRef } from "react";
import { MdAddToPhotos } from "react-icons/md";

type SelectPicProps = {
  //   openNewStoryModal: boolean;
  //   setOpenNewStoryModal: (input: boolean) => void;
  setSelectedFile: (input: string) => void;
  //   setOpenViewStoryModal: (input: boolean) => void;
  setSelectedModal: (input: string) => void;
};

const SelectPic: React.FC<SelectPicProps> = ({
  //   openNewStoryModal,
  setSelectedFile,
  //   setOpenNewStoryModal,
  //   setOpenViewStoryModal,
  setSelectedModal,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  const onSelectImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        let image = new Image();
        image.src = readerEvent.target?.result as string;
        setSelectedFile(readerEvent.target?.result as string);
        // setOpenNewStoryModal(false);
        // setOpenViewStoryModal(true);

        setSelectedModal("ViewImage");
      }
    };
  };

  return (
    <>
      <ModalOverlay />
      <ModalContent width="350px">
        <ModalHeader>
          <Flex justify="center">
            <Text fontSize="12pt" fontWeight={400}>
              Create new Story
            </Text>
          </Flex>
          <Divider border="1px solid" borderColor="gray.300" />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack align="center" mb={55}>
            <Icon mt={20} fontSize={60} as={MdAddToPhotos} />
            <Text>Drag photos here</Text>
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
    </>
  );
};
export default SelectPic;
