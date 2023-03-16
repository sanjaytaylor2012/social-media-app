import { postState } from "@/atoms/postAtom";
import {
  FollowerStates,
  followProfile,
  UserStates,
  UserStates1,
  UserType,
} from "@/atoms/userAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
  getDocs,
  collection,
  writeBatch,
  doc,
  increment,
  getDoc,
} from "firebase/firestore";
import { ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const useProfile = (userDoc: UserType) => {
  const [user] = useAuthState(auth);

  const [followerStateValue, setFollowerStateValue] =
    useRecoilState(UserStates);

  const [currentUserFollowerStateValue, setCurrentUserFollowerStateValue] =
    useRecoilState(UserStates1);

  const [myFollowersStateValue, setMyFollowersStateValue] =
    useRecoilState(FollowerStates);

  const [loading, setLoading] = useState(false);

  const getCurrentFollows = async () => {
    try {
      const profilesDocs = await getDocs(
        collection(firestore, `users/${userDoc.displayName}/followingProfiles/`)
      );

      const snippets = profilesDocs.docs.map((doc) => ({ ...doc.data() }));
      // console.log("Snippets", snippets);

      //getting ppl that current profile follows
      setFollowerStateValue((prev) => ({
        myFollowings: snippets as followProfile[],
        totalFollowings: snippets.length,
      }));
    } catch (error: any) {
      console.log("Snippets error,", error.message);
    }
  };

  const getMyFollows = async () => {
    try {
      const profilesDocs = await getDocs(
        collection(
          firestore,
          `users/${user!.email!.split("@")[0]}/followingProfiles/`
        )
      );

      const snippets = profilesDocs.docs.map((doc) => ({ ...doc.data() }));

      //getting ppl that current profile follows
      setCurrentUserFollowerStateValue((prev) => ({
        myFollowings: snippets as followProfile[],
        totalFollowings: snippets.length,
      }));
    } catch (error: any) {
      console.log("Snippets error,", error.message);
    }
  };

  const getMyFollowers = async () => {
    try {
      const profilesDocs = await getDocs(
        collection(firestore, `users/${userDoc.displayName}/followerProfiles/`)
      );

      const snippets = profilesDocs.docs.map((doc) => ({ ...doc.data() }));
      // console.log("Snippets", snippets);

      //getting ppl that follow the current profile
      setMyFollowersStateValue((prev) => ({
        myFollowers: snippets as followProfile[],
        totalFollowers: snippets.length,
      }));
    } catch (error: any) {
      console.log("Snippets error,", error.message);
    }
  };

  useEffect(() => {
    getCurrentFollows();
    getMyFollowers();
    getMyFollows();
  }, [userDoc]);

  const unFollow = async (displayName: string) => {
    try {
      setLoading(true);
      const batch = writeBatch(firestore);
      batch.delete(
        doc(
          firestore,
          `users/${user!.email!.split("@")[0]}/followingProfiles/`,
          displayName
        )
      );

      batch.delete(
        doc(
          firestore,
          `users/${userDoc.displayName}/followerProfiles/`,
          user!.email!.split("@")[0]
        )
      );

      batch.update(doc(firestore, `users/${user!.email!.split("@")[0]}`), {
        following: increment(-1),
      });

      batch.update(doc(firestore, `users/${displayName}`), {
        followers: increment(-1),
      });

      await batch.commit();

      setFollowerStateValue((prev) => ({
        ...prev,
        myFollowings: prev.myFollowings.filter(
          (item) => item.name !== displayName
        ),
        totalFollowings: prev.totalFollowings,
      }));

      setCurrentUserFollowerStateValue((prev) => ({
        ...prev,
        myFollowings: prev.myFollowings.filter(
          (item) => item.name !== displayName
        ),
        totalFollowings: prev.totalFollowings,
      }));

      setMyFollowersStateValue((prev) => ({
        ...prev,
        myFollowers: prev.myFollowers.filter(
          (item) => item.name !== displayName
        ),
        totalFollowers: prev.totalFollowers - 1,
      }));

      //   if (userDoc.displayName !== user!.email!.split("@")[0]) {
      //     userDoc.followers -= 1;
      //   }

      //   if (userDoc.displayName === user!.email!.split("@")[0]) {
      //     userDoc.following -= 1;
      //   }

      setLoading(false);
    } catch (error: any) {
      console.log("unFollow error, ", error.message);
    }

    setLoading(false);
  };

  const removeFollower = async (displayName: string) => {
    try {
      setLoading(true);
      const batch = writeBatch(firestore);
      batch.delete(
        doc(
          firestore,
          `users/${displayName}/followingProfiles/`,
          user!.email!.split("@")[0]
        )
      );

      batch.delete(
        doc(
          firestore,
          `users/${user!.email!.split("@")[0]}/followerProfiles/`,
          displayName
        )
      );

      batch.update(doc(firestore, `users/${user!.email!.split("@")[0]}`), {
        followers: increment(-1),
      });

      batch.update(doc(firestore, `users/${displayName}`), {
        following: increment(-1),
      });

      await batch.commit();

      setMyFollowersStateValue((prev) => ({
        ...prev,
        myFollowers: prev.myFollowers.filter(
          (item) => item.name !== displayName
        ),
        totalFollowers: prev.totalFollowers - 1,
      }));

      //   if (userDoc.displayName !== user!.email!.split("@")[0]) {
      //     userDoc.followers -= 1;
      //   }

      //   if (userDoc.displayName === user!.email!.split("@")[0]) {
      //     userDoc.following -= 1;
      //   }

      setLoading(false);
    } catch (error: any) {
      console.log("unFollow error, ", error.message);
    }

    setLoading(false);
  };

  const follow = async (displayName: string) => {
    try {
      setLoading(true);
      const batch = writeBatch(firestore);
      const newSnippet: followProfile = {
        name: displayName,
        profilePic: userDoc.profilePic,
      };

      const profilePicRef = doc(
        firestore,
        `users/${user!.email!.split("@")[0]}`
      );

      const profilePicDoc = await getDoc(profilePicRef);
      // console.log(profilePicDoc.data());

      const newFollowerSnippet: followProfile = {
        name: user!.email!.split("@")[0],
        profilePic: profilePicDoc?.data()?.profilePic,
      };

      batch.set(
        doc(
          firestore,
          `users/${userDoc.displayName}/followerProfiles/`,
          user!.email!.split("@")[0]
        ),
        newFollowerSnippet
      );

      batch.set(
        doc(
          firestore,
          `users/${user!.email!.split("@")[0]}/followingProfiles/`,
          displayName
        ),
        newSnippet
      );

      batch.set(
        doc(
          firestore,
          `users/${userDoc.displayName}/followerProfiles/`,
          user!.email!.split("@")[0]
        ),
        newFollowerSnippet
      );

      batch.update(doc(firestore, `users/${user!.email!.split("@")[0]}`), {
        following: increment(1),
      });

      batch.update(doc(firestore, `users/${displayName}`), {
        followers: increment(1),
      });

      await batch.commit();

      //update recoil state - communityState.mySnippets

      setFollowerStateValue((prev) => ({
        ...prev,
        myFollowings: [...prev.myFollowings, newSnippet],
        totalFollowings: prev.totalFollowings,
      }));

      setCurrentUserFollowerStateValue((prev) => ({
        ...prev,
        myFollowings: [...prev.myFollowings, newSnippet],
        totalFollowings: prev.totalFollowings,
      }));

      setMyFollowersStateValue((prev) => ({
        ...prev,
        myFollowers: [...prev.myFollowers, newFollowerSnippet],
        totalFollowers: prev.totalFollowers + 1,
      }));

      //   if (userDoc.displayName !== user!.email!.split("@")[0]) {
      //     userDoc.followers += 1;
      //   }

      //   if (userDoc.displayName === user!.email!.split("@")[0]) {
      //     userDoc.following += 1;
      //   }

      setLoading(false);
    } catch (error: any) {
      console.log("joinCommunity error", error);
    }
  };

  const onFollowUnFollow = async (displayName: string, isJoined: boolean) => {
    if (isJoined) {
      unFollow(displayName);
    } else {
      follow(displayName);
    }

    try {
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return {
    onFollowUnFollow,
    followerStateValue,
    loading,
    myFollowersStateValue,
    removeFollower,
    currentUserFollowerStateValue,
  };
};

export default useProfile;
