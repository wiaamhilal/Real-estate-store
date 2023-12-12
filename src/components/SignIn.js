import React, {useState} from "react";
import styled from "styled-components";
import {auth, provider} from "../firebase";
import {signInWithPopup} from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../redux/UserSlice";
import {useNavigate} from "react-router-dom";
const SignIn = () => {
  const {user} = useSelector((state) => state.UserSlice);
  const dispatch = useDispatch();
  const navicate = useNavigate();
  const GoogleBotton = () => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(setUser(payload.user));
      })
      .catch((Error) => {
        alert(Error.message);
      });
  };
  return (
    <Holder>
      {user && navicate("/", {replace: true})}
      <BodyPage>
        <LeftSide>
          <h1>Wellcome to your professional comunety</h1>
          <Botton onClick={GoogleBotton} className="shadow border-0">
            <img
              src="https://static.vecteezy.com/system/resources/previews/010/353/285/original/colourful-google-logo-on-white-background-free-vector.jpg"
              alt=""
              className="rounded-circle"
            />{" "}
            Sign in with Google
          </Botton>
        </LeftSide>
        <img
          src="https://images.pexels.com/photos/1046639/pexels-photo-1046639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="rounded-pill shadow"
        />
      </BodyPage>
    </Holder>
  );
};
const Holder = styled.div`
  background-color: #eee;
  // background-image: linear-gradient(to top, #444 50%, white);
  background-image: url("https://images.unsplash.com/photo-1615799998603-7c6270a45196?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: contain;
  overflow: hidden;
`;
const BodyPage = styled.div`
  display: flex;
  justify-content: space-around;
  min-height: 100vh;
  align-items: center;
  padding: 20px;
  & > img {
    max-height: 500px;
    max-width: 100%;
  }
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;
const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 26px;
  width: 549px;
  color: #0a66c2;
  line-height: 1.5;
  & h1 {
    font-weight: normal;
  }
  @media (max-width: 767px) {
    & h1 {
       font-size:20px;
       max-width:300px;
       text-align:center;
       line-height:2;
  }
`;
const Botton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 17px;
  border-width: 1px;
  border-color: #ccc;
  width: 60%;
  margin-top: 25px;
  margin-bottom: 25px;
  color: #444;
  font-size: 18px;
  cursor: pointer;
  & img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  @media (max-width: 767px) {
    margin-bottom: 15px;
  }
`;
export default SignIn;
