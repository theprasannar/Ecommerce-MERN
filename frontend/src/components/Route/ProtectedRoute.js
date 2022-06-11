import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={() => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }
            if (isAuthenticated === false && user.role !== "admin") {
              return <Redirect to="/login" />;
            }
            return <Component />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
