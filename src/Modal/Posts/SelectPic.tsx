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
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { MdAddToPhotos } from "react-icons/md";

type SelectPicProps = {
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SelectPic: React.FC<SelectPicProps> = ({ onSelectImage }) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <ModalOverlay />
      <ModalContent width="350px">
        <ModalHeader>
          <Flex justify="center">
            <Text fontSize="12pt" fontWeight={400}>
              Create new post
            </Text>
          </Flex>
          <Divider border="1px solid" borderColor="gray.300" />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack align="center" mb={55}>
            <Icon mt={20} fontSize={60} as={MdAddToPhotos} />
            <Text>Drag photos and videos here</Text>
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
