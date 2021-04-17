import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Me } from "./pages/Me";
import { Register } from "./pages/Register";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <header>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/register">Register</Link>
          </div>
          <div>
            <Link to="/login">login</Link>
          </div>
          <div>
            <Link to="/me">me</Link>
          </div>
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/me" component={Me} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
