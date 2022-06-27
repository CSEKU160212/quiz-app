export const LOCAL_STORAGE_AUTH_USER_KEY = "user";
export const LOCAL_STORAGE_IS_AUTHENTICATED_KEY = "isAuthenticated";
export const LOCAL_STORAGE_QUZZES_KEY = "quizzes";
export const LOCAL_STORAGE_ARCHIEVE_KEY = "archieves";
export const localStorageUserQuizKey = (userid, quizId)=>{
    return `quiz-${userid}`
};

export const COMPLETE_QUIZ_LIST = "completeQuiz";