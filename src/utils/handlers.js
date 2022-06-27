import { StatusCodes } from "http-status-codes";
import { loginCredentials } from "../mockStaticData/credentials";
import {
  getLocalStorageUserQuiz,
  getQuizzesFromLocalStorage,
  insertQuizzes,
  setLocalStorageUserQuiz,
} from "./localStorageHandlers";

export const userAuthentication = (data) => {
  const { email, password } = data;
  const user = loginCredentials.find((item) => {
    return item.email === email && item.password === password;
  });
  const response = {};
  if (user) {
    const resultUser = { ...user };
    delete resultUser["password"];
    response.status = StatusCodes.OK;
    response.data = resultUser;
  } else {
    response.status = StatusCodes.UNAUTHORIZED;
    response.error = "Email or password is incorrect";
  }

  return response;
};

export const quizListHandler = () => {
  const quizList = getQuizzesFromLocalStorage();
  let response = {};

  if (quizList) {
    response.status = StatusCodes.OK;
    response.data = [...quizList];
  } else {
    response.data = [];
    response.status = StatusCodes.NO_CONTENT;
  }

  return response;
};

export const quizDeleteHandler = (id) => {
  const quizListResponse = getQuizzesFromLocalStorage();

  let modifiedQuizList = [];

  if (quizListResponse) {
    const quizList = [...quizListResponse];
    modifiedQuizList = quizList.map((quiz) => {
      if (Number(quiz.id) === Number(id)) {
        quiz.isDeleted = true;
      }
      return quiz;
    });
    insertQuizzes(modifiedQuizList);
  }

  let response = {};

  if (modifiedQuizList) {
    response.status = StatusCodes.OK;
    response.data = [...modifiedQuizList];
  } else {
    response.data = [];
    response.status = StatusCodes.NO_CONTENT;
  }

  return response;
};

export const quizRestoreHandler = (id) => {
  const quizListResponse = getQuizzesFromLocalStorage();

  let modifiedQuizList = [];

  if (quizListResponse) {
    const quizList = [...quizListResponse];
    modifiedQuizList = quizList.map((quiz) => {
      if (Number(quiz.id) === Number(id)) {
        quiz.isDeleted = false;
      }
      return quiz;
    });
    insertQuizzes(modifiedQuizList);
  }

  let response = {};

  if (modifiedQuizList) {
    response.status = StatusCodes.OK;
    response.data = [...modifiedQuizList];
  } else {
    response.data = [];
    response.status = StatusCodes.NO_CONTENT;
  }

  return response;
};

export const quizUpdateHandler = (updatedData, id) => {
  const quizListResponse = getQuizzesFromLocalStorage();

  let modifiedQuizList = [];

  if (quizListResponse) {
    const quizList = [...quizListResponse];
    modifiedQuizList = quizList.map((quiz) => {
      if (Number(quiz.id) === Number(id)) {
        return updatedData;
      }
      return quiz;
    });

    insertQuizzes(modifiedQuizList);

    let response = {};

    if (modifiedQuizList) {
      response.status = StatusCodes.OK;
      response.data = [...modifiedQuizList];
    } else {
      response.data = [];
      response.status = StatusCodes.NO_CONTENT;
    }
    return response;
  }
};

export const questionAddHandler = (quizId, newQuestionData) => {
  const quizListResponse = getQuizzesFromLocalStorage();

  let response = {};

  if (quizListResponse) {
    let quizList = [...quizListResponse];

    const quizIndex = quizList.findIndex(
      (item) => Number(item.id) === Number(quizId)
    );

    if (quizIndex !== -1) {
      const currentQuiz = quizList[quizIndex];
      const len = currentQuiz.questions.length;

      const newQuestion = { ...newQuestionData, id: len + 1 };

      quizList[quizIndex].questions.push(newQuestion);
      insertQuizzes(quizList);

      response.status = StatusCodes.OK;
      response.data = quizList;
    } else {
      response.status = StatusCodes.NOT_FOUND;
      response.data = [];
    }
    return response;
  }
};

export const deleteQuestionHandler = (quizId, questionId) => {
  const quizList = getQuizzesFromLocalStorage();
  const response = {};

  const quizIndex = quizList.findIndex(
    (item) => Number(item.id) === Number(quizId)
  );

  if (quizIndex !== -1) {
    const questionIndex = quizList[quizIndex]?.questions?.findIndex(
      (question) => Number(question.id) === questionId
    );
    
    if (questionIndex !== -1) {
      quizList[quizIndex].questions[questionIndex].isDeleted = true;
      insertQuizzes(quizList);
      response.status = StatusCodes.OK;
      response.data = quizList;
    } else {
      response.status = StatusCodes.NOT_FOUND;
      response.data = [];
    }
  } else {
    response.status = StatusCodes.NOT_FOUND;
    response.data = [];
  }

  return response;
};


export const addUserQuizListHandler = (userid, quizId, quiz)=>{
  const userQuizList = getLocalStorageUserQuiz(userid, quizId);
  if(userQuizList){
    const index = userQuizList.findIndex(quiz=>Number(quiz.id)===Number(quizId));
    if (index !== -1) {
      userQuizList[index] = quiz;
      setLocalStorageUserQuiz(userQuizList);
    }
  }
}