import { Button } from "@material-ui/core";
import React from "react";
import { Redirect, Link } from "react-router-dom";
import { db, auth } from "../component/firebase";

export default function Home(props) {
  //   props.history.push("/login");
  const [login, setLogin] = React.useState(auth.currentUser ? true : false);
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
