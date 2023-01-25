import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './signup.type';

const initialState = {
  loading: false,
  user: {},
  error: null,
};

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        user: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
