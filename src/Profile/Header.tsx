import { UserType } from "@/atoms/userAtom";
import { auth } from "@/firebase/clientApp";
import useProfile from "@/hooks/useProfile";
import ViewFollowersModal from "@/Modal/Profile/FollowersModal/ViewFollowersModal";
import ViewFollowingModal from "@/Modal/Profile/FollowingModal/ViewFollowingModal";
import { Button, Flex, Icon, Stack, Text, Image } from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineInstagram } from "react-icons/ai";
import FollowButton from "./FollowButton";
import { v4 as uuidv4 } from "uuid";
import { postState } from "@/atoms/postAtom";
import { useRecoilState } from "recoil";
import { User } from "firebase/auth";

type HeaderProps = {
  userDoc: UserType;
  router: NextRouter;
  user: User | undefined | null;
};

const Header: React.FC<HeaderProps> = ({ userDoc, router, user }) => {
  const [open, setOpen] = useState(false);
  const [openFollowers, setOpenFollowers] = useState(false);
  const { currentProfileState } = useProfile(userDoc);

  return (
    <Flex align={{ base: "top", sm: "center" }} ml={{ base: 5 }} mt={6} mb={4}>
      <Stack mr={5} align="center">
        {userDoc.profilePic === "" ? (
          <Icon
            boxSize={{ base: "80px", sm: "150px" }}
            as={AiOutlineInstagram}
          />
        ) : (
          <Image
            objectFit="cover"
            borderRadius="full"
            boxSize={{ base: "80px", sm: "150px" }}
            src={userDoc.profilePic}
          />
        )}
        {userDoc.displayName === user!.email!.split("@")[0] ? (
          <Button
            onClick={() => {
              router.push(`/${userDoc.displayName}/account`);
            }}
            _hover={{ bg: "gray.300" }}
            color="black"
            bg="gray.200"
            height="30px"
            width="90px"
            variant="login"
            display={{ base: "flex", md: "none" }}
          >
            Edit Profile
          </Button>
        ) : (
          <Flex display={{ base: "flex", md: "none" }}>
            <FollowButton displayName={userDoc.displayName} userDoc={userDoc} />
          </Flex>
        )}
      </Stack>

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
              display={{ base: "none", md: "flex" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Flex display={{ base: "none", md: "flex" }}>
              <FollowButton
                displayName={userDoc.displayName}
                userDoc={userDoc}
              />
            </Flex>
          )}
        </Flex>

        <Flex>
          <Flex
            align={{ base: "center" }}
            direction={{ base: "column", sm: "row" }}
            mr={6}
          >
            <Text fontWeight={600} mr={2}>
              {userDoc.numPosts}
            </Text>
            <Text> posts</Text>
          </Flex>

          <Flex
            mr={6}
            align={{ base: "center" }}
            direction={{ base: "column", sm: "row" }}
            _hover={{ color: "gray.400" }}
            onClick={() => setOpenFollowers(true)}
            cursor="pointer"
          >
            <Text fontWeight={600} mr={2}>
              {currentProfileState.totalFollowers}
            </Text>

            <Text> followers</Text>
          </Flex>

          <Flex
            cursor="pointer"
            align={{ base: "center" }}
            _hover={{ color: "gray.400" }}
            direction={{ base: "column", sm: "row" }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Text fontWeight={600} mr={2}>
              {currentProfileState.totalFollowings}
            </Text>
            <Text> following</Text>
          </Flex>
        </Flex>
        {userDoc.bio === "" ? (
          <Text mt={4}>{userDoc.displayName}</Text>
        ) : (
          <Text mt={4} mr={3} maxWidth={{ base: "70vw", sm: "40vw" }}>
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
