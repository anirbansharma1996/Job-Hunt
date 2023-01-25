import {
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_LIST_FAILURE,
} from "./list.type";

let inititalState = {
  loading: false,
  error: null,
  list: [],
};

export const jobListReducer = (state = inititalState, action) => {
  switch (action.type) {
    case JOB_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case JOB_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case JOB_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
