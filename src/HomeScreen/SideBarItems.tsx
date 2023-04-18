import { followProfile } from "@/atoms/userAtom";
import { Flex, Icon, Button, Image } from "@chakra-ui/react";
import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { NextRouter } from "next/router";

type SideBarItemsProps = { item: followProfile; router: NextRouter };

const SideBarItems: React.FC<SideBarItemsProps> = ({ item, router }) => {
  return (
    <Flex
      align="center"
      width="100%"
      display={{ base: "none", md: "flex" }}
      key={item.name}
      justify="space-between"
    >
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
