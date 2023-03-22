import { followProfile, UserType } from "@/atoms/userAtom";
import { auth } from "@/firebase/clientApp";
import FollowButton from "@/Profile/FollowButton";
import { Flex, Image, Icon, Button } from "@chakra-ui/react";
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
  return (
    <Flex width="100%" justify="space-between">
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
        <FollowButton displayName={item.name} userDoc={userDoc} />
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
