import { AUTH_USER } from "./types";

// redux-thunk allows me to take control over dispatch process
// by using redux-thunk we can return either object or function from action creators
// whereas redux-promise
export const signup = ({ email, password }) => {
  return function (dispatch) {
    dispatch({ type: AUTH_USER })
  }
};