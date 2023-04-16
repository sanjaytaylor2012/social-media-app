import { auth } from "@/firebase/clientApp";
import { Flex, Icon, Image, Stack, Button, Text, Show } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiSearch } from "react-icons/bi";
import { MdHomeFilled } from "react-icons/md";
import NavItems from "./NavItems";
import NavMenu from "./NavMenu";

const NavBar: React.FC = () => {
  return (
    <Flex
      direction={{ base: "row", sm: "column", md: "column" }}
      // position="fixed"
      // left={0}
      border="1px solid"
      borderColor="gray.300"
      width={["100%", "50px", "245px"]}
      height={["5vh", "100vh", "100vh"]}
      justify={{ base: "center", sm: "space-around", md: "space-around" }}
      mr={{ base: "5vw", sm: "12vw", md: "5vw" }}
      position={{ base: "fixed", sm: "unset" }}
      bottom={0}
      backgroundColor="white"
    >
      <Flex align="center">
        {/* <Text mt={10} mr={-5}>
          not
        </Text> */}
        <Image
          pl={5}
          src="/images/Instagram_logo.svg.png"
          height="auto"
          mt={9}
          width={{ base: "0%", sm: "0%", md: "70%" }}
          display={{ base: "none" }}
        />
      </Flex>
      <NavItems />
      <Flex display={{ base: "none", sm: "flex" }}>
        <NavMenu />
      </Flex>
    </Flex>
  );
};
export default NavBar;
