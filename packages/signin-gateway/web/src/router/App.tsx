import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AppBar from "../components/AppBar";
import routes from "./routes";
function App() {
  return (
    <Router>
      <Switch></Switch>
      <AppBar></AppBar>
      <Switch>
        {routes.map((route) => {
          return (
            <Route path={route.path}>
              <route.component></route.component>
            </Route>
          );
        })}
      </Switch>

      <footer></footer>
    </Router>
  );
}

export default App;
