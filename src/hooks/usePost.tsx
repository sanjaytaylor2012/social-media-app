import { Comment, CommentState, Like, Post } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { ref } from "firebase/storage";
import React, { useEffect, useId, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

//userDoc is currently viewed profile
const usePost = (userDoc: UserType, postObject: Post) => {
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [commentState, setCommentState] = useRecoilState(CommentState);

  const addComment = async (comment: string, postId: string) => {
    try {
      setLoading(true);
      const batch = writeBatch(firestore);

      const CurrentUserRef = doc(
        firestore,
        `users/${user!.email!.split("@")[0]}`
      );
      const currentUser = await getDoc(CurrentUserRef);
      const profilePic = currentUser?.data()?.profilePic;
      const id = uuidv4();

      const newComment: Comment = {
        commentorProfilePic: profilePic,
        commentorName: user!.email!.split("@")[0],
        body: comment,
        createdAt: serverTimestamp() as Timestamp,
        id: id,
        likes: 0,
      };

      batch.set(
        doc(
          firestore,
          `users/${userDoc.displayName}/posts/${postId}/comments/${id}`
        ),
        newComment
      );

      await batch.commit();

      setLoading(false);

      //   setFollowerStateValue((prev) => ({
      //     ...prev,
      //     myFollowings: [...prev.myFollowings, newSnippet],
      //     totalFollowings: prev.totalFollowings,
      //   }));

      setCommentState((prev) => ({
        ...prev,
        // selectedPost: prev.selectedPost,
        // profileLikes: [prev.profileLikes],
        // // isLiked: prev.isLiked,
        comments: [...prev.comments, newComment],
        // likes: prev.likes,
      }));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getComments = async () => {
    setLoading(true);
    try {
      const commentsQuery = query(
        collection(
          firestore,
          `users/${userDoc.displayName}/posts/${postObject.id}/comments`
        ),
        orderBy("createdAt", "asc")
      );

      const allComments = await getDocs(commentsQuery);

      const snippets = allComments.docs.map((doc) => ({ ...doc.data() }));
      // console.log(snippets);

      const CurrentPostRef = doc(
        firestore,
        `users/${userDoc.displayName}/posts/${postObject.id}`
      );
      const currentPost = await getDoc(CurrentPostRef);
      const userLikes = currentPost?.data()?.likes;

      const CurrentPostLikes = await getDocs(
        collection(
          firestore,
          `users/${userDoc.displayName}/posts/${postObject.id}/likes`
        )
      );

      const currentPostLikes = CurrentPostLikes.docs.map((doc) => ({
        ...doc.data(),
      }));

      setCommentState((prev) => ({
        selectedPost: postObject,
        profileLikes: currentPostLikes as Like[],
        comments: snippets as Comment[],
        // isLiked: isLiked,
        likes: userLikes,
      }));

      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onLike = async (postId: string | undefined) => {
    try {
      const batch = writeBatch(firestore);

      const CurrentUserRef = doc(
        firestore,
        `users/${user!.email!.split("@")[0]}`
      );
      const currentUser = await getDoc(CurrentUserRef);
      const profilePic = currentUser?.data()?.profilePic;

      const newLike: Like = {
        name: user!.email!.split("@")[0],
        profilePic: profilePic,
      };

      setCommentState((prev) => ({
        // ...prev,
        selectedPost: prev.selectedPost,
        // isLiked: true,
        profileLikes: [...prev.profileLikes, newLike],
        likes: prev.likes + 1,
        comments: [...prev.comments],
      }));

      batch.set(
        doc(
          firestore,
          `users/${userDoc.displayName}/posts/${postId}/likes/${
            user!.email!.split("@")[0]
          }`
        ),
        newLike
      );

      batch.update(
        doc(firestore, `users/${userDoc.displayName}/posts/${postId}`),
        {
          likes: increment(1),
        }
      );

      console.log(newLike);

      await batch.commit();

      console.log("on like profile Likes", commentState.profileLikes);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onUnLike = async (postId: string | undefined) => {
    try {
      setCommentState((prev) => ({
        ...prev,
        profileLikes: prev.profileLikes.filter(
          (item) => item.name !== user!.email!.split("@")[0]
        ),
        likes: prev.likes - 1,
      }));

      const batch = writeBatch(firestore);

      batch.delete(
        doc(
          firestore,
          `users/${userDoc.displayName}/posts/${postId}/likes/${
            user!.email!.split("@")[0]
          }`
        )
      );

      // batch.update(
      //   doc(firestore, `users/${userDoc.displayName}/posts/${postId}`),
      //   { isLiked: false }
      // );

      batch.update(
        doc(firestore, `users/${userDoc.displayName}/posts/${postId}`),
        {
          likes: increment(-1),
        }
      );

      await batch.commit();

      console.log("on unlike profile Likes", commentState.profileLikes);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return { addComment, setLoading, loading, getComments, onLike, onUnLike };
};
export default usePost;
