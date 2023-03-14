import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

//event listener that waits for user to be created and
//adds that user to a new collection of users
export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    db.collection("users")
      .doc(user!.email!.split("@")[0])
      .set(
        JSON.parse(
          JSON.stringify({
            displayName: user!.email!.split("@")[0],
            uid: user.uid,
            profilePic: "",
            email: user.email,
            numPosts: 0,
            followers: 0,
            following: 0,
            bio: "",
          })
        )
      );
    // .set(JSON.parse(JSON.stringify("hello")));
  });

//npm install -g firebase-tools
//ran firebase init to initialize firebase
//then run firebase deploy --only functions
//to initialize only function deployment for the program
