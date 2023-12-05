import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <Holder>
      <Main className="container">
        <Link className="logo" to="/">
          <img
            src="https://st2.depositphotos.com/2723391/10875/v/450/depositphotos_108752618-stock-illustration-capital-letter-n.jpg"
            alt=""
          />
        </Link>
        <Navbar>
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/products">
            Products
          </Link>
          <Link className="link" to="/about">
            About
          </Link>
          <Link className="link" to="/contect">
            Contect us
          </Link>
        </Navbar>
      </Main>
    </Holder>
  );
};
const Holder = styled.div`
  background-image: linear-gradient(90deg, black 17%, #737373);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0.8;
`;
const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  & .logo {
    & img {
      width: 62px;
    }
  }
`;
const Navbar = styled.div`
  & .link {
    margin-left: 20px;
    font-size: 14px;
    color: #eee;
    text-decoration: none;
    font-weight: bold;
    @media (max-width: 767px) {
      margin-left: 10px;
      font-size: 14px;
    }
  }
`;
export default Header;
