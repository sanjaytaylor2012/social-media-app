import { Icon, Image } from "@chakra-ui/react";
import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";

type ProfilePicProps = { source: string | undefined };

const ProfilePic: React.FC<ProfilePicProps> = ({ source }) => {
  return (
    <>
      {source === "" ? (
        <Icon boxSize="15px" as={AiOutlineInstagram} />
      ) : (
        <Image
          objectFit="cover"
          borderRadius="full"
          boxSize="15px"
          src={source}
        />
      )}
    </>
  );
};
export default ProfilePic;
