import React from "react";
import appRoutes from "./constants/appRoutes";

const Login = React.lazy(() => import("./views/pages/login/Login"));
const Answers = React.lazy(() => import("./views/pages/answers/Answers"));
const Questions = React.lazy(() => import("./views/pages/questions/Questions"));

export const publicRoutes = [
  {
    path: appRoutes.home.path,
    exact: true,
    name: appRoutes.home.name
  },
  {
    path: appRoutes.login.path,
    exact: true,
    name: appRoutes.login.name,
    component: Login,
  },
];

export const privateRoutes = [
  {
    path: appRoutes.answers.path,
    exact: true,
    name: appRoutes.answers.name,
    component: Answers,
  },
  {
    path: appRoutes.questions.path,
    exact: true,
    name: appRoutes.questions.name,
    component: Questions,
  },
];
