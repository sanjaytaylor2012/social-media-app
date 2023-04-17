import React, { useState } from "react";
import { Flex, Icon, Image, Stack, Button, Text } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import {
  AiFillHome,
  AiOutlineHome,
  AiFillPlusSquare,
  AiOutlinePlusSquare,
  AiFillInstagram,
  AiOutlineInstagram,
} from "react-icons/ai";
import { BsCameraReelsFill, BsCameraReels } from "react-icons/bs";
import NavButton from "./NavButton";
import {
  AiOutlineMessage,
  AiFillMessage,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import CreatePostModal from "@/Modal/Posts/CreatePostModal";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

type NavItemsProps = {};

const formTabs: formTab[] = [
  {
    title: "Home",
    iconFilled: AiFillHome,
    iconUnfilled: AiOutlineHome,
  },
  {
    title: "Search",
    iconFilled: BiSearch,
    iconUnfilled: CiSearch,
  },
  // {
  //   title: "Explore",
  //   iconFilled: MdExplore,
  //   iconUnfilled: MdOutlineExplore,
  // },
  // {
  //   title: "Reels",
  //   iconFilled: BsCameraReelsFill,
  //   iconUnfilled: BsCameraReels,
  // },
  // {
  //   title: "Messages",
  //   iconFilled: AiFillMessage,
  //   iconUnfilled: AiOutlineMessage,
  // },
  // {
  //   title: "Notifications",
  //   iconFilled: AiFillHeart,
  //   iconUnfilled: AiOutlineHeart,
  // },
  {
    title: "Create",
    iconFilled: AiFillPlusSquare,
    iconUnfilled: AiOutlinePlusSquare,
  },
  {
    title: "Profile",
    iconFilled: AiFillInstagram,
    iconUnfilled: AiOutlineInstagram,
  },
];

export type formTab = {
  title: string;
  iconFilled: any;
  iconUnfilled: any;
};

const NavItems: React.FC<NavItemsProps> = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Stack
        spacing={{ base: 10, sm: 5, md: 5 }}
        direction={{ base: "row", sm: "column", md: "column" }}
        align="center"
      >
        {formTabs.map((item) => {
          return <NavButton key={item.title} item={item} user={user} />;
        })}
      </Stack>
    </>
  );
};
export default NavItems;
