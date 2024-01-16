import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";
export const  socket = io.connect("http://localhost:4000");


const initialState = {
  userName: "",
  send_message: [],
  revieve_message: [],
  loading: false,
  userDetails: JSON.parse(localStorage.getItem('users')) || [],
  messageResponse: JSON.parse(localStorage.getItem('responseMessage')) || [],
};


export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      console.log("payload", payload);
      state.userDetails = payload;
    },
    addMessageResponce:(state,action)=>{
      state.messageResponse = action.payload
    }
    
  },
});

export const { addUser,addMessageResponce } = userSlice.actions;
export const getAllUsers = (state) => state.userData.userDetails;
export const getAllResponseMessage =(state)=>state.userData.messageResponse


export default userSlice.reducer;
