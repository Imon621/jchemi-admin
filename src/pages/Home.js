import { Button } from "@material-ui/core";
import React from "react";
import { Redirect, Link } from "react-router-dom";
import { db, auth } from "../component/firebase";

// var login = true;
// const setLogin = (bool) => {
//   login = bool;
// };

export default function Home(props) {
  const [login, setLogin] = React.useState(true);
  // auth.onAuthStateChanged((user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     var uid = user.uid;
  //     setLogin(true);
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //     setLogin(false);
  //   }
  // });

  return (
    <div>
      <ul>
        <li>
          <Link to="/chapter/hsc21">hsc21</Link>
        </li>
        <li>
          <Link to="/chapter/hsc22">hsc22</Link>
        </li>
        <li>
          <Link to="/chapter/master">master</Link>
        </li>
      </ul>
      <Button
        onClick={() => {
          auth.signOut().then((cred) => {
            setLogin(false);
          });
        }}
        variant="contained"
        color="primary"
      >
        log out
      </Button>
      {login ? "" : <Redirect to="/login" />}
    </div>
  );
}
