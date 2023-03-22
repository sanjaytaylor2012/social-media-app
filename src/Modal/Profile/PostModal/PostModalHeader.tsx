import { Post } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
import { auth } from "@/firebase/clientApp";
import { Flex, Stack, Divider, Image, Text, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineInstagram } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import DeletePostModal from "./DeletePostModal/DeletePostModal";

type PostModalHeaderProps = { item: Post };

const PostModalHeader: React.FC<PostModalHeaderProps> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);

  return (
    <>
      <Flex align="center" justify="space-between">
        <Flex align="center">
          {item.creatorProfilePic === undefined ? (
            <Icon fontSize={40} mr={1} as={AiOutlineInstagram} />
          ) : (
            <Image
              objectFit="cover"
              borderRadius="full"
              boxSize="40px"
              src={item.creatorProfilePic}
              mr={1}
            />
          )}
          <Text fontWeight="600">{item.creatorDisplayName}</Text>
        </Flex>

        {item.creatorDisplayName === user!.email!.split("@")[0] && (
          <Icon
            as={FiMenu}
            mr={4}
            onClick={() => {
              setOpen(true);
            }}
            cursor="pointer"
          />
        )}
      </Flex>
      <Divider width="100%" color="gray.300" border="1px solid" />
      <Flex align="top">
        <Text fontWeight="600" mr={3}>
          {item.creatorDisplayName}
        </Text>

        <Text mr={2}>{item.body}</Text>
      </Flex>
      <DeletePostModal user={user} item={item} open={open} setOpen={setOpen} />
    </>
  );
};
export default PostModalHeader;
