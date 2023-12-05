import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <Main>
      <p>wellcome to our page go ahead and see our products</p>
      <div className="d-flex algin-items-center justify-content-center">
        <Link to="/products" className="btn fw-bold the-btn mt-2">
          Go Ahead
        </Link>
      </div>
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
export default Home;
