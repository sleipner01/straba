// The Cloud Functions for Firebase SDK to create
// Cloud Functions and set up triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// https://firebase.google.com/docs/functions

// When a new user is created,
// we create a new document in userswith initial data
exports.newAccountCreated = functions.auth.user().onCreate((user) => {
  // Create a JSON document for the data
  const userDoc = {
    email: user.email,
    name: user.displayName,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    latestLogin: admin.firestore.FieldValue.serverTimestamp(),
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  // Becuase we are hosting the cloud function against out firebase
  // project, we need to now use the admin SDK
  admin.firestore().collection("users").doc(user.uid)
  // we create a document the same way we do on client
      .set(userDoc)
      .then((writeResult) => {
        console.log("User Created result:", writeResult);
        return;
      }).catch((err) => {
        console.log(err);
        return;
      });
});
