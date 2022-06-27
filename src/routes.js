import React from "react";
import appRoutePaths from "./constants/appRoutePaths";
import {roles} from "./constants/roles";

const Login = React.lazy(() => import("./views/pages/login/Login"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Quizzes = React.lazy(() => import("./views/pages/home/Quizzes"));
const ManageQuiz = React.lazy(() => import("./views/pages/manageQuiz/Index"));
const MyQuiz = React.lazy(() => import("./views/pages/myQuiz/Index")); 
const Answers = React.lazy(() => import("./views/pages/answers/Index"));
const Questions = React.lazy(() => import("./views/pages/questions/Index"));

export const publicRoutes = [
  {
    path: appRoutePaths.home.path,
    exact: true,
    name: appRoutePaths.home.name,
  },
  {
    path: appRoutePaths.login.path,
    exact: true,
    name: appRoutePaths.login.name,
    component: Login,
  },
  {
    path: appRoutePaths.error.path,
    exact: true,
    name: appRoutePaths.error.name,
    component: Page404,
  }
];

export const privateRoutes = [
  {
    path: appRoutePaths.answers.path,
    exact: true,
    name: appRoutePaths.answers.name,
    component: Answers,
    visibleFor: [roles.admin, roles.user],
  },
  {
    path: appRoutePaths.questions.path,
    exact: true,
    name: appRoutePaths.questions.name,
    component: Questions,
    visibleFor: [roles.admin],
  },
  {
    path: appRoutePaths.quizzes.path,
    exact: true,
    name: appRoutePaths.quizzes.name,
    component: Quizzes,
    visibleFor: [roles.admin, roles.user],
  },
  {
    path: appRoutePaths.manageQuiz.path,
    exact: true,
    name: appRoutePaths.manageQuiz.name,
    component: ManageQuiz,
    visibleFor: [roles.admin],
  },
  {
    path: appRoutePaths.myQuiz.path,
    exact: true,
    name: appRoutePaths.myQuiz.name,
    component: MyQuiz,
    visibleFor: [roles.admin, roles.user],
  },
];
