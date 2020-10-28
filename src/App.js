import React from "react";
import { connect } from "react-redux";
import {
  Route,
  HashRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { createStructuredSelector } from "reselect";
import "./App.scss";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Layout from "./components/common/Layout";
import {
  LOGIN,
  REGISTER,
  HOME,
  ALLNOTES,
  TODAY,
  NEXT7DAYS,
  PROJECT,
  PROFILE,
  FORGOTPASSWORD,
} from "./constants/routes";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import ForgotPassword from "./pages/forgotPassword";
import Home from "./pages/home/Home";
import Inbox from "./pages/Inbox";
import Next7Days from "./pages/next7Days";
import Profile from "./pages/profile";
import Project from "./pages/project";
import Today from "./pages/Today";
import { selectCurrentUser } from "./redux/user/user.selector";

const App = ({ user }) => {
  return (
    <div className="theme-light">
      <Router>
        <Switch>
          <IsUserRedirect user={user} path={LOGIN} loggedInPath={HOME}>
            <Login />
          </IsUserRedirect>
          <IsUserRedirect user={user} path={REGISTER} loggedInPath={HOME}>
            <Register />
          </IsUserRedirect>
          <IsUserRedirect user={user} path={FORGOTPASSWORD} loggedInPath={HOME}>
            <ForgotPassword />
          </IsUserRedirect>
          <Layout>
            <ProtectedRoute user={user} path={HOME} exact>
              <Home />
            </ProtectedRoute>
            <ProtectedRoute user={user} path={ALLNOTES}>
              <Inbox />
            </ProtectedRoute>
            <ProtectedRoute user={user} path={TODAY}>
              <Today />
            </ProtectedRoute>
            <ProtectedRoute user={user} path={NEXT7DAYS}>
              <Next7Days />
            </ProtectedRoute>
            <ProtectedRoute user={user} path={PROJECT}>
              <Project />
            </ProtectedRoute>
            <ProtectedRoute user={user} path={PROFILE}>
              <Profile />
            </ProtectedRoute>
          </Layout>
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
