import React from "react";
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";

const Pieces = () => {
  const {projucts} = useSelector((state) => state.AddProjSlice);
  const params = useParams();
  console.log(params);
  return (
    <Holder className="">
      <Main className="row m-auto container gap-3">
        {projucts.map(
          (item) =>
            item.type === params.id && (
              <Link
                to={`/product/${item.id}`}
                class="card my-shadw border-0 col-12 col-sm-4 col-md-3 m-auto mb-3"
                style={{padding: "0", textDecoration: "none"}}
              >
                <img src={item.firstImg} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h6 class="card-title fw-bold">{item.title}</h6>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </Link>
            )
        )}
      </Main>
    </Holder>
  );
};

export default Pieces;
const Holder = styled.div`
  // background-color: #eee;
  background-image: url("https://images.unsplash.com/photo-1615799998603-7c6270a45196?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: contain !important;
`;
const Main = styled.div`
  padding-top: 80px;
`;
