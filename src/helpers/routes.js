import React from "react";
import { Route, Redirect } from "react-router-dom";

export const IsUserRedirect = ({ user, loggedInPath, children, ...rest }) => {
  const { token } = user;
  return (
    <Route
      {...rest}
      render={() => {
        if (!token) {
          return children;
        }
        if (token) {
          return <Redirect to={{ pathname: loggedInPath }} />;
        }

        return null;
      }}
    />
  );
};

export const ProtectedRoute = ({ user, children, ...rest }) => {
  const { token } = user;
  return (
    <Route
      {...rest}
      render={(location) => {
        if (token) {
          return children;
        }
        if (!token) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
};
