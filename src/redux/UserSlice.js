import {createSlice} from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    basket: [],
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    addItem: (state, action) => {
      state.basket.push(action.payload);
    },
    deleteItem: (state, action) => {
      let newbasket = state.basket;
      const index = state.basket.findIndex(
        (item) => item.id === action.payload
      );
      if (index >= 0) {
        newbasket.splice(index, 1);
      }
      state.basket = newbasket;
    },
    setloading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const {setUser, addItem, deleteItem, setloading} = UserSlice.actions;
export default UserSlice.reducer;
