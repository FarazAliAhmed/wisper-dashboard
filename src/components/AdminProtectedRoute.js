import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authService";

const AdminProtectedRoute = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser()) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
        if (!auth.getCurrentUser().isAdmin) {
          return <Redirect to="/dashboard" />;
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default AdminProtectedRoute;
