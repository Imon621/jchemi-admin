import firebase from "./fireConfig";

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
