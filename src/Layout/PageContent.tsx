import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface PageContentProps {
  children: ReactNode;
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <Flex mt={10} p="16px 0px">
      <Flex width="95%" justify="center" maxWidth="860px">
        {/* LHS */}
        <Flex
          ml={60}
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 6, md: 6 }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* RHS */}
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
