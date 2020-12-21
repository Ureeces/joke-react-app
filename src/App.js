import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Navbar from "./components/Nav/Navbar";
import Spinner from "./components/shared/Spinner";

import AuthContext from "./components/context/AuthContext";

import "./App.css";

const Home = lazy(() => import("./components/Home/Home"));
const Auth = lazy(() => import("./components/Auth/Auth"));
const Joke = lazy(() => import("./components/Joke/Joke"));

const App = () => {
  return (
    <Router>
      <AuthContext>
        <Navbar />
        <Switch>
          <Suspense fallback={Spinner}>
            <Route exact path="/sign-in" component={Auth} />
            <Route exact path="/sign-up" component={Auth} />
            <Route exact path="/joke" component={Joke} />
            <Route exact path="/home" component={Home} />
            <Route
              exact
              path="/logout"
              render={() => <Redirect to="sign-in" />}
            />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </Suspense>
        </Switch>
      </AuthContext>
    </Router>
  );
};

export default App;
