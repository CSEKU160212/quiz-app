import {
  ADD_QUESTION_REQUEST,
  ADD_QUESTION_REQUEST_FAILURE,
  ADD_QUESTION_REQUEST_SUCCESS,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_REQUEST_FAILURE,
  DELETE_QUESTION_REQUEST_SUCCESS,
  QUIZ_DELETE_REQUEST,
  QUIZ_DELETE_REQUEST_FAILURE,
  QUIZ_DELETE_REQUEST_SUCCESS,
  QUIZ_LIST_REQUEST,
  QUIZ_LIST_REQUEST_FAILURE,
  QUIZ_LIST_REQUEST_SUCCESS,
  QUIZ_RESTORE_FROM_ARCHIEVE_REQUEST,
  QUIZ_RESTORE_FROM_ARCHIEVE_REQUEST_FAILURE,
  QUIZ_RESTORE_FROM_ARCHIEVE_REQUEST_SUCCESS,
  QUIZ_UPDATE_REQUEST,
  QUIZ_UPDATE_REQUEST_FAILURE,
  QUIZ_UPDATE_REQUEST_SUCCESS,
  REMOVE_ADD_MESSAGE,
  REMOVE_DELTE_MESSAGE,
  REMOVE_QUIZ_UPDATE_MESAGE,
} from "./actionsTypes";

export const initialState = {
  data: [],
  questions: [],
  loading: false,
  updateMessage: null,
  addMessage: null,
  deleteMessage: null,
  errorMessage: null,
};

export const QuizReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUIZ_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        data: [],
        errorMessage: null,
      };

    case QUIZ_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMessage: null,
      };

    case QUIZ_LIST_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        errorMessage: action.payload,
      };

    case QUIZ_DELETE_REQUEST:
      return {
        ...state,
        errorMessage: null,
      };

    case QUIZ_DELETE_REQUEST_SUCCESS:
      const quizList = [...state.data];
      const modifiedQuizList = quizList.map((quiz) => {
        if (Number(quiz.id) === Number(action.payload)) {
          quiz.isDeleted = true;
        }
        return quiz;
      });

      return {
        ...state,
        data: [...modifiedQuizList],
        errorMessage: null,
      };

    case QUIZ_DELETE_REQUEST_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case QUIZ_RESTORE_FROM_ARCHIEVE_REQUEST:
      return {
        ...state,
        errorMessage: null,
      };

    case QUIZ_RESTORE_FROM_ARCHIEVE_REQUEST_SUCCESS:
      const quizzes = [...state.data];
      const modifiedQuizzesList = quizzes.map((quiz) => {
        if (Number(quiz.id) === Number(action.payload)) {
          quiz.isDeleted = false;
        }
        return quiz;
      });

      return {
        ...state,
        data: [...modifiedQuizzesList],
        errorMessage: null,
      };

    case QUIZ_UPDATE_REQUEST:
      return {
        ...state,
        errorsMessage: null,
        updateMessage:null,
      };
    case QUIZ_UPDATE_REQUEST_FAILURE:
      return {
        ...state,
        errorsMessage: action.payload,
        updateMessage: null,
      };
    case QUIZ_UPDATE_REQUEST_SUCCESS:
      console.log("Updated")
      const currentQuizList = [...state.data];
      const quizIndex = currentQuizList.findIndex(
        (item) => Number(item.id) === Number(action.payload)
      );
      if (quizIndex !== -1) {
        currentQuizList[quizIndex] = action.payload;
      }

      return {
        ...state,
        data: currentQuizList,
        updateMessage: "Quiz Updated Successfully",
        errorMessage: null
      };

    case QUIZ_RESTORE_FROM_ARCHIEVE_REQUEST_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        updateMessage: null
      };

    case REMOVE_QUIZ_UPDATE_MESAGE:
      return {
        ...state,
        updateMessage: null
      }

    case ADD_QUESTION_REQUEST:
      return {
        ...state, 
        errorMessage: null,
        addMessage: null
      }

    case ADD_QUESTION_REQUEST_SUCCESS:
      return {
        ...state,
        addMessage: "Question Added Successfully",
        data: action.payload,
      };

    case ADD_QUESTION_REQUEST_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        addMessage: null
      }

    case REMOVE_ADD_MESSAGE:
      return {
        ...state,
        addMessage: null
      }

    case DELETE_QUESTION_REQUEST:
      return {
        ...state,
        errorMessage: null,
        deleteMessage: null
      }
    case DELETE_QUESTION_REQUEST_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        deleteMessage: null,
      };
    case DELETE_QUESTION_REQUEST_SUCCESS:
      console.log("Action: ", action.payload);
      return {
        ...state,
        data: action.payload,
        deleteMessage: "Question Deleted Successfully"
      }
    
    case REMOVE_DELTE_MESSAGE:
      return {
        ...state,
        deleteMessage: null
      }

    default:
      return state;
  }
};
