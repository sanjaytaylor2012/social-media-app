import { firestore } from "@/firebase/clientApp";
import { Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import safeJsonStringify from "safe-json-stringify";
import { AiOutlineInstagram } from "react-icons/ai";
import { UserType } from "@/atoms/userAtom";
import Header from "@/Profile/Header";
import ProfilePosts from "@/Profile/ProfilePosts";

type indexProps = {
  userDoc: UserType;
};

const ProfilePage: React.FC<indexProps> = ({ userDoc }) => {
  console.log(userDoc);
  return (
    <>
      <Stack mb={5} mr={"5vw"}>
        <Header userDoc={userDoc} />
        <ProfilePosts userDoc={userDoc} />
      </Stack>
    </>
  );
};
export default ProfilePage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const userDocRef = doc(
      firestore,
      `users/${context.query.userId as string}`
    );
    const userDoc = await getDoc(userDocRef);
    console.log(userDoc.data());

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
