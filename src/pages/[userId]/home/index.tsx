import { Post, postState } from "@/atoms/postAtom";
import { NavBarState } from "@/atoms/SearchBarAtom";
import {
  currentUserStates,
  followProfile,
  testUserStates,
} from "@/atoms/userAtom";
import { auth, firestore } from "@/firebase/clientApp";
import PostItem from "@/HomeScreen/PostItem/PostItem";
import SideBarItems from "@/HomeScreen/SideBarItems";
import SwitchAccountIcon from "@/HomeScreen/SwitchAccountIcon";
import useProfile from "@/hooks/useProfile";
import PageContent from "@/Layout/PageContent";
import PostLoader from "@/Profile/ProfilePostLoader";
import SearchBar from "@/SearchBar/SearchBar";
import { Stack, Text } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {
  query,
  collection,
  orderBy,
  getDocs,
  doc,
  getDoc,
  where,
  limit,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineInstagram } from "react-icons/ai";
import { useRecoilState } from "recoil";

// type indexProps = { postsData: Post[] };

const index: React.FC = ({}) => {
  const [currentPostState, setCurrentPostState] = useRecoilState(postState);
  const [currentUserProfileState, setCurrentUserProfileState] =
    useRecoilState(currentUserStates);

  const [testUserProfileStates, setTestUserProfileStates] =
    useRecoilState(testUserStates);

  const { getMyFollows } = useProfile();
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profilePicUser, setProfilePicUser] = useState("");

  const getPosts = async () => {
    try {
      setLoading(true);

      const userDocRef = doc(firestore, `users/${user!.email!.split("@")[0]}`);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists() == false) {
        getTestProfiles();
        return;
      }

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

      if (followingProfileDocs.length == 0) {
        getTestProfiles();
        return;
      }

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
      const updatedPosts = feedPosts.map((post) => {
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

      setLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getTestProfiles = async () => {
    const followingProfiles = await getDocs(
      collection(firestore, `users/test/followingProfiles`)
    );

    const followingProfileDocs = followingProfiles.docs.map((doc) => ({
      ...doc.data(),
    }));

    setTestUserProfileStates({
      profiles: followingProfileDocs as followProfile[],
    });

    setLoading(false);
  };

  useEffect(() => {
    getPosts();
    getMyFollows();
  }, []);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <>
          {currentUserProfileState.myFollowings.length == 0 && (
            <Stack>
              <Text ml={5} mt={10}>
                Follow someone to see posts!
              </Text>
              <Text ml={5} mt={10}>
                Suggested:
              </Text>
              {testUserProfileStates.profiles.map((item) => {
                return (
                  <SideBarItems router={router} key={uuidv4()} item={item} />
                );
              })}
            </Stack>
          )}

          {currentUserProfileState.myFollowings.length != 0 && (
            <PageContent>
              <>
                <Stack mb={20}>
                  {currentPostState.posts.length == 0 && (
                    <Text ml={5}>
                      Your followings haven't posted! Follow more people to see
                      posts!
                    </Text>
                  )}
                  {currentPostState.posts.map((item: any) => {
                    return (
                      <>
                        <PostItem
                          router={router}
                          user={user}
                          key={uuidv4()}
                          item={item}
                        />
                      </>
                    );
                  })}
                </Stack>
              </>
              <>
                <Stack
                  align="start"
                  borderRadius="10px"
                  p={4}
                  borderColor="gray.400"
                  borderWidth={"3px"}
                  width={{ base: "0vw", md: "30vw" }}
                  maxWidth="400px"
                  display={{ base: "none", sm: "none", md: "flex" }}
                  // border="1px solid"
                >
                  <Stack width="100%">
                    <SwitchAccountIcon
                      profilePic={profilePicUser}
                      user={user}
                    />
                    <Text fontSize={{ base: "0px", md: "12pt" }}>
                      Following
                    </Text>
                    {currentUserProfileState.myFollowings.map((item) => {
                      return (
                        <SideBarItems
                          router={router}
                          key={uuidv4()}
                          item={item}
                        />
                      );
                    })}
                  </Stack>
                </Stack>
              </>
            </PageContent>
          )}
        </>
      )}
    </>
  );
};
export default index;
