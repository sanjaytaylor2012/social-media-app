import { homeScreenPostState, Post, postState } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
import { auth, firestore } from "@/firebase/clientApp";
import PostItem from "@/HomeScreen/PostItem";
import SideBarItems from "@/HomeScreen/sideBarItems";
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

  const { getMyFollows, currentUserProfileState } = useProfile();
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
                <PostItem key={uuidv4()} item={item} />
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
          width="30vw"
          mr={4}
        >
          <SwitchAccountIcon profilePic={profilePicUser} user={user} />
          <Text>Following</Text>
          {currentUserProfileState.myFollowings.map((item) => {
            return <SideBarItems key={uuidv4()} item={item} />;
          })}
        </Stack>
      </>
    </PageContent>
  );
};
export default index;
