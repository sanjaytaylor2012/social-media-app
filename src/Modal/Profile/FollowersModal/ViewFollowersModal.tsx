import { followProfile, UserType } from "@/atoms/userAtom";
import { auth } from "@/firebase/clientApp";
import useProfile from "@/hooks/useProfile";
import FollowButton from "@/Profile/FollowButton";
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
  Icon,
  Button,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineInstagram } from "react-icons/ai";
import { MdAddToPhotos } from "react-icons/md";
import FollowButtonModal from "./FollowButtonModal";
import FollowerModalItem from "./FollowerModalItem";

type ViewFollowingModalProps = {
  openFollowers: boolean;
  setOpenFollowers: (input: boolean) => void;
  userDoc: UserType;
};

const ViewFollowingModal: React.FC<ViewFollowingModalProps> = ({
  openFollowers,
  setOpenFollowers,
  userDoc,
}) => {
  const { currentProfileState } = useProfile(userDoc);
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <Modal isOpen={openFollowers} onClose={() => setOpenFollowers(false)}>
      <ModalOverlay />
      <ModalContent width="350px">
        <ModalHeader>
          <Flex justify="center">
            <Text fontSize="12pt" fontWeight={400}>
              Followers
            </Text>
          </Flex>
          <Divider border="1px solid" borderColor="gray.300" />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack align="center">
            {currentProfileState.myFollowers.map((item) => {
              return (
                <FollowerModalItem
                  item={item}
                  userDoc={userDoc}
                  user={user}
                  setOpenFollowers={setOpenFollowers}
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
