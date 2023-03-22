import { followProfile, UserStates, UserType } from "@/atoms/userAtom";
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
  const { myFollowersStateValue } = useProfile(userDoc);
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
            {myFollowersStateValue.myFollowers.map((item) => {
              return (
                <Flex width="100%" key={item.name} justify="space-between">
                  <Flex>
                    {item.profilePic === "" ? (
                      <Icon fontSize={29} as={AiOutlineInstagram} mr={2} />
                    ) : (
                      <Image
                        objectFit="cover"
                        borderRadius="full"
                        boxSize="40px"
                        src={item.profilePic}
                        mr={2}
                      />
                    )}
                    {item.name}
                  </Flex>
                  {userDoc.displayName === user!.email!.split("@")[0] ? (
                    <FollowButtonModal
                      displayName={item.name}
                      userDoc={userDoc}
                    />
                  ) : (
                    <Button
                      variant="login"
                      height="30px"
                      onClick={() => {
                        router.push(`/${item.name}`);
                        setOpenFollowers(false);
                      }}
                    >
                      View Profile
                    </Button>
                  )}
                </Flex>
              );
            })}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default ViewFollowingModal;
