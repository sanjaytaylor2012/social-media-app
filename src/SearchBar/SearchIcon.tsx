import { UserType } from "@/atoms/userAtom";
import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";

type SearchIconProps = {
  onClose: (input: boolean) => void;
  item: UserType;
};

const SearchIcon: React.FC<SearchIconProps> = ({ onClose, item }) => {
  const router = useRouter();
  return (
    <Flex
      cursor="pointer"
      width="100%"
      align="center"
      _hover={{ bg: "gray.200" }}
      mt={4}
      key={item.displayName}
      onClick={() => {
        onClose(false);
        router.push(`/${item.displayName}`);
      }}
    >
      {item.profilePic === "" ? (
        <Icon fontSize={45} as={AiOutlineInstagram} />
      ) : (
        <Image
          objectFit="cover"
          borderRadius="full"
          boxSize="45px"
          src={item.profilePic}
        />
      )}
      <Text fontSize="20pt" ml={4}>
        {item.displayName}
      </Text>
    </Flex>
  );
};
export default SearchIcon;
