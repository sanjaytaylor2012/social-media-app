import { UserType } from "@/atoms/userAtom";
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
import React from "react";
import FollowingProfileItem from "./FollowingProfileItem";

type ViewFollowingModalProps = {
  open: boolean;
  setOpen: (input: boolean) => void;
  userDoc: UserType;
};

const ViewFollowingModal: React.FC<ViewFollowingModalProps> = ({
  open,
  setOpen,
  userDoc,
}) => {
  const { followerStateValue } = useProfile(userDoc);

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent width="350px">
        <ModalHeader>
          <Flex justify="center">
            <Text fontSize="12pt" fontWeight={400}>
              Following
            </Text>
          </Flex>
          <Divider border="1px solid" borderColor="gray.300" />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack align="center">
            {followerStateValue.myFollowings.map((item) => {
              return (
                <FollowingProfileItem
                  key={item.name}
                  item={item}
                  userDoc={userDoc}
                />
              );
            })}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default ViewFollowingModal;
