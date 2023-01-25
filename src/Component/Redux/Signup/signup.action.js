import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./signup.type";
import axios from "axios";

export const SignupAction = (user) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });
    axios
      .post("https://mock-data-mongodb.onrender.com/signup", user)
      .then((response) => {
        //console.log(response.data.id)
        dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: SIGNUP_FAILURE, payload: error });
      });
  };
};
