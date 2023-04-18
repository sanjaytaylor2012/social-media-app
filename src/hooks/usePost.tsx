import { Comment, Like, Post, postState } from "@/atoms/postAtom";
import { currentUserStates, UserType } from "@/atoms/userAtom";
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
const usePost = (postObject: Post) => {
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [currentPostState, setCurrentPostState] = useRecoilState(postState);

  const addComment = async (comment: string) => {
    try {
      setLoading(true);
      const batch = writeBatch(firestore);

      //fix so i dont have to call user info every time.
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
        doc(firestore, `posts/${postObject.id}/comments/${id}`),
        newComment
      );

      await batch.commit();

      setLoading(false);

      //   setFollowerStateValue((prev) => ({
      //     ...prev,
      //     myFollowings: [...prev.myFollowings, newSnippet],
      //     totalFollowings: prev.totalFollowings,
      //   }));

      // setCommentState((prev) => ({
      //   ...prev,

      //   comments: [...prev.comments, newComment],
      // }));

      const updatedPosts = currentPostState.posts.map((post) => {
        if (post.id === postObject.id) {
          const updatedComments = [newComment, ...post.comments];

          const updatedPost = {
            ...post,
            comments: updatedComments,
          };
          return updatedPost;
        } else {
          return post;
        }
      });

      setCurrentPostState((prevState) => ({
        ...prevState,
        posts: updatedPosts,
      }));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getComments = async (displayName: string) => {
    setLoading(true);
    try {
      const commentsQuery = query(
        collection(
          firestore,
          `users/${displayName}/posts/${postObject.id}/comments`
        ),
        orderBy("createdAt", "asc")
      );

      const allComments = await getDocs(commentsQuery);

      const snippets = allComments.docs.map((doc) => ({ ...doc.data() }));
      // console.log(snippets);

      const CurrentPostRef = doc(
        firestore,
        `users/${displayName}/posts/${postObject.id}`
      );
      const currentPost = await getDoc(CurrentPostRef);
      const userLikes = currentPost?.data()?.likes;

      const CurrentPostLikes = await getDocs(
        collection(
          firestore,
          `users/${displayName}/posts/${postObject.id}/likes`
        )
      );

      const currentPostLikes = CurrentPostLikes.docs.map((doc) => ({
        ...doc.data(),
      }));

      // setCommentState((prev) => ({
      //   selectedPost: postObject,
      //   profileLikes: currentPostLikes as Like[],
      //   comments: snippets as Comment[],
      //   // isLiked: isLiked,
      //   likes: userLikes,
      // }));

      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onLike = async () => {
    try {
      const batch = writeBatch(firestore);

      //FIX THIS
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

      batch.set(
        doc(
          firestore,
          `posts/${postObject.id}/likeProfiles/${user!.email!.split("@")[0]}`
        ),
        newLike
      );

      batch.update(doc(firestore, `posts/${postObject.id}`), {
        likes: increment(1),
      });

      console.log(newLike);

      await batch.commit();

      // console.log("on like profile Likes", commentState.profileLikes);

      const updatedPosts = currentPostState.posts.map((postItem) => {
        if (postItem.id === postObject.id) {
          // const updatedLikeProfiles = [...postItem.likeProfiles, newLike];
          const updatedLikeProfiles = [...postItem.likeProfiles, newLike];
          const updatedPost = {
            ...postItem,
            likeProfiles: updatedLikeProfiles,
            likes: postItem.likes + 1,
          };
          return updatedPost;
        } else {
          return postItem;
        }
      });

      setCurrentPostState((prev) => ({
        ...prev,
        posts: updatedPosts,
      }));

      // setCommentState((prev) => ({
      //   // ...prev,
      //   selectedPost: prev.selectedPost,
      //   // isLiked: true,
      //   profileLikes: [...prev.profileLikes, newLike],
      //   likes: prev.likes + 1,
      //   comments: [...prev.comments],
      // }));
    } catch (error: any) {
      console.log(error);
    }
  };

  const onUnLike = async () => {
    try {
      // setCommentState((prev) => ({
      //   ...prev,
      //   profileLikes: prev.profileLikes.filter(
      //     (item) => item.name !== user!.email!.split("@")[0]
      //   ),
      //   likes: prev.likes - 1,
      // }));

      const batch = writeBatch(firestore);

      batch.delete(
        doc(
          firestore,
          `posts/${postObject.id}/likeProfiles/${user!.email!.split("@")[0]}`
        )
      );

      // batch.update(
      //   doc(firestore, `users/${userDoc.displayName}/posts/${postId}`),
      //   { isLiked: false }
      // );

      batch.update(doc(firestore, `posts/${postObject.id}`), {
        likes: increment(-1),
      });

      await batch.commit();

      // console.log("on unlike profile Likes", commentState.profileLikes);

      const updatedPosts = currentPostState.posts.map((postItem) => {
        if (postItem.id === postObject.id) {
          console.log(postItem.likeProfiles);
          const updatedLikeProfiles = postItem.likeProfiles.filter(
            (profile) => {
              return profile.name !== user!.email!.split("@")[0];
            }
          );
          console.log(updatedLikeProfiles);
          const updatedPost = {
            ...postItem,
            likeProfiles: updatedLikeProfiles,
            likes: postItem.likes - 1,
          };
          return updatedPost;
        } else {
          return postItem;
        }
      });
      console.log(updatedPosts);

      setCurrentPostState((prev) => ({
        ...prev,
        posts: updatedPosts,
      }));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return {
    addComment,
    setLoading,
    loading,
    getComments,
    onLike,
    onUnLike,
    currentPostState,
    setCurrentPostState,
  };
};
export default usePost;
