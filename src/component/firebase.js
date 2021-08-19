import firebase from "./fireConfig";

const db = firebase.firestore();
const auth = firebase.auth();

function clsUpdate(data, obj) {
  const arr = data.split("/");
  try {
    if (arr.length === 4) {
      db.collection(arr[0])
        .doc(arr[1])
        .collection(arr[2])
        .doc(arr[3])
        .update(obj);
    } else {
      db.collection(arr[0]).doc(arr[1]).update(obj);
    }
  } catch (e) {
    console.log(e);
  }
}

export { db, auth, clsUpdate };
