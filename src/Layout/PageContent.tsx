import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface PageContentProps {
  children: ReactNode;
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <Flex mt={{ base: "none", sm: 10 }}>
      <Flex width={"100%"} justify="center" maxWidth="860px">
        {/* LHS */}
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: "0vw", sm: "6vw" }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* RHS */}
        <Flex
          display={{ base: "none", lg: "flex" }}
          direction="column"
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
