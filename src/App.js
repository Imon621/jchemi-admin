import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Chapter from "./pages/Chapter";
import Classes from "./pages/Classes";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
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
    </Router>
  );
}
//nothing
export default App;
