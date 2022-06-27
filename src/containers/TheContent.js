import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {Container, Spinner} from "react-bootstrap";

import { useAuthState } from "../context";
import { privateRoutes } from "../routes";
import appRoutePaths from "../constants/appRoutePaths";
import { getVisibleRoutes } from "../utils";

const loading = (
  <div className="pt-3 text-center">
    <Spinner animation="border" variant="primary" />
  </div>
);

const TheContent = () => {
  const  {authUser, isAuthenticated} = useAuthState();

  let visibleRoutes = [];
  if(authUser){
    visibleRoutes = getVisibleRoutes(privateRoutes, authUser.role);
  }

  return (
    <>
      <main className="c-main" style={{ paddingTop: "0px" }}>
        <Container fluid>
          <Suspense fallback={loading}>
            <Switch>
              {authUser &&
                isAuthenticated &&
                visibleRoutes.map((route, idx) => {
                  return (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => <route.component {...props} />}
                    />
                  );
                })}
                <Redirect
                  from={appRoutePaths.home.path}
                  to={appRoutePaths.quizzes.path}
                />
              {/* <Redirect
                to={appRoutePaths.error.path}
              /> */}
            </Switch>
          </Suspense>
        </Container>
      </main>
    </>
  );
};

export default TheContent;
