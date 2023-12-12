import {signOut} from "firebase/auth";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {setUser} from "../redux/UserSlice";
import {auth} from "../firebase";

const Home = () => {
  const {user} = useSelector((state) => state.UserSlice);
  console.log(user);
  const dispatch = useDispatch();
  const navicate = useNavigate();
  const SignOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        alert(error.massage);
      });
  };
  return (
    <Main>
      <p>
        Wellcome {user && <span>{user.displayName}</span>} to our page go ahead
        and see our products
      </p>
      <div className="d-flex algin-items-center justify-content-center">
        <Link to="/products" className="btn fw-bold the-btn mt-2">
          Go Ahead
        </Link>
      </div>
      {user ? (
        <Acount>
          <span>{user?.email}</span>
          <button onClick={SignOut} className="btn text-white">
            Sign out
          </button>
        </Acount>
      ) : (
        <Acount>
          <span>Sign in to save your data</span>
          <button
            onClick={() => navicate("/signin")}
            className="btn text-white"
          >
            Sign in
          </button>
        </Acount>
      )}
    </Main>
  );
};
const Main = styled.div`
  padding: 0 10px;
  background-image: url("https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=600");
  background-size: cover;
  height: 100vh;
  @media (min-width: 767px) {
    background-image: url("https://images.pexels.com/photos/1006107/pexels-photo-1006107.jpeg");
  }
  & p {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    line-height: 2;
    color: white;
    padding-top: 200px;
    @media (min-width: 767px) {
      font-size: 28px;
    }
  }
  & .the-btn {
    background-image: linear-gradient(90deg, black 17%, #737373);
    border: none;
    color: white;
    opacity: 0.8;
  }
`;
const Acount = styled.div`
  position: absolute;
  bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  width: 95%;
  background-image: linear-gradient(90deg, black 17%, #737373);
  opacity: 0.8;
  border-radius: 6px;
  padding: 2px 0 2px 5px;
`;
export default Home;
