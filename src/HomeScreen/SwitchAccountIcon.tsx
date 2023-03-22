import { AuthenticationModalState } from "@/atoms/AuthenticationAtom";
import { UserType } from "@/atoms/userAtom";
import DeletePostModal from "@/Modal/Profile/PostModal/DeletePostModal/DeletePostModal";
import { Flex, Icon, Divider, Text, Image, Button } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useRecoilState } from "recoil";

type SwitchAccountIconProps = {
  profilePic: string;
  user: User | null | undefined;
};

const SwitchAccountIcon: React.FC<SwitchAccountIconProps> = ({
  profilePic,
  user,
}) => {
  const [modalState, setModalState] = useRecoilState(AuthenticationModalState);

  return (
    <>
      <Flex align="center" justify="space-between" width="100%">
        <Flex align="center">
          {profilePic === "" ? (
            <Icon fontSize={40} mr={1} as={AiOutlineInstagram} />
          ) : (
            <Image
              objectFit="cover"
              borderRadius="full"
              boxSize="40px"
              src={profilePic}
              mr={1}
            />
          )}
          <Text fontWeight="600">{user!.email!.split("@")[0]}</Text>
        </Flex>
        <Text
          onClick={() => {
            setModalState(() => ({
              open: true,
            }));
          }}
          color="blue.500"
          cursor="pointer"
        >
          Switch
        </Text>
      </Flex>

      <Divider width="100%" color="gray.300" border="1px solid" />
      <Flex align="top"></Flex>
    </>
  );
};
export default SwitchAccountIcon;
