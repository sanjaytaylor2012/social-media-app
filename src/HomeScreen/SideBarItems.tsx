import { followProfile } from "@/atoms/userAtom";
import { Flex, Icon, Button, Image } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";

type SideBarItemsProps = { item: followProfile };

const SideBarItems: React.FC<SideBarItemsProps> = ({ item }) => {
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
          router.push(`/${item.name}`);
        }}
      >
        View Profile
      </Button>
    </Flex>
  );
};
export default SideBarItems;
