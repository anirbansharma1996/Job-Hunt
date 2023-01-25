import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./login.type";
import axios from "axios";
var currentTime = new Date();
var time = currentTime.toLocaleTimeString();

export const loginAction = (user) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    axios
      .post("https://mock-data-mongodb.onrender.com/login", user)
      .then((response) => {
        localStorage.setItem("mock12", response.data.token);
        localStorage.setItem("time", time);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: localStorage.getItem("mock12"),
        });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_FAILURE, payload: error });
      });
  };
};
