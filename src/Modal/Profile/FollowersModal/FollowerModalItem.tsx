import { followProfile, UserType } from "@/atoms/userAtom";
import ProfilePic from "@/CommonlyUsed/profilePic";
import { Flex, Icon, Button, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import router from "next/router";
import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import FollowButtonModal from "./FollowButtonModal";

type FollowerModalItemProps = {
  item: followProfile;
  userDoc: UserType;
  user: User | null | undefined;
  setOpenFollowers: (input: boolean) => void;
};

const FollowerModalItem: React.FC<FollowerModalItemProps> = ({
  item,
  userDoc,
  user,
  setOpenFollowers,
}) => {
  return (
    <Flex align="center" width="100%" justify="space-between">
      <Flex align="center">
        <ProfilePic source={item.profilePic} />
        <Text ml={4}>{item.name}</Text>
      </Flex>
      {userDoc.displayName === user!.email!.split("@")[0] ? (
        <FollowButtonModal displayName={item.name} userDoc={userDoc} />
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
};
export default FollowerModalItem;
