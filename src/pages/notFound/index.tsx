import { auth } from "@/firebase/clientApp";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type indexProps = {};

const index: React.FC<indexProps> = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  return (
    <Stack mt={4} ml={4}>
      <Button
        height="30px"
        variant="login"
        onClick={() => {
          router.push(`/${user!.email!.split("@")[0]}/home`);
        }}
      >
        Return Home
      </Button>
    </Stack>
  );
};
export default index;
