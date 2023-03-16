import { Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Inputs from "./Inputs/SignInInputs";
import OAuth from "./Inputs/OAuth";
import SignUpInputs from "./Inputs/SignUpInputs";

type SignUpProps = { setLoginState: (input: string) => void };

const SignUp: React.FC<SignUpProps> = ({ setLoginState }) => {
  return (
    <Flex mt="10vh" align="center" justify="center" direction="column">
      <Flex
        direction="column"
        align="center"
        width="400px"
        border="1px solid"
        borderColor="gray.300"
        pt={4}
        pb={4}
        pl={10}
        pr={10}
      >
        <Image
          src="/images/Instagram_logo.svg.png"
          maxWidth="50%"
          height="auto"
          mb={9}
        />
        <Text align="center" fontWeight={800} color="gray.500" mb={5}>
          Sign up to see photos and videos from your friends.
        </Text>
        {/* <Button width="100%" variant="login" bg="blue.400">
          <OAuth />
        </Button>
        <Flex align="center" width="100%">
          <Divider
            orientation="horizontal"
            border="1px solid"
            color="gray.400"
          />

          <Text m={4} color="gray.500" fontSize="10pt">
            OR
          </Text>
          <Divider
            orientation="horizontal"
            color="gray.400"
            border="1px solid"
          />
        </Flex> */}

        <SignUpInputs />
      </Flex>
      <Flex
        mt={4}
        justify="center"
        width="400px"
        border="1px solid"
        borderColor="gray.300"
        p={5}
      >
        <Text fontSize={15}>Have an account? </Text>
        <Text
          onClick={() => {
            setLoginState("Login");
          }}
          fontWeight={400}
          fontSize={15}
          ml={2}
          cursor="pointer"
          color="blue.300"
        >
          Log in
        </Text>
      </Flex>
    </Flex>
  );
};
export default SignUp;
