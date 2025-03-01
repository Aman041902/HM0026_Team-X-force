import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authslice";

const rootreducer = combineReducers({
  auth : authReducer
})

export default rootreducer;