import axios from 'axios';
import { AUTH_USER } from "./types";

// redux-thunk allows me to take control over dispatch process
// by using redux-thunk we can return either object or function from action creators
// it is possible to make as many requests as needed and only when the data is returned,
// when there is validaiton completed, there is an option to dispatch action which will rerun reducers and update the state of application
// whereas redux-promise returns one action which has to have a promise on payload property
export const signup = (formProps) => dispatch => {
  axios.post('http://localhost:3090/signup', formProps);
};
