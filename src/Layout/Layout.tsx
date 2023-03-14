import React, { ReactNode, use, useEffect, useState } from "react";
import NavBar from "@/NavBar/NavBar";
import { Flex } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import LoginPage from "../Login/Login";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { User } from "firebase/auth";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // console.log("here is data", user);
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? (
        <Flex>
          <NavBar />
          <main>{children}</main>
        </Flex>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default Layout;
