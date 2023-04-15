import { followProfile, UserType } from "@/atoms/userAtom";
import ProfilePic from "@/CommonlyUsed/ProfilePic";
import { auth } from "@/firebase/clientApp";
import useProfile from "@/hooks/useProfile";
import FollowButton from "@/Profile/FollowButton";
import { Flex, Image, Icon, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineInstagram } from "react-icons/ai";

type FollowingProfileItemProps = {
  item: followProfile;
  userDoc: UserType;
  setOpen: (input: boolean) => void;
};

const FollowingProfileItem: React.FC<FollowingProfileItemProps> = ({
  item,
  userDoc,
  setOpen,
}) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { unFollow } = useProfile(userDoc);

  return (
    <Flex align="center" width="100%" justify="space-between">
      <Flex align="center">
        <ProfilePic source={item.profilePic} />
        <Text ml={4}>{item.name}</Text>
      </Flex>
      {userDoc.displayName === user!.email!.split("@")[0] ? (
        <Button
          _hover={{ bg: "gray.300" }}
          color="black"
          bg="gray.200"
          height="30px"
          variant="login"
          onClick={() => {
            unFollow(item.name);
          }}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          variant="login"
          height="30px"
          onClick={() => {
            router.push(`/${item.name}`);
            setOpen(false);
          }}
        >
          View Profile
        </Button>
      )}
    </Flex>
  );
};
export default FollowingProfileItem;
