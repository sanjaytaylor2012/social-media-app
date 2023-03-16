import { AuthenticationModalState } from "@/atoms/AuthenticationAtom";
import { auth } from "@/firebase/clientApp";
import AuthModal from "@/Modal/Auth/AuthModal";
import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { Router, useRouter } from "next/router";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRecoilState } from "recoil";

type NavMenuProps = {};

const NavMenu: React.FC<NavMenuProps> = () => {
  const [modalState, setModalState] = useRecoilState(AuthenticationModalState);
  const router = useRouter();
  return (
    <>
      <Menu>
        <MenuButton
          height="40px"
          borderRadius={60}
          // width="200px"
          _hover={{ bg: "gray.100" }}
          cursor="pointer"
          padding="0px 6px"
          width="95%"
        >
          <Flex mt={3} ml={{ base: 2, md: 3 }} mr="auto" align="center">
            <Icon as={AiOutlineMenu} fontSize={20} mr={3} mb={1} />
            <Text fontSize={{ base: "0pt", md: "13pt" }} fontWeight={100}>
              More
            </Text>
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              setModalState(() => ({
                open: true,
              }));
              console.log(modalState.open);
            }}
          >
            Switch Accounts
          </MenuItem>
          <MenuItem
            onClick={() => {
              signOut(auth);
              router.push("/");
            }}
          >
            Log out
          </MenuItem>
        </MenuList>
      </Menu>

      <AuthModal />
    </>
  );
};
export default NavMenu;
