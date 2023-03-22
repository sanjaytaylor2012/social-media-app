import { UserType } from "@/atoms/userAtom";
import { auth, firestore } from "@/firebase/clientApp";
import ProfilePicModal from "@/Modal/Profile/SettingsModal/ProfilePicModal";
import ViewImageModal from "@/Modal/Profile/SettingsModal/ViewImageModal";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import error from "next/error";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineInstagram } from "react-icons/ai";
import safeJsonStringify from "safe-json-stringify";

type indexProps = { userDoc: UserType };

const index: React.FC<indexProps> = ({ userDoc }) => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [bio, setBio] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(150);
  const router = useRouter();

  useEffect(() => {
    if (userDoc.displayName != user!.email!.split("@")[0]) {
      router.push(`/${user!.email!.split("@")[0]}/home`);
    }
  }, []);

  console.log("here is data", userDoc);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length > 150) return;
    setBio(event.target.value);
    setCharsRemaining(150 - event.target.value.length);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (bio.length > 0 && bio.length <= 150) {
        const docRef = doc(firestore, `users/${user!.email!.split("@")[0]}`);

        await updateDoc(docRef, {
          bio: bio,
        });
      }

      router.push(`/${user!.email!.split("@")[0]}`);
    } catch (error: any) {
      console.log("bioCreateError: ", error.message);
    }
  };

  return (
    <>
      <Flex mt={10} ml={10}>
        <Stack mr={5}>
          {userDoc.profilePic === "" ? (
            <Icon fontSize={30} as={AiOutlineInstagram} />
          ) : (
            <Image
              objectFit="cover"
              borderRadius="full"
              boxSize="75px"
              src={userDoc.profilePic}
            />
          )}
          <Text align="right" fontWeight={600}>
            Bio
          </Text>
        </Stack>
        <Stack>
          <Stack spacing={-1} mb="5vh">
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
          <form onSubmit={handleSubmit}>
            <Stack>
              <Textarea onChange={handleChange} />
              <Text
                fontSize="9pt"
                color={charsRemaining === 0 ? "red" : "gray.500"}
              >
                {charsRemaining} Characters Remaining
              </Text>
            </Stack>
            <Button mt={5} type="submit" variant="login">
              Submit
            </Button>
          </form>
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
