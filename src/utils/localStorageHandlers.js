import {
  COMPLETE_QUIZ_LIST,
  localStorageUserQuizKey,
  LOCAL_STORAGE_AUTH_USER_KEY,
  LOCAL_STORAGE_IS_AUTHENTICATED_KEY,
  LOCAL_STORAGE_QUZZES_KEY,
} from "../constants/keys";

export const getLocalStorageUser = () => {
  return localStorage.getItem(LOCAL_STORAGE_AUTH_USER_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_USER_KEY))
    : "";
};

export const setLocalStorageUser = (value) => {
  localStorage.setItem(LOCAL_STORAGE_AUTH_USER_KEY, JSON.stringify(value));
};

export const removeLocalStorageUser = () => {
  localStorage.removeItem(LOCAL_STORAGE_AUTH_USER_KEY);
};

export const getLocalStorageIsAuthenticated = () => {
  return localStorage.getItem(LOCAL_STORAGE_IS_AUTHENTICATED_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_IS_AUTHENTICATED_KEY))
    : "";
};

export const setLocalStorageIsAuthenticated = (value) => {
  localStorage.setItem(
    LOCAL_STORAGE_IS_AUTHENTICATED_KEY,
    JSON.stringify(value)
  );
};

export const removeLocalStorageIsAuthenticated = () => {
  localStorage.removeItem(LOCAL_STORAGE_IS_AUTHENTICATED_KEY);
};

export const getQuizzesFromLocalStorage = () => {
  return localStorage.getItem(LOCAL_STORAGE_QUZZES_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_QUZZES_KEY))
    : "";
};

export const insertQuizzes = (value) => {
  localStorage.setItem(LOCAL_STORAGE_QUZZES_KEY, JSON.stringify(value));
};

export const removeQuizzesFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_QUZZES_KEY);
};


export const getLocalStorageUserQuiz = (userid) => {
  const key = localStorageUserQuizKey(userid);
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : "";
};

export const setLocalStorageUserQuiz = (userid, value) => {
  const key = localStorageUserQuizKey(userid);
  let quizList = getLocalStorageUserQuiz(userid);
  console.log({quizList});
  let updatedQuiz = { ...value };
  if (quizList) {
    quizList.push(updatedQuiz);
    localStorage.setItem(key, JSON.stringify([...quizList]));
  } else {
    localStorage.setItem(
      key,
      JSON.stringify([{ ...updatedQuiz }])
    );
  }
};


export const getCompleteQuizList = () => {
  return localStorage.getItem(COMPLETE_QUIZ_LIST)
    ? JSON.parse(localStorage.getItem(COMPLETE_QUIZ_LIST))
    : "";
};

export const setCompleteQuizList = (quiz)=>{
  let quizList = getCompleteQuizList();
  let updatedQuiz = {...quiz};
  if(quizList){
    quizList.push(updatedQuiz);
    localStorage.setItem(COMPLETE_QUIZ_LIST, JSON.stringify([...quizList]));
  }else{
    localStorage.setItem(
      COMPLETE_QUIZ_LIST,
      JSON.stringify([{ ...updatedQuiz }])
    );
  }
}
