import { UserType } from "@/atoms/userAtom";
import { firestore } from "@/firebase/clientApp";
import ProfilePicModal from "@/Modal/Profile/ProfilePicModal";
import ViewImageModal from "@/Modal/Profile/ViewImageModal";
import { Flex, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import error from "next/error";
import React, { useState } from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import safeJsonStringify from "safe-json-stringify";

type indexProps = { userDoc: UserType };

const index: React.FC<indexProps> = ({ userDoc }) => {
  const [open, setOpen] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  console.log("here is data", userDoc);
  return (
    <>
      <Flex align="center" mt={6} ml={39} mb={4}>
        {userDoc.profilePic === "" ? (
          <Icon fontSize={30} as={AiOutlineInstagram} mr={5} />
        ) : (
          <Image
            objectFit="cover"
            borderRadius="full"
            boxSize="75px"
            src={userDoc.profilePic}
            mr={5}
          />
        )}
        <Stack spacing={-1}>
          <Text>{userDoc.displayName}</Text>
          <Text
            cursor="pointer"
            onClick={() => {
              setOpen(true);
            }}
            color="blue.500"
          >
            Change profile photo
          </Text>
        </Stack>
      </Flex>

      <ProfilePicModal
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        userDoc={userDoc}
        setOpen={setOpen}
        open={open}
        setImageModal={setImageModal}
      />
      <ViewImageModal
        setOpen={setOpen}
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        userDoc={userDoc}
        setImageModal={setImageModal}
        imageModal={imageModal}
      />
    </>
  );
};
export default index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const userDocRef = doc(
      firestore,
      `users/${context.query.userId as string}`
    );
    const userDoc = await getDoc(userDocRef);

    return {
      props: {
        userDoc: userDoc.exists()
          ? JSON.parse(
              safeJsonStringify({
                ...userDoc.data(),
              })
            )
          : "",
      },
    };
  } catch (error) {
    console.log("getServerSideProps error", error);
  }
}
