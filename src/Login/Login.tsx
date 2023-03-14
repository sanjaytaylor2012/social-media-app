import {
  Flex,
  Image,
  Input,
  Button,
  Text,
  Stack,
  Box,
  Divider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Inputs from "./Inputs/SignInInputs";
import OAuth from "./Inputs/OAuth";
import SignUp from "./SignUpPage";
import LoginPage from "./LoginPage";
import ForgotPassPage from "./ForgotPassPage";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [loginState, setLoginState] = useState("Login");

  return (
    <Flex justify="center">
      {loginState === "Login" && <LoginPage setLoginState={setLoginState} />}
      {loginState === "SignUp" && <SignUp setLoginState={setLoginState} />}
      {loginState === "forgotPass" && (
        <ForgotPassPage setLoginState={setLoginState} />
      )}
    </Flex>
  );
};
export default Login;
