import {
  getLocalStorageIsAuthenticated,
  getLocalStorageUser,
} from "../../utils/localStorageHandlers";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAILURE,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT,
  REMOVE_LOGIN_ERROR_MESSAGE,
} from "./actionTypes";

let authUser = getLocalStorageUser();
let isAuthenticated = getLocalStorageIsAuthenticated();

export const initialState = {
  authUser: authUser,
  isAuthenticated: isAuthenticated,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        authUser: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        loading: false,
      };
    case LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case REMOVE_LOGIN_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: null,
      };
    case LOGOUT:
      return {
        ...state,
        authUser: "",
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
