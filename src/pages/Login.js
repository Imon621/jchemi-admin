import React, { useRef, useState } from "react";

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

import { useAuth } from "../contexts/AuthContext";

import Alert from "@material-ui/lab/Alert";

export default function Login() {
  //
  const [navId, setNavId] = useState();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // form management
  const defaultValues = {
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
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(formValues.email, formValues.password);
      setNavId("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }
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
                      disabled={loading}
                    >
                      Log In
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        {error && <Alert severity="error">{error}</Alert>}
        {navId ? <Redirect to={navId} /> : ""}
      </Grid>
    </>
  );
}
