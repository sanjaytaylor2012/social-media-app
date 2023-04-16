import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import NavMenu from "./NavMenu";

type InstagramBannerTopProps = {};

const InstagramBannerTop: React.FC<InstagramBannerTopProps> = () => {
  return (
    <Flex
      border="1px solid"
      borderColor="gray.300"
      width={"100%"}
      height={"7vh"}
      position={{ base: "sticky" }}
      top={0}
      backgroundColor="white"
      display={{ base: "flex", sm: "none" }}
      justify={"space-between"}
      align="center"
    >
      <Image
        mt={2}
        width={"170px"}
        height="55px"
        src="/images/Instagram_logo.svg.png"
      />
      <Flex>
        <NavMenu />
      </Flex>
    </Flex>
  );
};
export default InstagramBannerTop;
