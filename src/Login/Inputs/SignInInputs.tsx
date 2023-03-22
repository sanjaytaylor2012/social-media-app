import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { Input, Button, Text, useAccordion } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

type InputsProps = {};

const Inputs: React.FC<InputsProps> = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [user1] = useAuthState(auth);
  const [showHome, setShowHome] = useState(false);

  const router = useRouter();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(login.username, login.password);
    // router.push(`/${user1!.email!.split("@")[0]}/home`);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        onChange={onChange}
        required
        name="username"
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
        mb={2}
        bg="gray.50"
      />
      <Input
        onChange={onChange}
        required
        name="password"
        placeholder="Password"
        _placeholder={{ fontSize: "10pt" }}
        focusBorderColor="white"
        _focus={{
          outline: "none",
          bg: "white",
          border: "0.5px solid",
          borderColor: "gray.400",
        }}
        type="password"
        bg="gray.50"
        mb={4}
      />

      <Button width="100%" variant="login" type="submit">
        <Text fontWeight="500" fontSize="12pt">
          Log in
        </Text>
      </Button>
      <Text textAlign="center" color="red" fontSize="10pt" mt={4}>
        {
          FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]
          //casting error message to a type of FIREBASE_ERRORS so that typescript is chill
        }
      </Text>
    </form>
  );
};
export default Inputs;
