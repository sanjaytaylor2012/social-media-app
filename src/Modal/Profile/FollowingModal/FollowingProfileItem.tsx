import { followProfile, UserType } from "@/atoms/userAtom";
import FollowButton from "@/Profile/FollowButton";
import { Flex, Image, Icon } from "@chakra-ui/react";
import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";

type FollowingProfileItemProps = { item: followProfile; userDoc: UserType };

const FollowingProfileItem: React.FC<FollowingProfileItemProps> = ({
  item,
  userDoc,
}) => {
  return (
    <Flex width="100%" justify="space-between">
      <Flex>
        {item.profilePic === "" ? (
          <Icon fontSize={29} as={AiOutlineInstagram} mr={2} />
        ) : (
          <Image
            objectFit="cover"
            borderRadius="full"
            boxSize="40px"
            src={item.profilePic}
            mr={2}
          />
        )}

        {item.name}
      </Flex>
      <FollowButton displayName={item.name} userDoc={userDoc} />
    </Flex>
  );
};
export default FollowingProfileItem;
