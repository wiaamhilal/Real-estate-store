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
import CheckOut from "./components/LocationPage";
import Kitchens from "./components/Kitchens";
import AddProduct from "./components/AddProduct";
import Messages from "./components/Messages";
import Pieces from "./components/Pieces";
import styled from "styled-components";
import loadingImg from "./img/loader.svg";
import LocationPage from "./components/LocationPage";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
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
  const {loading} = useSelector((state) => state.AddProjSlice);
  return (
    <div className="App position-relative">
      {loading ? (
        <Holder>
          <Main>
            <img style={{width: "150px"}} src={loadingImg} alt="" />
          </Main>
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
            path="/location"
            element={
              <>
                <Header /> <LocationPage />
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
          <Route
            path="payment"
            element={
              <>
                <Header /> <Payment />
              </>
            }
          />
          <Route
            path="orders"
            element={
              <>
                <Header /> <Orders />
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
  background-color: rgba(0, 0, 0, 0.788);
  min-height: 100vh;
`;
const Main = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export default App;
