import {
    legacy_createStore,
    combineReducers,
    applyMiddleware,
    compose,
  } from "redux";
  import thunk from "redux-thunk";
  import signupReducer from "./Signup/signup.reducer";
  import loginReducer from "./Login/login.reducer";
  import {jobReducer} from "./Job/job.reducer"
  import {jobListReducer} from "./List/list.reducer"
  let rootReducer = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    job:jobReducer,
    list:jobListReducer
  });
  
  let createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  export const Store = legacy_createStore(
    rootReducer,
    createComposer(applyMiddleware(thunk))
  );
  