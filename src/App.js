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
import {useDispatch} from "react-redux";
import {auth} from "./firebase";
import {setUser} from "./redux/UserSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      }
    });
  }, []);
  return (
    <div className="App position-relative">
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
      </Routes>
    </div>
  );
}

export default App;
