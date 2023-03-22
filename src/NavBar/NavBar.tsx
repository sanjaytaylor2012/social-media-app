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
    <Stack
      position="fixed"
      top={0}
      border="1px solid"
      borderColor="gray.300"
      width={{ base: "50px", md: "245px" }}
      height="100vh"
      justify="space-around"
    >
      <Image
        pl={5}
        src="/images/Instagram_logo.svg.png"
        height="auto"
        mt={9}
        width={{ base: "0%", md: "70%" }}
      />
      <NavItems />
      <NavMenu />
    </Stack>
  );
};
export default NavBar;
