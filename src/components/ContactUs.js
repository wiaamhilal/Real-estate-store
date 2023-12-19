import React from "react";
import styled from "styled-components";
const ContactUs = () => {
  return (
    <Holder>
      <Main className="container">
        {" "}
        <h1 className="fw-bold m-auto">this page is not ready</h1>
      </Main>
    </Holder>
  );
};
const Holder = styled.div`
  background-color: #eee;
  // background-image: linear-gradient(to top, #444 50%, white);
  background-image: url("https://images.unsplash.com/photo-1615799998603-7c6270a45196?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: contain;
`;
const Main = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ContactUs;
