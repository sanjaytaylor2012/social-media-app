import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, auth, firestore } from "@/firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";

const inter = Inter({ subsets: ["latin"] });

type HomeProps = {
  loggedIn: string;
};

const Home: React.FC<HomeProps> = ({ loggedIn }) => {
  // console.log(loggedIn);

  return <h1>hi</h1>;
};

export async function getServerSideProps() {
  const user = auth.currentUser;
  console.log("user", user);

  try {
    const userDocRef = doc(firestore, `users/${user?.displayName}`);
    const userDoc = await getDoc(userDocRef);
    console.log(userDoc.data());

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

export default Home;
