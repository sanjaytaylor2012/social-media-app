import { AuthenticationModalState } from "@/atoms/AuthenticationAtom";
import SignInInputs from "@/Login/Inputs/SignInInputs";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import SignInModal from "./SignInModal";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const [modalState, setModalState] = useRecoilState(AuthenticationModalState);

  const handleClose = () => {
    setModalState(() => ({ open: false }));
  };

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent width="350px">
          <ModalCloseButton />
          <Stack align="center">
            <ModalBody>
              <Stack align="center">
                <Image
                  maxWidth="50%"
                  height="auto"
                  mb={9}
                  mt={10}
                  src="/images/Instagram_logo.svg.png"
                />
                <SignInModal handleClose={handleClose} />
              </Stack>
            </ModalBody>

            <ModalFooter></ModalFooter>
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
