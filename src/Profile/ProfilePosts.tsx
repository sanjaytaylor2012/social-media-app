import { Post, postState } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Text,
  Image,
  SimpleGrid,
  Stack,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import {
  query,
  collection,
  orderBy,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsGrid3X3 } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import GridPostItem from "./GridPostItem";
import PostLoader from "@/Layout/PostLoader";
import ProfilePostLoader from "./ProfilePostLoader";

type PostsProps = {
  userDoc: UserType;
};

const Posts: React.FC<PostsProps> = ({ userDoc }) => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    try {
      setLoading(true);
      // get posts from this community
      const postsQuery = query(
        collection(firestore, `users/${userDoc.displayName}/posts`),
        orderBy("createdAt", "desc")
      );

      const postDocs = await getDocs(postsQuery);

      //store in post state
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // console.log(posts);

      const userDocument = await getDoc(
        doc(firestore, `users/${userDoc.displayName}`)
      );

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
        numPosts: userDocument!.data()!.numPosts,
      }));
    } catch (error: any) {
      console.log("getPosts error: ", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, [userDoc]);

  return (
    <Stack align="center">
      <Flex width="100%" justify="center">
        <Divider
          width="95%"
          border="1px solid"
          orientation="horizontal"
          color="gray.400"
          mb={4}
        />
      </Flex>
      <Flex justify="center">
        <Icon as={BsGrid3X3} mr={3} />
        <Text fontWeight={600} fontSize={{ base: "0pt", md: "10pt" }}>
          POSTS
        </Text>
      </Flex>
      {loading ? (
        <ProfilePostLoader />
      ) : (
        <SimpleGrid
          position="relative"
          columns={3}
          spacing={{ base: 0.5, md: 7 }}
        >
          {postStateValue.posts.map((item) => {
            return <GridPostItem userDoc={userDoc} key={item.id} item={item} />;
          })}
        </SimpleGrid>
      )}
    </Stack>
  );
};
export default Posts;
