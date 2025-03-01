import { createSlice } from "@reduxjs/toolkit";

const getToken = ()=>{
  const token = localStorage.getItem("token");
  try 
  {
    return token ? token : null;
  }
  catch(error)
  {
    console.log("error is parsing or getting token from local storage",error.message);
    return null;
  }
}


const initialState = {
    token : getToken(),
    role : null,
    email : null,
}


const authSlice = createSlice({
   name : "auth",
   initialState : initialState,
   reducers : {
    setToken(state,value){
        state.token = value.payload;
    },
    setRole(state,value){
      state.role = value.payload;
    },
    setEmail(state,value){
      state.email = value.payload;
    }
   }
})

export const {setToken,setRole,setEmail} = authSlice.actions;
export const authReducer = authSlice.reducer;