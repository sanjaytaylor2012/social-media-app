import { Button, Flex, Hide, Icon, Show, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { formTab } from "./NavItems";

type NavItemProps = {
  item: formTab;
  setSelectedTab: (value: string) => void;
  selected: boolean;
  user: User | null | undefined;
};

const NavItem: React.FC<NavItemProps> = ({
  setSelectedTab,
  item,
  selected,
  user,
}) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        setSelectedTab(item.title);
        if (item.title === "Profile") {
          // router.reload();
          router.push(`/${user!.email!.split("@")[0]}`);
        } else if (item.title === "Home") {
          // router.reload();
          router.push(`/${user!.email!.split("@")[0]}/home`);
        }
      }}
      width="95%"
    >
      <Flex mr="auto" align="end">
        <Icon
          as={selected ? item.iconFilled : item.iconUnfilled}
          fontSize={30}
        />
        <Text
          ml={{ base: "0", md: "3" }}
          width={{ base: "0%", md: "50%" }}
          fontSize={{ base: "0pt", md: "13pt" }}
          fontWeight={selected ? 800 : 100}
        >
          {item.title}
        </Text>
      </Flex>
    </Button>
  );
};
export default NavItem;
