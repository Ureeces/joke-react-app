import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Spinner from "./components/shared/Spinner";

import "./App.css";

const Home = lazy(() => import("./components/Home/Home"));

const App = () => {
  return (
    <Router>
      <Switch>
        <Suspense fallback={Spinner}>
          <Route exact path="/" component={Home} />
        </Suspense>
      </Switch>
    </Router>
  );
};

export default App;
