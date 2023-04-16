import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import NavMenu from "./NavMenu";

type InstagramBannerTopProps = {};

const InstagramBannerTop: React.FC<InstagramBannerTopProps> = () => {
  return (
    <Flex
      direction={"row"}
      border="1px solid"
      borderColor="gray.300"
      width={"100%"}
      height={"7vh"}
      position={{ base: "sticky" }}
      top={0}
      backgroundColor="white"
      display={{ base: "flex", sm: "none" }}
      justify={"space-around"}
    >
      <Image
        pl={5}
        src="/images/Instagram_logo.svg.png"
        height="auto"
        width={"10%"}
      />
      <NavMenu />
    </Flex>
  );
};
export default InstagramBannerTop;
