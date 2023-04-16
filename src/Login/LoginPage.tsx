import { Flex, Divider, Image, Text } from "@chakra-ui/react";
import React from "react";
import ForgotPass from "./Inputs/ForgotPassInput";
import OAuth from "./Inputs/OAuth";
import Inputs from "./Inputs/SignInInputs";

type LoginPageProps = { setLoginState: (input: string) => void };

const LoginPage: React.FC<LoginPageProps> = ({ setLoginState }) => {
  return (
    <Flex mt="10vh" align="center" justify="center">
      <Image
        src="/images/loging.png"
        height="500px"
        width={{ base: "0", md: "unset" }}
      />

      <Flex align="center" direction="column">
        <Flex
          direction="column"
          align="center"
          width={{ base: "350px", sm: "400px" }}
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
          <Inputs />
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
          </Flex>
          {/* <OAuth /> */}
          <Text
            mt={10}
            cursor="pointer"
            fontSize="10pt"
            onClick={() => setLoginState("forgotPass")}
          >
            Forgot password?
          </Text>
        </Flex>
        <Flex
          mt={4}
          justify="center"
          width={{ base: "350px", sm: "400px" }}
          border="1px solid"
          borderColor="gray.300"
          p={5}
        >
          <Text fontSize={15}>Don't have an account? </Text>
          <Text
            onClick={() => {
              setLoginState("SignUp");
            }}
            fontWeight={550}
            fontSize={15}
            ml={2}
            cursor="pointer"
            color="blue.300"
          >
            Sign up
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default LoginPage;
