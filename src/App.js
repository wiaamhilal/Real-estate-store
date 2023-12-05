import {Route, Routes} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Products from "./components/Products";
import ParamsComp from "./components/ParamsComp";
import {useState} from "react";

function App() {
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
      </Routes>
    </div>
  );
}

export default App;