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
  DocumentData,
  limit,
  QuerySnapshot,
  where,
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
import { User } from "firebase/auth";
import { NextRouter } from "next/router";

type PostsProps = {
  userDoc: UserType;
  user: User | undefined | null;
  router: NextRouter;
};

const Posts: React.FC<PostsProps> = ({ userDoc, user, router }) => {
  const [loading, setLoading] = useState(false);
  const [currentPostState, setCurrentPostState] = useRecoilState(postState);

  const getPosts = async () => {
    try {
      setLoading(true);
      const userPosts = await getDocs(
        query(
          collection(firestore, `posts`),
          where("creatorDisplayName", "==", userDoc.displayName),
          orderBy("createdAt", "desc")
        )
      );

      const posts = userPosts.docs.map((doc) => ({
        ...doc.data(),
      })) as Post[];

      let likePromises: Array<Promise<QuerySnapshot<DocumentData>>> = [];
      posts.forEach((post) => {
        likePromises.push(
          getDocs(collection(firestore, `posts/${post.id}/likeProfiles`))
        );
      });

      const likeResults = await Promise.all(likePromises);
      const feedPostLikes: any = [];

      likeResults.forEach((result) => {
        const likes = result.docs.map((doc) => ({
          ...doc.data(),
        }));
        feedPostLikes.push(likes);
      });

      let commentPromises: Array<Promise<QuerySnapshot<DocumentData>>> = [];
      posts.forEach((post) => {
        commentPromises.push(
          getDocs(
            query(
              collection(firestore, `posts/${post.id}/comments`),
              orderBy("createdAt", "desc")
            )
          )
        );
      });

      const commentResults = await Promise.all(commentPromises);
      const feedPostComments: any = [];

      commentResults.forEach((result) => {
        const comments = result.docs.map((doc) => ({
          ...doc.data(),
        }));
        feedPostComments.push(comments);
      });

      let x = -1;
      const updatedPosts = posts.map((post) => {
        x++;
        const updatedComments = feedPostComments[x];
        const updatedLikes = feedPostLikes[x];
        const updatedPost: Post = {
          ...post,
          comments: updatedComments,
          likeProfiles: updatedLikes,
        };
        return updatedPost;
      });

      const sortedDocs = updatedPosts.sort((a, b) => {
        return b.createdAt.seconds - a.createdAt.seconds;
      });

      setCurrentPostState((prev) => ({
        ...prev,
        posts: sortedDocs,
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
          {currentPostState.posts.map((item) => {
            return (
              <GridPostItem
                user={user}
                router={router}
                userDoc={userDoc}
                key={item.id}
                item={item}
              />
            );
          })}
        </SimpleGrid>
      )}
    </Stack>
  );
};
export default Posts;
