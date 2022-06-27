import appRoutePaths from "../constants/appRoutePaths";
import { roles } from "../constants/roles";

export const navItems = [
  {
    key: "home",
    title: "HOME",
    href: appRoutePaths.quizzes.path.replace(/\//g, "#"),
    accessibleBy: [roles.admin, roles.user],
  },
  {
    key: "manage-quiz",
    title: appRoutePaths.manageQuiz.name,
    href: appRoutePaths.manageQuiz.path.replace(/\//g, "#"),
    accessibleBy: [roles.admin],
  },
  {
    key: "attempted Quizzes",
    title: appRoutePaths.myQuiz.name,
    href: appRoutePaths.myQuiz.path.replace(/\//g, "#"),
    accessibleBy: [roles.user],
  },
];