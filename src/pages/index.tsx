import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, auth, firestore } from "@/firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { UserType } from "@/atoms/userAtom";
import router from "next/router";
import PageContent from "@/Layout/PageContent";
import { Post, postState } from "@/atoms/postAtom";
import { useRecoilState } from "recoil";
import GridPostItem from "@/Profile/GridPostItem";
import PostLoader from "@/Profile/ProfilePostLoader";

const inter = Inter({ subsets: ["latin"] });

const Home: React.FC = () => {
  // const [user] = useAuthState(auth);
  // const [loading, setLoading] = useState(false);
  // const [postStateValue, setPostStateValue] = useRecoilState(postState);

  // const getPosts = async () => {
  //   try {
  //     setLoading(true);
  //     // get posts from this community
  //     const postsQuery = query(
  //       collection(firestore, `users/${userDoc.displayName}/posts`),
  //       orderBy("createdAt", "desc")
  //     );

  //     const postDocs = await getDocs(postsQuery);

  //     //store in post state
  //     const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //     // console.log(posts);
  //     setPostStateValue((prev) => ({
  //       ...prev,
  //       posts: posts as Post[],
  //     }));
  //   } catch (error: any) {
  //     console.log("getPosts error: ", error.message);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   if (userDoc.displayName != user!.email!.split("@")[0]) {
  //     router.push(`/`);
  //   }
  // }, []);

  return (
    // <PageContent>
    //   <>
    //     {postStateValue.posts.map((item) => {
    //       return <GridPostItem userDoc={userDoc} key={item.id} item={item} />;
    //     })}
    //   </>
    //   <></>
    // </PageContent>
    // <h1>hi</h1>
    <PostLoader />
  );
};

// export async function getServerSideProps() {
//   const user = auth.currentUser;
//   console.log("user", user);

//   try {
//     const userDocRef = doc(firestore, `users/${user?.displayName}`);
//     const userDoc = await getDoc(userDocRef);
//     console.log(userDoc.data());

//     return {
//       props: {
//         userDoc: userDoc.exists()
//           ? JSON.parse(
//               safeJsonStringify({
//                 ...userDoc.data(),
//               })
//             )
//           : "",
//       },
//     };
//   } catch (error) {
//     console.log("getServerSideProps error", error);
//   }
// }

export default Home;
