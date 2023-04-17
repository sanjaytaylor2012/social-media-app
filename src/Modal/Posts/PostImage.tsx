import { auth, firestore, storage } from "@/firebase/clientApp";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  Icon,
  ModalBody,
  Textarea,
  Text,
  Image,
  Stack,
  Alert,
  AlertIcon,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineInstagram } from "react-icons/ai";
import { Post } from "@/atoms/postAtom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { randomUUID } from "crypto";
import { NavBarState } from "@/atoms/SearchBarAtom";
import { useRecoilState } from "recoil";

type PostImageProps = {
  setSelectedModal: (input: string) => void;
  selectedFile: string;
};

const PostImage: React.FC<PostImageProps> = ({
  setSelectedModal,
  selectedFile,
}) => {
  const [user] = useAuthState(auth);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreatePost = async () => {
    if (error) setError(false);

    if (!caption) {
      setError(true);
      return;
    }

    const id = uuidv4();

    const newPost: Post = {
      creatorId: user!.uid,
      creatorDisplayName: user!.email!.split("@")[0],
      body: caption,
      numberOfComments: 0,
      createdAt: serverTimestamp() as Timestamp,
      likes: 0,
      id: id,
      likeProfiles: [],
      comments: [],
    };

    try {
      setLoading(true);

      const batch = writeBatch(firestore);

      const postDocRef = doc(firestore, `posts/${id}`);
      batch.set(postDocRef, newPost);

      await batch.commit();

      const imageRef = ref(storage, `posts/${id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, {
        imageURL: downloadURL,
      });

      const userDoc = await getDoc(
        doc(firestore, `users/${user!.email!.split("@")[0]}`)
      );

      await updateDoc(postDocRef, {
        creatorProfilePic: userDoc!.data()!.profilePic,
      });

      const docRef = doc(firestore, `users/${user!.email!.split("@")[0]}`);

      await updateDoc(docRef, {
        numPosts: increment(1),
      });

      router.reload();
    } catch (error: any) {
      console.log("handleCreatePost error: ", error.message);
      setError(true);
    }
  };

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justify="space-between" align="center">
            <Icon
              onClick={() => {
                setSelectedModal("ViewImage");
              }}
              cursor="pointer"
              fontSize={30}
              as={BsArrowLeft}
            />
            <Text fontSize="12pt">Create new post</Text>

            {loading ? (
              <Spinner />
            ) : (
              <Text
                cursor="pointer"
                color="blue.400"
                fontWeight={400}
                fontSize="12pt"
                onClick={handleCreatePost}
              >
                Share
              </Text>
            )}
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Flex align="end">
            <Image
              src={selectedFile}
              objectFit="cover"
              height="300px"
              width="200px"
            />
            <Stack>
              <Flex>
                <Icon ml={2} fontSize={25} as={AiOutlineInstagram} mr={2} />
                <Text> {user?.displayName || user?.email?.split("@")[0]}</Text>
              </Flex>

              <Textarea
                borderRadius="0px"
                placeholder="Write a caption..."
                height="300px"
                width="200px"
                resize="none"
                onChange={(e) => setCaption(e.target.value)}
              />
            </Stack>
          </Flex>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <Text mr={2}>Error creating post</Text>
            </Alert>
          )}
        </ModalBody>
      </ModalContent>
    </>
  );
};
export default PostImage;
