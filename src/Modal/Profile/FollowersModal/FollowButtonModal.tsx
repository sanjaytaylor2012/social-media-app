import { UserType } from "@/atoms/userAtom";
import { auth } from "@/firebase/clientApp";
import useProfile from "@/hooks/useProfile";
import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type FollowButtonModalProps = {
  userDoc: UserType;
  displayName: string;
};

const FollowButtonModal: React.FC<FollowButtonModalProps> = ({
  userDoc,
  displayName,
}) => {
  const { loading, removeFollower } = useProfile(userDoc);
  const [user] = useAuthState(auth);

  return (
    <>
      <Button
        borderRadius={7}
        isLoading={loading}
        height="30px"
        _hover={{ bg: "gray.300" }}
        color="black"
        bg="gray.200"
        onClick={() => {
          removeFollower(displayName);
        }}
      >
        Remove Follower
      </Button>
    </>
  );
};
export default FollowButtonModal;
