import { auth } from "@/firebase/clientApp";
import { Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

type OAuthProps = {};

export type loaded = {
  load: boolean;
};

const OAuth: React.FC<OAuthProps> = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <Flex
      align="center"
      justify="center"
      cursor="pointer"
      onClick={() => {
        signInWithGoogle();
      }}
    >
      <Image height="20px" src="/images/googlelogo.png" mr={2} />
      <Text fontWeight={400}>Log in with Google</Text>
    </Flex>
  );
};

export default OAuth;
