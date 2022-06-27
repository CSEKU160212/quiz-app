export const home = {
  name: "HOME",
  path: "/",
};

export const login = {
  name: "LOGIN",
  path: "/login",
};


export const error = {
  name: "404",
  path: "/404",
};

export const manageQuiz = {
  name: "MANAGE",
  path: "/manage-quiz",
};

export const myQuiz = {
  name: "MY QUIZ",
  path: "/my-quiz",
};

export const quizzes = {
  name: "QUIZZES",
  path: "/quizzes",
};

export const questions = {
  name: "QUESTIONS",
  path: "/questions/:id",
};

export const answers = {
  name: "ANSWERS",
  path: "/answers/:id",
};

const appRoutePaths = {
  home,
  login,
  error,
  manageQuiz,
  myQuiz,
  quizzes,
  answers,
  questions,
};

export default appRoutePaths;
