import React from "react";
import { checkIfLoggedIn } from "../../utils/Authenticate";
import { Route, Redirect } from "react-router-dom";

export default function Index({ props, children, ...rest }) {
  const loggedIn = checkIfLoggedIn();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn && loggedIn.role === rest.role ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              from: location,
            }}
          />
        )
      }
    />
  );
}
