import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// context
import { AuthProvider } from "./contexts/AuthContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Chapter from "./pages/Chapter";
import Classes from "./pages/Classes";
import Routine from "./pages/Routine";
import Logs from "./pages/Logs";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/routine">
            <Routine />
          </Route>
          <Route path="/logs">
            <Logs />
          </Route>
          <Route path="/chapter/:course">
            <Chapter />
          </Route>
          <Route path="/classes/:course/:classId">
            <Classes />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}
//nothing
export default App;
