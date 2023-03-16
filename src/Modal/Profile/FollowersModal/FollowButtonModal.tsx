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
  const { followerStateValue, onFollowUnFollow, loading, removeFollower } =
    useProfile(userDoc);
  const [user] = useAuthState(auth);

  //   useEffect(() => {
  //     console.log(isJoined);
  //     followerStateValue.myFollowings.forEach((item) => {
  //       console.log("hi");
  //       console.log("here is item", item);
  //     });
  //   }, []);

  const isJoined = !!followerStateValue.myFollowings.find(
    (item) => item.name === displayName
  );

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
