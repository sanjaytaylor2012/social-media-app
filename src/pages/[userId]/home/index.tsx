import { homeScreenPostState, Post, postState } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
import { auth, firestore } from "@/firebase/clientApp";
import PostItem from "@/HomeScreen/PostItem";
import SwitchAccountIcon from "@/HomeScreen/SwitchAccountIcon";
import useProfile from "@/hooks/useProfile";
import PageContent from "@/Layout/PageContent";
import FollowButtonModal from "@/Modal/Profile/FollowersModal/FollowButtonModal";
import ViewLikesModal from "@/Modal/Profile/PostModal/ViewLikesModal";
import GridPostItem from "@/Profile/GridPostItem";
import { Stack, Flex, Image, Icon, Button, Text } from "@chakra-ui/react";
import {
  query,
  collection,
  orderBy,
  getDocs,
  doc,
  getDoc,
  where,
  Timestamp,
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
  const [currentPostState, setCurrentPostState] =
    useRecoilState(homeScreenPostState);
  const [user] = useAuthState(auth);

  const [profilePicUser, setProfilePicUser] = useState("");

  const getPosts = async () => {
    try {
      // get posts from this community
      const postsQuery = query(
        collection(
          firestore,
          `users/${user!.email!.split("@")[0]}/homeScreenPosts`
        ),
        orderBy("createdAt", "desc")
      );

      const postDocs = await getDocs(postsQuery);

      //store in post state
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setCurrentPostState((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));

      const userDocRef = doc(firestore, `users/${user!.email!.split("@")[0]}`);

      const userDoc = await getDoc(userDocRef);

      setProfilePicUser(userDoc!.data()!.profilePic);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const { getMyFollows, currentProfileState } = useProfile();
  const router = useRouter();

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
    getMyFollows();
  }, []);

  return (
    <PageContent>
      <>
        {currentPostState.posts.length == 0 && (
          <Text>Follow someone to see posts!</Text>
        )}

        <Stack>
          {currentPostState.posts.map((item: any) => {
            return (
              <>
                <PostItem key={item.id} item={item} />
              </>
            );
          })}
        </Stack>
      </>
      <>
        <Stack
          align="start"
          ml={4}
          border="3px solid"
          p={4}
          borderRadius="10px"
          borderColor="gray.400"
          width="300px"
        >
          <SwitchAccountIcon profilePic={profilePicUser} user={user} />
          <Text>Following</Text>
          {currentProfileState.myFollowings.map((item) => {
            return (
              <Flex
                align="center"
                width="100%"
                key={item.name}
                justify="space-between"
              >
                <Flex align="center">
                  {item.profilePic === "" ? (
                    <Icon fontSize={30} mr={1} as={AiOutlineInstagram} />
                  ) : (
                    <Image
                      objectFit="cover"
                      borderRadius="full"
                      boxSize="30px"
                      src={item.profilePic}
                      mr={1}
                    />
                  )}
                  {item.name}
                </Flex>

                <Button
                  ml={4}
                  height="30px"
                  variant="login"
                  onClick={() => {
                    router.push(`/${item.name}`);
                  }}
                >
                  View Profile
                </Button>
              </Flex>
            );
          })}
        </Stack>
      </>
    </PageContent>
  );
};
export default index;
