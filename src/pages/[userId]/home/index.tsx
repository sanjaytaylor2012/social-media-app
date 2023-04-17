import { Like, Post, postState } from "@/atoms/postAtom";
import { currentUserStates, UserType } from "@/atoms/userAtom";
import { auth, firestore } from "@/firebase/clientApp";
import PostItem from "@/HomeScreen/PostItem";
import SideBarItems from "@/HomeScreen/SideBarItems";
import SwitchAccountIcon from "@/HomeScreen/SwitchAccountIcon";
import useProfile from "@/hooks/useProfile";
import PageContent from "@/Layout/PageContent";
import FollowButtonModal from "@/Modal/Profile/FollowersModal/FollowButtonModal";
import ViewLikesModal from "@/Modal/Profile/PostModal/ViewLikesModal";
import GridPostItem from "@/Profile/GridPostItem";
import { Stack, Flex, Image, Icon, Button, Text } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {
  query,
  collection,
  orderBy,
  getDocs,
  doc,
  getDoc,
  where,
  Timestamp,
  limit,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import moment from "moment";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineInstagram } from "react-icons/ai";
import { useRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";
import { isContext } from "vm";

// type indexProps = { postsData: Post[] };

const index: React.FC = ({}) => {
  const [currentPostState, setCurrentPostState] = useRecoilState(postState);
  const [currentUserProfileState, setCurrentUserProfileState] =
    useRecoilState(currentUserStates);
  const [returned, setReturned] = useState(false);

  const [user] = useAuthState(auth);

  const [profilePicUser, setProfilePicUser] = useState("");

  const getPosts = async () => {
    try {
      const userDocRef = doc(firestore, `users/${user!.email!.split("@")[0]}`);
      const userDoc = await getDoc(userDocRef);
      setProfilePicUser(userDoc!.data()!.profilePic);

      const followingProfiles = await getDocs(
        collection(
          firestore,
          `users/${user!.email!.split("@")[0]}/followingProfiles`
        )
      );

      const followingProfileDocs = followingProfiles.docs.map((doc) => ({
        ...doc.data(),
      }));

      let postPromises: Array<Promise<QuerySnapshot<DocumentData>>> = [];
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((index) => {
        if (!followingProfileDocs[index]) return;

        postPromises.push(
          getDocs(
            query(
              collection(firestore, `posts`),
              where(
                "creatorDisplayName",
                "==",
                followingProfileDocs[index].name
              ),
              orderBy("createdAt", "desc"),
              limit(10)
            )
          )
        );
      });

      const queryResults = await Promise.all(postPromises);

      const feedPosts: Post[] = [];

      queryResults.forEach((result) => {
        const posts = result.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        feedPosts.push(...posts);
      });

      console.log(currentPostState);

      let likePromises: Array<Promise<QuerySnapshot<DocumentData>>> = [];
      feedPosts.forEach((post) => {
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
      feedPosts.forEach((post) => {
        commentPromises.push(
          getDocs(collection(firestore, `posts/${post.id}/comments`))
        );
      });

      const commentResults = await Promise.all(commentPromises);

      const feedPostComments: any = [];

      commentResults.forEach((result) => {
        const comments = result.docs.map((doc) => ({
          ...doc.data(),
        }));
        feedPostComments.push(comments);

        console.log(comments);
      });

      let x = -1;
      const updatedPosts = feedPosts.map((post) => {
        x++;
        const updatedComments = feedPostComments[x];
        const updatedLikes = feedPostLikes[x];
        const updatedPost: Post = {
          ...post,
          comments: updatedComments,
          likeProfiles: updatedLikes,
        };
        console.log(updatedPost);
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
      console.log(error);
    }
  };

  // useEffect(() => {
  //   // if ((router.query.userId as string) != user!.email!.split("@")[0]) {
  //   //   router.push(`/${user!.email!.split("@")[0]}/home`);
  //   if ((router.query.userId as string) != user!.email!.split("@")[0]) {
  //     router.push(`/notFound`);
  //   } else {
  //     getPosts();
  //     getMyFollows();
  //   }
  // }, []);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PageContent>
      <>
        {currentPostState.posts.length == 0 && (
          <Text>Follow someone to see posts!</Text>
        )}

        <Stack mb={20}>
          {currentPostState.posts.map((item: any) => {
            return (
              <>
                <PostItem key={uuidv4()} item={item} />
              </>
            );
          })}
        </Stack>
      </>
      <>
        <Stack
          align="start"
          // border="3px solid"
          p={{ base: 0, sm: 4 }}
          borderRadius={{ base: "0px", md: "10px" }}
          borderColor="gray.400"
          borderWidth={{ base: "0px", md: "3px" }}
          width={{ base: "0vw", md: "30vw" }}
          maxWidth="400px"
          minWidth={{ base: "0px", sm: "300px" }}
          // border="1px solid"
        >
          <SwitchAccountIcon profilePic={profilePicUser} user={user} />
          {/* <Text fontSize={{ base: "0px", md: "12pt" }}>Following</Text>
          {currentUserProfileState.myFollowings.map((item) => {
            return <SideBarItems key={uuidv4()} item={item} />;
          })} */}
        </Stack>
      </>
    </PageContent>
  );
};
export default index;
