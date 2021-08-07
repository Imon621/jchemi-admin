import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  CardContent,
  Card,
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";

import { db, auth } from "../component/firebase";

export default function Login() {
  //
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
  // form management
  const defaultValues = {
    // name: "",
    // age: 0,
    // sex: "",
    // os: "",
    // favoriteNumber: 0,
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = React.useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(formValues.email, formValues.password)
      .then((cred) => {
        console.log(cred);
        setLogin(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   styling
  const useStyles = makeStyles({
    root: {
      maxWidth: 500,
    },
    main: {
      height: 100 + "vh",
    },
  });
  const styles = useStyles();

  return (
    <>
      <Grid
        style={{ height: 80 + "vh" }}
        container
        alignItems="center"
        justify="center"
        direction="column"
      >
        <Grid item>
          <Card className={styles.root}>
            <CardContent>
              <Typography variant="h5">Log In</Typography>
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  direction="column"
                >
                  <Grid item>
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      type="Email"
                      value={formValues.email}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="password"
                      name="password"
                      label="Password"
                      type="Password"
                      value={formValues.password}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      style={{ marginTop: 30 }}
                      variant="outlined"
                      color="primary"
                      type="submit"
                    >
                      Log In
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        {login ? <Redirect to="/home" /> : ""}
      </Grid>
    </>
  );
}
