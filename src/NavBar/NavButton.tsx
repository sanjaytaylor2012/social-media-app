import { Button, Flex, Hide, Icon, Show, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdHomeFilled } from "react-icons/md";
import { formTab } from "./NavItems";
import SearchBar from "@/SearchBar/SearchBar";
import { useRecoilState } from "recoil";
import { NavBarState } from "@/atoms/SearchBarAtom";
import CreatePostModal from "@/Modal/Posts/CreatePostModal";

type NavItemProps = {
  item: formTab;
  user: User | null | undefined;
};

const NavItem: React.FC<NavItemProps> = ({ item, user }) => {
  const router = useRouter();
  const [openSearchMenu, setOpenSearchMenu] = useState(false);
  const [selectedTab, setSelectedTab] = useRecoilState(NavBarState);

  return (
    <Button
      onClick={() => {
        setSelectedTab((prev) => ({
          previousTab: prev.selectedTab,
          selectedTab: item.title,
        }));

        if (item.title === "Profile") {
          // router.reload();
          router.push(`/${user!.email!.split("@")[0]}`);
        } else if (item.title === "Home") {
          // router.reload();
          router.push(`/${user!.email!.split("@")[0]}/home`);
        } else if (item.title === "Search") {
          setOpenSearchMenu(true);
        }
      }}
      width="95%"
    >
      <Flex mr="auto" align="end">
        <Icon
          as={
            item.title === selectedTab.selectedTab
              ? item.iconFilled
              : item.iconUnfilled
          }
          fontSize={30}
        />
        <Text
          ml={{ base: "0", md: "3" }}
          width={{ base: "0%", md: "50%" }}
          fontSize={{ base: "0pt", md: "13pt" }}
          fontWeight={item.title === selectedTab.selectedTab ? 800 : 100}
        >
          {item.title}
        </Text>
      </Flex>
      <SearchBar isOpen={openSearchMenu} onClose={setOpenSearchMenu} />
      {selectedTab.selectedTab === "Create" && <CreatePostModal />}
    </Button>
  );
};
export default NavItem;
