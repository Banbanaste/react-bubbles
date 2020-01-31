import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <NavBar />
        <Switch>
          <PrivateRoute path="/protected" component={BubblePage} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
