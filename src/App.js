import {Route, Routes} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Products from "./components/Products";
import ParamsComp from "./components/ParamsComp";
import {useEffect, useState} from "react";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import SignIn from "./components/SignIn";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "./firebase";
import {setUser} from "./redux/UserSlice";
import Basket from "./components/Basket";
import CheckOut from "./components/CheckOut";
import Kitchens from "./components/Kitchens";
import AddProduct from "./components/AddProduct";
import Messages from "./components/Messages";
import Pieces from "./components/Pieces";
import styled from "styled-components";
export const GetBasketTotal = (basket) => {
  return basket.reduce((total, current) => {
    total += current.price;
    return total;
  }, 0);
};
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      }
    });
  }, []);
  const {loading} = useSelector((state) => state.UserSlice);
  return (
    <div className="App position-relative">
      {loading ? (
        <Holder>
          <Main>loading...</Main>
        </Holder>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header /> <Home />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <Header /> <Products />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={
              <>
                <Header /> <ParamsComp />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Header /> <About />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Header /> <ContactUs />
              </>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/basket"
            element={
              <>
                <Header /> <Basket />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header /> <CheckOut />
              </>
            }
          />
          <Route
            path="/addproduct"
            element={
              <>
                <Header /> <AddProduct />
              </>
            }
          />
          <Route
            path="/messages"
            element={
              <>
                <Header /> <Messages />
              </>
            }
          />
          <Route
            path="/pieces/:id"
            element={
              <>
                <Header /> <Pieces />
              </>
            }
          />
        </Routes>
      )}
    </div>
  );
}
const Holder = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #00000052;
  min-height: 100vh;
`;
const Main = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export default App;
