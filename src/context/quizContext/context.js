import React, { useReducer } from "react";
import { initialState, QuizReducer } from "./reducer";

const QuizStateContext = React.createContext();
const QuizDispatchContext = React.createContext();

export const useQuizState = () => {
  const context = React.useContext(QuizStateContext);
  if (context === undefined) {
    throw new Error("useQuizState must be used within a AuthProvider");
  }

  return context;
};

export const useQuizDispatch = () => {
  const context = React.useContext(QuizDispatchContext);
  if (context === undefined) {
    throw new Error("useQuizDispatch must be used within a AuthProvider");
  }

  return context;
};

export const QuizProvider = ({ children }) => {
  const [quizList, dispatch] = useReducer(QuizReducer, initialState);

  return (
    <QuizStateContext.Provider value={quizList}>
      <QuizDispatchContext.Provider value={dispatch}>
        {children}
      </QuizDispatchContext.Provider>
    </QuizStateContext.Provider>
  );
};
