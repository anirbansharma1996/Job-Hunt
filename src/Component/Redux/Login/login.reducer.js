import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./login.type";

const initialState = {
  Loading: false,
  Authenticated: false,
  token: localStorage.getItem("mock12") || false
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        Loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        Loading: false,
        Authenticated: true,
        token: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        Loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
