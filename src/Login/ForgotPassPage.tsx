import { Divider, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FiLock } from "react-icons/fi";
import ForgotPassInput from "./Inputs/ForgotPassInput";

type ForgotPassPageProps = { setLoginState: (input: string) => void };

const ForgotPassPage: React.FC<ForgotPassPageProps> = ({ setLoginState }) => {
  return (
    <Flex mt="10vh" align="center" justify="center" direction="column">
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
        <Icon fontSize={70} as={FiLock} mb={3} />
        <Text fontWeight={500}>Trouble logging in?</Text>
        <Text fontSize="10pt" align="center" color="gray.500" mb={2}>
          Enter your email, phone, or username and we'll send you a link to get
          back into your account.
        </Text>
        <ForgotPassInput />
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
        <Text
          onClick={() => setLoginState("SignUp")}
          cursor="pointer"
          fontSize="10pt"
          fontWeight={600}
          _hover={{ color: "gray.400" }}
        >
          Create new account
        </Text>
      </Flex>
      <Flex
        bg="gray.100"
        width="100%"
        height="40px"
        border="1px solid"
        borderColor="gray.300"
        align="center"
        justify="center"
      >
        <Text
          _hover={{ color: "gray.400" }}
          cursor="pointer"
          fontSize="10pt"
          fontWeight={600}
          onClick={() => setLoginState("Login")}
        >
          Back to login
        </Text>
      </Flex>
    </Flex>
  );
};
export default ForgotPassPage;
