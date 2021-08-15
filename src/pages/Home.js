import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import Alert from "@material-ui/lab/Alert";

export default function Home(props) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [navId, setNavId] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setNavId("/login");
    }
  }, []);

  async function handleLogout() {
    setError("");
    setLoading(true);
    try {
      await logout();
      setNavId("/login");
    } catch {
      setError("Failed to log out");
    }
    setLoading(false);
  }

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
        <li>
          <Link to="/routine">routine and notices</Link>
        </li>
      </ul>
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={handleLogout}
      >
        log out
      </Button>
      {navId ? <Redirect to={navId} /> : ""}
      {error && <Alert severity="error">{error}</Alert>}
    </div>
  );
}
