import { Comment, CommentState, Post } from "@/atoms/postAtom";
import { UserType } from "@/atoms/userAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
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
        commentorName: userDoc.displayName,
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
        selectedPost: prev.selectedPost,
        isLiked: prev.isLiked,
        comments: [...prev.comments, newComment],
        likes: prev.likes,
      }));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getComments = async () => {
    setLoading(true);
    try {
      const allComments = await getDocs(
        collection(
          firestore,
          `users/${userDoc.displayName}/posts/${postObject.id}/comments`
        )
      );

      const snippets = allComments.docs.map((doc) => ({ ...doc.data() }));
      console.log(snippets);

      const CurrentPostRef = doc(
        firestore,
        `users/${user!.email!.split("@")[0]}/posts/${postObject.id}`
      );
      const currentPost = await getDoc(CurrentPostRef);
      const userLikes = currentPost?.data()?.likes;
      const isLiked = currentPost?.data()?.isLiked;

      setCommentState((prev) => ({
        selectedPost: postObject,
        comments: snippets as Comment[],
        isLiked: isLiked,
        likes: userLikes,
      }));
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onLike = async (postId: string | undefined) => {
    try {
      setLoading(true);
      const batch = writeBatch(firestore);

      const CurrentUserRef = doc(
        firestore,
        `users/${user!.email!.split("@")[0]}`
      );
      const currentUser = await getDoc(CurrentUserRef);
      const profilePic = currentUser?.data()?.profilePic;

      const newLike = {
        name: user!.email!.split("@")[0],
        profilePic: profilePic,
      };

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
        { isLiked: true }
      );

      batch.update(
        doc(firestore, `users/${userDoc.displayName}/posts/${postId}`),
        {
          likes: increment(1),
        }
      );

      await batch.commit();
      setLoading(false);

      setCommentState((prev) => ({
        ...prev,
        selectedPost: prev.selectedPost,
        isLiked: true,
        likes: prev.likes + 1,
        comments: [...prev.comments],
      }));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onUnLike = async (postId: string | undefined) => {
    try {
      setLoading(true);
      const batch = writeBatch(firestore);

      batch.delete(
        doc(
          firestore,
          `users/${userDoc.displayName}/posts/${postId}/likes/${
            user!.email!.split("@")[0]
          }`
        )
      );

      batch.update(
        doc(firestore, `users/${userDoc.displayName}/posts/${postId}`),
        { isLiked: false }
      );

      batch.update(
        doc(firestore, `users/${userDoc.displayName}/posts/${postId}`),
        {
          likes: increment(-1),
        }
      );

      await batch.commit();
      setLoading(false);

      setCommentState((prev) => ({
        ...prev,
        selectedPost: prev.selectedPost,
        isLiked: false,
        likes: prev.likes - 1,
        comments: [...prev.comments],
      }));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return { addComment, loading, getComments, onLike, onUnLike };
};
export default usePost;
