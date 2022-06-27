import { StatusCodes } from "http-status-codes";
import {
  deleteQuestionHandler,
  questionAddHandler,
  quizDeleteHandler,
  quizListHandler,
  quizRestoreHandler,
  quizUpdateHandler,
} from "../../utils/handlers";
import {
  ADD_QUESTION_REQUEST,
  ADD_QUESTION_REQUEST_FAILURE,
  ADD_QUESTION_REQUEST_SUCCESS,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_REQUEST_FAILURE,
  DELETE_QUESTION_REQUEST_SUCCESS,
  QUIZ_ADD_REQUEST,
  QUIZ_ADD_REQUEST_FAILURE,
  QUIZ_DELETE_REQUEST,
  QUIZ_DELETE_REQUEST_FAILURE,
  QUIZ_DELETE_REQUEST_SUCCESS,
  QUIZ_LIST_REQUEST,
  QUIZ_LIST_REQUEST_FAILURE,
  QUIZ_LIST_REQUEST_SUCCESS,
  QUIZ_QUESTIONS_REQUEST,
  QUIZ_QUESTIONS_REQUEST_FAILURE,
  QUIZ_QUESTIONS_REQUEST_SUCCESS,
  QUIZ_RESTORE_FROM_ARCHIEVE_REQUEST,
  QUIZ_RESTORE_FROM_ARCHIEVE_REQUEST_FAILURE,
  QUIZ_RESTORE_FROM_ARCHIEVE_REQUEST_SUCCESS,
  QUIZ_UPDATE_REQUEST,
  QUIZ_UPDATE_REQUEST_FAILURE,
  QUIZ_UPDATE_REQUEST_SUCCESS,
  REMOVE_ADD_MESSAGE,
  REMOVE_DELTE_MESSAGE,
  REMOVE_QUIZ_ERROR_MESSAGE,
  REMOVE_QUIZ_UPDATE_MESAGE,
} from "./actionsTypes";

const quizListRequest = () => {
  return {
    type: QUIZ_LIST_REQUEST,
  };
};

const quizListRequestSuccess = (data) => {
  return {
    type: QUIZ_LIST_REQUEST_SUCCESS,
    payload: data,
  };
};

const quizListRequestFailure = (error) => {
  return {
    type: QUIZ_LIST_REQUEST_FAILURE,
    payload: error,
  };
};

const quizAddRequest = () => {
  return {
    type: QUIZ_ADD_REQUEST,
  };
};

const quizAddRequestSuccess = (data) => {
  return {
    type: QUIZ_ADD_REQUEST,
    payload: data,
  };
};

const quizAddRequestFailure = (error) => {
  return {
    type: QUIZ_ADD_REQUEST_FAILURE,
    payload: error,
  };
};

const questionAddRequest = () => {
  return {
    type: ADD_QUESTION_REQUEST,
  };
};

const questionAddRequestSuccess = (data) => {
  return {
    type: ADD_QUESTION_REQUEST_SUCCESS,
    payload: data,
  };
};

const questionAddRequestFailure = (error) => {
  return {
    type: ADD_QUESTION_REQUEST_FAILURE,
    payload: error,
  };
};

const questionDeleteRequest = () => {
  return {
    type: DELETE_QUESTION_REQUEST,
  };
};

const questionDeleteRequestSuccess = (data) => {
  return {
    type: DELETE_QUESTION_REQUEST_SUCCESS,
    payload: data,
  };
};

const questionDeleteRequestFailure = (error) => {
  return {
    type: DELETE_QUESTION_REQUEST_FAILURE,
    payload: error,
  };
};

const quizUpdateRequest = () => {
  return {
    type: QUIZ_UPDATE_REQUEST,
  };
};

const quizUpdateRequestSuccess = (data) => {
  return {
    type: QUIZ_UPDATE_REQUEST_SUCCESS,
    payload: data,
  };
};

const quizUpdateRequestFailure = (error) => {
  return {
    type: QUIZ_UPDATE_REQUEST_FAILURE,
    payload: error,
  };
};

const quizDeleteRequest = () => {
  return {
    type: QUIZ_DELETE_REQUEST,
  };
};

const quizDeleteRequestSuccess = (id) => {
  return {
    type: QUIZ_DELETE_REQUEST_SUCCESS,
    payload: id,
  };
};

const quizDeleteRequestFailure = (error) => {
  return {
    type: QUIZ_DELETE_REQUEST_FAILURE,
    payload: error,
  };
};

const quizRestoreFromArchieveRequest = () => {
  return {
    type: QUIZ_RESTORE_FROM_ARCHIEVE_REQUEST,
  };
};

const quizRestoreFromArchieveRequestSuccess = (id) => {
  return {
    type: QUIZ_RESTORE_FROM_ARCHIEVE_REQUEST_SUCCESS,
    payload: id,
  };
};

const quizRestoreFromArchieveRequestFailure = (error) => {
  return {
    type: QUIZ_RESTORE_FROM_ARCHIEVE_REQUEST_FAILURE,
    payload: error,
  };
};

export const getQuizList = (dispatch) => {
  dispatch(quizListRequest());

  const quizListResponse = quizListHandler();

  if (quizListResponse?.status === StatusCodes.OK) {
    dispatch(quizListRequestSuccess(quizListResponse.data));
  } else {
    dispatch(quizListRequestFailure("No Quiz found"));
  }
};

export const updateQuiz = (dispatch, updatedData) => {
  dispatch(quizUpdateRequest());
  const updateResponse = quizUpdateHandler(updatedData, updatedData.id);
  if (updateResponse?.status === StatusCodes.OK) {
    dispatch(quizUpdateRequestSuccess(updateResponse?.data));
  } else {
    dispatch(quizUpdateRequestFailure("Failed to update quiz"));
  }
};

export const addQuiz = (dispatch, data) => {};

export const deleteQuiz = (dispatch, id) => {
  dispatch(quizDeleteRequest());
  const response = quizDeleteHandler(id);
  if (response.status === StatusCodes.OK) {
    dispatch(quizDeleteRequestSuccess(id));
  } else {
    dispatch(quizDeleteRequestFailure("Failed to Delete quiz"));
  }
};

export const quizRestore = (dispatch, id) => {
  dispatch(quizRestoreFromArchieveRequest());
  const response = quizRestoreHandler(id);

  if (response.status === StatusCodes.OK) {
    dispatch(quizRestoreFromArchieveRequestSuccess(id));
  } else {
    dispatch(quizRestoreFromArchieveRequestFailure("Failed to Restore quiz"));
  }
};

export const addQuestion = (dispatch, quizId, newQuestionData) => {
  dispatch(questionAddRequest());
  const addResponse = questionAddHandler(quizId, newQuestionData);
  console.log(addResponse);

  if (addResponse?.status === StatusCodes.OK) {
    console.log("Success");
    dispatch(questionAddRequestSuccess(addResponse?.data));
  } else {
    console.log("Failure");

    dispatch(questionAddRequestFailure("Failed to create Question"));
  }
};

export const deleteQuestion = (dispatch, quizId, questionId) => {
  dispatch(questionDeleteRequest());
  const deleteResponse = deleteQuestionHandler(quizId, questionId);
  console.log({ deleteResponse });
  if (deleteResponse?.status === StatusCodes.OK) {
    console.log("Success");
    dispatch(questionDeleteRequestSuccess(deleteResponse.data));
  } else {
    dispatch(questionDeleteRequestFailure("Failed to delete question"));
  }
};

export const removeErrorMessage = (dispatch) => {
  dispatch({ type: REMOVE_QUIZ_ERROR_MESSAGE });
};

export const removeQuizUpdateMessage = (dispatch) => {
  dispatch({ type: REMOVE_QUIZ_UPDATE_MESAGE });
};

export const removeAddMessage = (dispatch) => {
  dispatch({ type: REMOVE_ADD_MESSAGE });
};

export const removeDeleteMessage = (dispatch) => {
  dispatch({ type: REMOVE_DELTE_MESSAGE });
};
