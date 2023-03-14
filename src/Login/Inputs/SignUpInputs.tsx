import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { Input, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

type InputsProps = {};

const Inputs: React.FC<InputsProps> = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const [error, setError] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    if (login.password !== login.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      createUserWithEmailAndPassword(login.email, login.password);
    } catch (error: any) {
      console.log("createUser error:", error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        onChange={onChange}
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
        mb={2}
      />

      <Input
        onChange={onChange}
        required
        name="confirmPassword"
        placeholder="Confirm password"
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

      <Button type="submit" width="100%" variant="login" isLoading={loading}>
        <Text fontWeight="500" fontSize="12pt">
          Sign up
        </Text>
      </Button>
      <Text textAlign="center" color="red" fontSize="10pt" mt={4}>
        {
          error ||
            FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]
          //casting error message to a type of FIREBASE_ERRORS so that typescript is chill
        }
      </Text>
    </form>
  );
};
export default Inputs;
