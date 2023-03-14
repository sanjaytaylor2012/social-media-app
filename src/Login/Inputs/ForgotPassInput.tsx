import { auth } from "@/firebase/clientApp";
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";

type ForgotPassInputProps = {};

const ForgotPassInput: React.FC<ForgotPassInputProps> = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendPasswordResetEmail(email);
    setSuccess(true);
  };

  return (
    <form onSubmit={onSubmit}>
      <Flex direction="column">
        <Input
          width="300px"
          onChange={(event) => setEmail(event.target.value)}
          required
          name="email"
          placeholder="Email"
          _placeholder={{ fontSize: "10pt" }}
          focusBorderColor="white"
          _focus={{
            outline: "none",
            bg: "white",
            border: "0.5px solid",
            borderColor: "gray.400",
          }}
          type="email"
          mb={4}
          bg="gray.50"
        />
        <Button width="100%" variant="login" type="submit">
          Send login link
        </Button>
        {success && <Text>Email sent!</Text>}
      </Flex>
    </form>
  );
};
export default ForgotPassInput;
