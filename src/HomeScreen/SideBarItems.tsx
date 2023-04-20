import { followProfile } from "@/atoms/userAtom";
import { Flex, Icon, Button, Image } from "@chakra-ui/react";
import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { NextRouter } from "next/router";
import { useRecoilState } from "recoil";
import { NavBarState } from "@/atoms/SearchBarAtom";

type SideBarItemsProps = {
  item: followProfile;
  router: NextRouter;
};

const SideBarItems: React.FC<SideBarItemsProps> = ({ item, router }) => {
  const [navState, setNavState] = useRecoilState(NavBarState);

  return (
    <Flex align="center" width="100%" key={item.name} justify="space-between">
      <Flex align="center">
        {item.profilePic === "" ? (
          <Icon fontSize={30} mr={1} as={AiOutlineInstagram} />
        ) : (
          <Image
            objectFit="cover"
            borderRadius="full"
            boxSize="30px"
            src={item.profilePic}
            mr={1}
          />
        )}
        {item.name}
      </Flex>

      <Button
        ml={4}
        height="30px"
        variant="login"
        onClick={() => {
          setNavState({
            selectedTab: "Profile",
            previousTab: "Home",
          });
          router.push(`/${item.name}`);
        }}
      >
        View Profile
      </Button>
    </Flex>
  );
};
export default SideBarItems;
