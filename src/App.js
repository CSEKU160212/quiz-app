import React, { useEffect } from "react";
import "./App.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import { publicRoutes } from "./routes";
import appRoutePaths from "./constants/appRoutePaths";
import { AuthProvider, QuizProvider } from "./context";
import { getQuizzesFromLocalStorage, insertQuizzes } from "./utils/localStorageHandlers";
import { mockQuizList } from "./mockStaticData/quizList";
import { Spinner } from "react-bootstrap";

const TheLayout = React.lazy(() => import("./containers/TheLayout"));

const loading = (
  <div className="pt-3 text-center">
    <Spinner animation="border" variant="primary" />
  </div>
);

function App() {
  
  useEffect(() => {
    if (!getQuizzesFromLocalStorage()) {
      insertQuizzes(mockQuizList);
    }
  }, []);

  return (
    <AuthProvider>
      <QuizProvider>
        <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              {publicRoutes.map((route, idx) => {
                return (
                  route.component && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => <route.component {...props} />}
                    />
                  )
                );
              })}
              <Route
                path={appRoutePaths.home.path}
                name={appRoutePaths.home.name}
                render={(props) => <TheLayout {...props} />}
              />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
