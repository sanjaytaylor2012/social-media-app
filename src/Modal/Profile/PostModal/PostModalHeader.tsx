import { Post } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
import { Flex, Stack, Divider, Image, Text } from "@chakra-ui/react";
import React from "react";

type PostModalHeaderProps = { item: Post; userDoc: UserType };

const PostModalHeader: React.FC<PostModalHeaderProps> = ({ item, userDoc }) => {
  return (
    <>
      <Flex align="center">
        <Image
          objectFit="cover"
          borderRadius="full"
          boxSize="40px"
          src={userDoc.profilePic}
          mr={4}
        />
        <Text fontWeight="600">{item.creatorDisplayName}</Text>
      </Flex>
      <Divider width="100%" color="gray.300" border="1px solid" />
      <Flex align="center">
        <Image
          objectFit="cover"
          borderRadius="full"
          boxSize="40px"
          src={userDoc.profilePic}
          mr={4}
        />
        <Text fontWeight="600" mr={3}>
          {item.creatorDisplayName}
        </Text>
        <Text>{item.body}</Text>
      </Flex>
    </>
  );
};
export default PostModalHeader;
