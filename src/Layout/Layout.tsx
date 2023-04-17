import React, { ReactNode, use, useEffect, useState } from "react";
import NavBar from "@/NavBar/NavBar";
import { Flex, Spinner, Stack } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import LoginPage from "../Login/Login";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { User } from "firebase/auth";
import PostLoader from "./PostLoader";
import { useRouter } from "next/router";
import InstagramBannerTop from "@/NavBar/InstagramBannerTop";
import { useRecoilState } from "recoil";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      router.push(`/${user!.email!.split("@")[0]}/home`);
    }
  }, [user]);

  return (
    <>
      {user && (
        <Flex
          direction={{ base: "column-reverse", sm: "row", md: "row" }}
          // ml={{ base: "25vw", sm: "0vw", md: "0vw" }}
        >
          <NavBar />
          <Flex justify="center" height="100%" width="100%">
            <main>{children}</main>
          </Flex>
          <InstagramBannerTop />
        </Flex>
      )}
      {loading && <PostLoader />}
      {user === null && <LoginPage />}
    </>
  );
};

export default Layout;
