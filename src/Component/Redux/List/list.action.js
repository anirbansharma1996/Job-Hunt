import {
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_LIST_FAILURE,
} from "./list.type";
import axios from "axios";

export const jobListAction = () => async (dispatch) => {
  dispatch({ type: JOB_LIST_REQUEST });
  try {
    const response = await axios.get(
      "https://mock-data-mongodb.onrender.com/admin/getjobs"
    );
    dispatch({
      type: JOB_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: JOB_LIST_FAILURE,
      error: error.message,
    });
  }
};
