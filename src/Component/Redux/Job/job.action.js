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
import axios from "axios";

export const jobAction = (jobData) => {
  return async (dispatch) => {
    dispatch({ type: JOB_POST_REQUEST });
    try {
      const response = await axios.post(
        "https://mock-data-mongodb.onrender.com/admin/postjobs",
        jobData
      );
      dispatch({
        type: JOB_POST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: JOB_POST_FAILURE,
        error: error.message,
      });
    }
  };
};

export const editJob = (jobData, jobId) => {
  return async (dispatch) => {
    dispatch({ type: JOB_EDIT_REQUEST });
    try {
      const response = await axios.patch(
        `https://mock-data-mongodb.onrender.com/update/${jobId}`,
        { ctc: jobData }
      );
      dispatch({
        type: JOB_EDIT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: JOB_EDIT_FAILURE,
        error: error.message,
      });
    }
  };
};

export const deleteJob = (jobId) => {
  return async (dispatch) => {
    dispatch({ type: JOB_DELETE_REQUEST });
    try {
      const response = await axios.delete(
        `https://mock-data-mongodb.onrender.com/delete/${jobId}`
      );
      dispatch({
        type: JOB_DELETE_SUCCESS,
        jobId: response.data.id,
      });
    } catch (error) {
      dispatch({
        type: JOB_DELETE_FAILURE,
        error: error.message,
      });
    }
  };
};
