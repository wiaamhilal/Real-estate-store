import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import AddProjSlice from "./AddProjSlice";

const store = configureStore({
  reducer: {
    UserSlice: UserSlice,
    AddProjSlice: AddProjSlice,
  },
});

export default store;
