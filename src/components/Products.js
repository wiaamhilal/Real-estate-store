import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import products1 from "../JsonFiles/Products-1.json";
import products2 from "../JsonFiles/Products-2.json";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";

const Products = () => {
  const [serch, setSerch] = useState("");
  const [livingRooms, setlivingRooms] = useState([]);
  useEffect(() => {
    const getRef = collection(db, "products");
    // const orderedRef = query(getRef, orderBy("actor.date", "desc"));
    onSnapshot(getRef, (snapshot) => {
      setlivingRooms(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  return (
    <Holder>
      <Main className="container">
        <Search>
          <form className="shadow">
            <input type="serch" onChange={(e) => setSerch(e.target.value)} />
            <button>
              <img
                src="https://www.iconpacks.net/icons/2/free-search-icon-2907-thumb.png"
                alt=""
              />
            </button>
          </form>
        </Search>
        <Cards className="">
          {!serch && (
            <h2
              className="text-secondary mt-4 main-name"
              style={{marginBottom: "-10px", transform: "translateX(-20px)"}}
            >
              Living Rooms:
            </h2>
          )}
          {livingRooms
            .filter((item) =>
              serch === "" ? item : item.title.toLowerCase().includes(serch)
            )
            .map((item) => (
              <Link
                to={`/product/${item.id}`}
                class="card mt-4 border-0 row-md-6 my-shadw my-card"
                style={{
                  width: "18rem",
                  textDecoration: "none",
                  // maxHeight: "389px",
                }}
              >
                <img src={item["img-1"]} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{item.title}</h5>
                  <p class="card-text">{item.description.substring(0, 120)}</p>
                  <Link to="/home" class="btn btn-primary">
                    More Info
                  </Link>
                </div>
              </Link>
            ))}
          {!serch && (
            <h2
              className="text-secondary mt-4"
              style={{
                marginBottom: "-10px",
                transform: "translateX(-20px)",
                width: "100%",
              }}
            >
              Kitchens :
            </h2>
          )}
          {products2
            .filter((item) =>
              serch === "" ? item : item.title.toLowerCase().includes(serch)
            )
            .map((item) => (
              <Link
                to={`/product/${item.id}`}
                class="card mt-4 border-0 row-md-6 my-shadw my-card"
                style={{
                  width: "18rem",
                  textDecoration: "none",
                }}
              >
                <img src={item["img-1"]} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{item.title}</h5>
                  <p class="card-text">{item.description}</p>
                  <Link to="/home" class="btn btn-primary">
                    More Info
                  </Link>
                </div>
              </Link>
            ))}
        </Cards>
      </Main>
    </Holder>
  );
};
const Holder = styled.div`
  background-color: #eee;
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
const Search = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 25px;
  }
  & input {
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 6px 0 0 6px;
    outline: none;
    background-image: linear-gradient(90deg, black 17%, #737373);
    opacity: 0.4;
    color: white;
  }
  & button {
    border: 1px solid #ccc;
    padding: -2px;
    border-left: none;
    padding-top: 2.9px;
    border-radius: 0 6px 6px 0;
  }
  & form {
  }
`;
const Cards = styled.div`
  & .my-card {
    & img {
      max-height: 199.28px;
      object-fit: cover;
    }
  }
  & .my-shadw {
    box-shadow: 12px 12px 10px 1px #808080ad;
  }
  @media (min-width: 767px) {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
  & .main-name {
    @media (min-width: 767px) {
      position: absolute;
      z-index: 100;
      left: 70px;
      top: 50px;
    }
  }
`;

export default Products;
