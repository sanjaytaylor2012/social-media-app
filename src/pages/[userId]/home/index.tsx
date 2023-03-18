import { Post, postState } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
import { auth, firestore } from "@/firebase/clientApp";
import PostItem from "@/HomeScreen/PostItem";
import PageContent from "@/Layout/PageContent";
import GridPostItem from "@/Profile/GridPostItem";
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
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";

// type indexProps = { postsData: Post[] };

const index: React.FC = ({}) => {
  const [currentPostState, setCurrentPostState] = useRecoilState(postState);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [postsArray, setPostsArray] = useState([]);

  const getPosts = async () => {
    try {
      const userFollowsRef = collection(
        firestore,
        `users/${user!.email!.split("@")[0]}/followingProfiles`
      );
      const userFollows = await getDocs(userFollowsRef);
      const userFollowDocs = userFollows.docs.map((doc) => ({
        ...doc.data(),
      }));

      console.log("Showing data......");
      console.log("users following: ", userFollowDocs);

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 5);

      const start = new Timestamp(startDate.getDate(), 0);

      const postsData: any = [];

      userFollowDocs.forEach(async (item) => {
        const postsQuery = query(
          collection(firestore, `users/${item.name}/posts`),
          //   where("createdAt", ">=", start),
          orderBy("createdAt", "asc")
        );

        const posts = await getDocs(postsQuery);
        const userPostDocs = posts.docs.map((doc) => ({ ...doc.data() }));
        userPostDocs.forEach((item) => {
          postsData.push(item);
        });

        console.log("postsData: ", postsData);

        // if (postsData) {
        //   setCurrentPostState((prev) => ({
        //     ...prev,
        //     posts: postsData as Post[],
        //   }));
        // }
      });

      if (postsData) {
        setPostsArray(postsData);
        console.log("posts: ", postsArray);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // const postsQuery = query(
  //   collection(firestore, `users/${userFollowDocs[0].name}/posts`),
  //   where("createdAt", ">=", start),
  //   orderBy("createdAt", "asc")
  // );

  // const posts = await getDocs(postsQuery);
  // const postsData = posts.docs.map((doc) => ({ ...doc.data() }));
  // console.log("postsData: ", postsData);

  useEffect(() => {
    // setCurrentPostState({
    //   posts: [],
    //   selectedPost: null,
    // });
    getPosts();
  }, []);

  //   useEffect(() => {
  //     console.log("current post state: ", currentPostState.posts);
  //   }, [currentPostState]);

  return (
    <PageContent>
      <>
        {/* {loading === false &&
          postsArray.map((item: any) => {
            return <PostItem key={item.createdAt} item={item} />;
          })} */}

        <h1>hi</h1>
      </>
      <></>
    </PageContent>
  );
};
export default index;

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   try {
//     const userFollowsRef = collection(
//       firestore,
//       `users/${context.query.userId as string}/followingProfiles`
//     );
//     const userFollows = await getDocs(userFollowsRef);
//     const userFollowDocs = userFollows.docs.map((doc) => ({
//       ...doc.data(),
//     }));

//     console.log("Showing data......");
//     console.log("users following: ", userFollowDocs);

//     const startDate = new Date();
//     startDate.setDate(startDate.getDate() - 5);

//     const start = new Timestamp(startDate.getDate(), 0);

//     const postsData: any = [];

//     userFollowDocs.forEach(async (item) => {
//       const postsQuery = query(
//         collection(firestore, `users/${item.name}/posts`),
//         //   where("createdAt", ">=", start),
//         orderBy("createdAt", "asc")
//       );

//       const posts = await getDocs(postsQuery);
//       const userPostDocs = posts.docs.map((doc) => ({ ...doc.data() }));
//       userPostDocs.forEach((item) => {
//         postsData.push(item);
//       });

//       console.log("postsData: ", postsData);

//       // if (postsData) {
//       //   setPostsArray(postsData);
//       //   console.log("posts: ", postsArray);
//       // }

//       // if (postsData) {
//       //   setCurrentPostState((prev) => ({
//       //     ...prev,
//       //     posts: postsData as Post[],
//       //   }));
//       // }
//     });

//     return {
//       props: {
//         postsData: JSON.parse(safeJsonStringify({ ...postsData })),
//       },
//     };
//   } catch (error: any) {
//     console.log(error.message);
//   }
// }
