import axios from 'axios';
import { AUTH_USER , AUTH_ERROR} from "./types";

// redux-thunk allows me to take control over dispatch process
// by using redux-thunk we can return either object or function from action creators
// it is possible to make as many requests as needed and only when the data is returned,
// when there is validaiton completed, there is an option to dispatch action which will rerun reducers and update the state of application
// whereas redux-promise returns one action which has to have a promise on payload property
export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await
        axios.post('http://localhost:3090/signup', formProps);

        dispatch({type: AUTH_USER, payload: response.data.token});
        localStorage.setItem('token', response.data.token);
        callback();
    }  catch (e) {
        dispatch({type: AUTH_ERROR, payload: "Email in use"});
    }
}

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/signin', formProps);

        dispatch({type: AUTH_USER, payload: response.data.token});
        localStorage.setItem('token', response.data.token);
        callback();
    }  catch (e) {
        dispatch({type: AUTH_ERROR, payload: "Invalid login credentials"});
    }
}

export const signout = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    }
}