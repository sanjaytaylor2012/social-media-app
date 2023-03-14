import { UserType } from "@/atoms/userAtom";
import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";

type HeaderProps = { userDoc: UserType };

const Header: React.FC<HeaderProps> = ({ userDoc }) => {
  const router = useRouter();

  return (
    <Flex align="center" mt={6} ml={39} mb={4}>
      {userDoc.profilePic === "" ? (
        <Icon fontSize={150} as={AiOutlineInstagram} mr={20} />
      ) : (
        <img src={userDoc.profilePic} />
      )}

      <Stack>
        <Flex align="center" mb={4}>
          <Text fontSize="20pt" mr={5}>
            {userDoc.displayName}
          </Text>
          <Button
            onClick={() => {
              router.push(`/${userDoc.displayName}/account`);
            }}
            _hover={{ bg: "gray.300" }}
            color="black"
            bg="gray.200"
            height="30px"
            variant="login"
          >
            Edit Profile
          </Button>
        </Flex>

        <Flex>
          <Flex mr={6}>
            <Text fontWeight={600} mr={2}>
              {userDoc.numPosts}
            </Text>
            <Text> posts</Text>
          </Flex>
          <Flex mr={6}>
            <Text fontWeight={600} mr={2}>
              {userDoc.followers}
            </Text>
            <Text> followers</Text>
          </Flex>
          <Flex mr={6}>
            <Text fontWeight={600} mr={2}>
              {userDoc.following}
            </Text>
            <Text> following</Text>
          </Flex>
        </Flex>
        {userDoc.bio === "" ? (
          <Text mt={4}>{userDoc.displayName}</Text>
        ) : (
          <Text mt={4} mr={3} maxWidth="40vw">
            {userDoc.bio}
          </Text>
        )}
      </Stack>
    </Flex>
  );
};
export default Header;
