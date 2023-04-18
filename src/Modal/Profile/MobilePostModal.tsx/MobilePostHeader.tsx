import { Post } from "@/atoms/postAtom";
import { auth } from "@/firebase/clientApp";
import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import moment from "moment";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineInstagram } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import DeletePostModal from "../PostModal/DeletePostModal/DeletePostModal";

type MobilePostHeaderProps = {
  item: Post;
  router: NextRouter;
  user: User | undefined | null;
  setOpenDeletePostModal: (input: boolean) => void;
};

const MobilePostHeader: React.FC<MobilePostHeaderProps> = ({
  item,
  router,
  user,
  setOpenDeletePostModal,
}) => {
  return (
    <>
      <Flex ml={{ base: 2, sm: 0 }} align="center" justify="space-between">
        <Flex align="center">
          {item.creatorProfilePic === undefined ? (
            <Icon fontSize={30} mr={1} as={AiOutlineInstagram} />
          ) : (
            <Image
              objectFit="cover"
              borderRadius="full"
              boxSize="40px"
              src={item.creatorProfilePic}
              mr={2}
            />
          )}
          <Text
            _hover={{ color: "gray.400" }}
            fontWeight="600"
            cursor="pointer"
            mr={2}
            onClick={() => {
              router.push(`/${item.creatorDisplayName}`);
            }}
          >
            {item.creatorDisplayName}
          </Text>
          <Text fontSize="10pt" color="gray.400">
            {moment(new Date(item?.createdAt?.seconds * 1000)).fromNow()}
          </Text>
        </Flex>
        {item.creatorDisplayName === user!.email!.split("@")[0] && (
          <Icon
            as={FiMenu}
            mr={10}
            onClick={() => {
              setOpenDeletePostModal(true);
            }}
            cursor="pointer"
          />
        )}
      </Flex>
    </>
  );
};
export default MobilePostHeader;
