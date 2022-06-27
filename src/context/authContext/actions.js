import { StatusCodes } from "http-status-codes";
import { userAuthentication } from "../../utils/handlers";
import {
  removeLocalStorageIsAuthenticated,
  removeLocalStorageUser,
  setLocalStorageIsAuthenticated,
  setLocalStorageUser,
} from "../../utils/localStorageHandlers";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAILURE,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT,
  REMOVE_LOGIN_ERROR_MESSAGE,
} from "./actionTypes";

const loginRequest = () => {
  return { type: LOGIN_REQUEST };
};

const loginRequestSuccess = (user, isAuthenticated) => {
  return { type: LOGIN_REQUEST_SUCCESS, payload: { user, isAuthenticated } };
};

const loginRequestFailure = (error) => {
  return { type: LOGIN_REQUEST_FAILURE, payload: error };
};

const logout = () => {
  return { type: LOGOUT };
};

export const loginUser = (dispatch, data) => {
  try {
    dispatch(loginRequest());
    const loginResponse = userAuthentication(data);

    if (loginResponse?.status === StatusCodes.OK) {
      setLocalStorageUser(loginResponse?.data);
      setLocalStorageIsAuthenticated(true);
      dispatch(loginRequestSuccess(loginResponse?.data, true));
      return loginResponse?.data;
    }

    dispatch(loginRequestFailure(loginResponse?.error));
    return;
  } catch (error) {
    dispatch(loginRequestFailure(error));
  }
};

export const logoutUser = (dispatch) => {
  dispatch(logout());
  removeLocalStorageUser();
  removeLocalStorageIsAuthenticated();
};


export const removeLoginErrorMessage = (dispatch)=>{
    dispatch({type: REMOVE_LOGIN_ERROR_MESSAGE});
}