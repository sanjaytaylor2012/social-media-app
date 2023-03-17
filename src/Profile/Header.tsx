import { UserType } from "@/atoms/userAtom";
import { auth } from "@/firebase/clientApp";
import useProfile from "@/hooks/useProfile";
import ViewFollowersModal from "@/Modal/Profile/FollowersModal/ViewFollowersModal";
import ViewFollowingModal from "@/Modal/Profile/FollowingModal/ViewFollowingModal";
import { Button, Flex, Icon, Stack, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineInstagram } from "react-icons/ai";
import FollowButton from "./FollowButton";
import { v4 as uuidv4 } from "uuid";

type HeaderProps = { userDoc: UserType };

const Header: React.FC<HeaderProps> = ({ userDoc }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [openFollowers, setOpenFollowers] = useState(false);
  const { followerStateValue, myFollowersStateValue } = useProfile(userDoc);

  // useEffect(() => {
  //   console.log("user.DisplayName", user!.email!.split("@")[0]);
  //   console.log("userDoc.DisplayName", userDoc.displayName);
  // }, [user]);

  return (
    <Flex align="center" mt={6} ml={39} mb={4}>
      {userDoc.profilePic === "" ? (
        <Icon fontSize={150} as={AiOutlineInstagram} mr={20} />
      ) : (
        <Image
          objectFit="cover"
          borderRadius="full"
          boxSize="150px"
          src={userDoc.profilePic}
          mr={5}
        />
      )}

      <Stack>
        <Flex align="center" mb={4}>
          <Text fontSize="20pt" mr={5}>
            {userDoc.displayName}
          </Text>
          {userDoc.displayName === user!.email!.split("@")[0] ? (
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
          ) : (
            <FollowButton displayName={userDoc.displayName} userDoc={userDoc} />
          )}
        </Flex>

        <Flex>
          <Flex mr={6}>
            <Text fontWeight={600} mr={2}>
              {userDoc.numPosts}
            </Text>
            <Text> posts</Text>
          </Flex>

          {user!.email!.split("@")[0] === userDoc.displayName ? (
            <Flex
              mr={6}
              _hover={{ color: "gray.400" }}
              onClick={() => setOpenFollowers(true)}
              cursor="pointer"
            >
              <Text fontWeight={600} mr={2}>
                {myFollowersStateValue.totalFollowers}
              </Text>

              <Text> followers</Text>
            </Flex>
          ) : (
            <Flex mr={6}>
              <Text fontWeight={600} mr={2}>
                {myFollowersStateValue.totalFollowers}
              </Text>

              <Text> followers</Text>
            </Flex>
          )}

          {user!.email!.split("@")[0] === userDoc.displayName ? (
            <Flex
              _hover={{ color: "gray.400" }}
              cursor="pointer"
              mr={6}
              onClick={() => setOpen(true)}
            >
              <Text fontWeight={600} mr={2}>
                {followerStateValue.totalFollowings}
              </Text>

              <Text> following</Text>
            </Flex>
          ) : (
            <Flex mr={6}>
              <Text fontWeight={600} mr={2}>
                {followerStateValue.totalFollowings}
              </Text>

              <Text> following</Text>
            </Flex>
          )}
        </Flex>
        {userDoc.bio === "" ? (
          <Text mt={4}>{userDoc.displayName}</Text>
        ) : (
          <Text mt={4} mr={3} maxWidth="40vw">
            {userDoc.bio}
          </Text>
        )}
      </Stack>

      <ViewFollowingModal
        key={userDoc.displayName}
        userDoc={userDoc}
        open={open}
        setOpen={setOpen}
      />

      <ViewFollowersModal
        key={userDoc.uid}
        userDoc={userDoc}
        openFollowers={openFollowers}
        setOpenFollowers={setOpenFollowers}
      />
    </Flex>
  );
};
export default Header;
