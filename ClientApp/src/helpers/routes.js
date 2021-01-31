import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//Use this to wrap a route you want to route user to if they are already loggedin
export function IsUserRedirect({ user, loggedInPath, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (!user) {
          return children;
        }

        if (user) {
          return <Redirect to={{ pathname: loggedInPath }} />;
        }

        return null;
      }}
    ></Route>
  );
}

//Use this to wrap a route you want to prevent access to if user is not logged in
export function ProtectedRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        }

        if (!user) {
          return <Redirect to={{ pathname: 'signin', state: { from: location } }} />;
        }

        return null;
      }}
    />
  );
}
