import {createSlice} from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    basket: [],
    location: [],
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
    clearBasket: (state, action) => {
      state.basket = [];
    },
    setlocation: (state, action) => {
      state.location = action.payload;
    },
  },
});
export const {setUser, addItem, deleteItem, clearBasket, setlocation} =
  UserSlice.actions;
export default UserSlice.reducer;
