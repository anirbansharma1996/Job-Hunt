import {
  JOB_POST_REQUEST,
  JOB_POST_SUCCESS,
  JOB_POST_FAILURE,
  JOB_EDIT_REQUEST,
  JOB_EDIT_SUCCESS,
  JOB_EDIT_FAILURE,
  JOB_DELETE_REQUEST,
  JOB_DELETE_SUCCESS,
  JOB_DELETE_FAILURE,
} from "./job.type";

let inititalState = {
  loading: false,
  error: null,
  job: [],
};

export const jobReducer = (state = inititalState, action) => {
  switch (action.type) {
    case JOB_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case JOB_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        job: action.payload,
      };
    case JOB_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case JOB_EDIT_REQUEST:
    case JOB_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case JOB_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        job: action.payload,
      };
    case JOB_EDIT_FAILURE:
    case JOB_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case JOB_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        job: null,
      };
    default:
      return state;
  }
};
