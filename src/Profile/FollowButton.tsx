import { UserType } from "@/atoms/userAtom";
import { auth } from "@/firebase/clientApp";
import useProfile from "@/hooks/useProfile";
import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type FollowButtonProps = {
  userDoc: UserType;
  displayName: string;
};

const FollowButton: React.FC<FollowButtonProps> = ({
  userDoc,
  displayName,
}) => {
  const {
    currentUserFollowerStateValue,
    followerStateValue,
    onFollowUnFollow,
    loading,
  } = useProfile(userDoc);
  const [user] = useAuthState(auth);

  //   useEffect(() => {
  //     console.log(isJoined);
  //     followerStateValue.myFollowings.forEach((item) => {
  //       console.log("hi");
  //       console.log("here is item", item);
  //     });
  //   }, []);

  const isJoined = !!currentUserFollowerStateValue.myFollowings.find(
    (item) => item.name === displayName
  );

  return (
    <>
      {isJoined ? (
        <Button
          isLoading={loading}
          _hover={{ bg: "gray.300" }}
          color="black"
          bg="gray.200"
          height="30px"
          variant="login"
          onClick={() => {
            onFollowUnFollow(displayName, isJoined);
          }}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          isLoading={loading}
          height="30px"
          onClick={() => {
            onFollowUnFollow(displayName, isJoined);
          }}
          variant="login"
        >
          Follow
        </Button>
      )}
    </>
  );
};
export default FollowButton;
