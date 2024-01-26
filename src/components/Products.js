import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import products1 from "../JsonFiles/Products-1.json";
import products2 from "../JsonFiles/Products-2.json";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";
import LivingRooms from "./LivingRooms";
import Kitchens from "./Kitchens";
import OutDoor from "./OutDoor";
import {useSelector} from "react-redux";

const Products = () => {
  const {user} = useSelector((state) => state.UserSlice);
  const [serch, setSerch] = useState("");
  const [Rooms, setRooms] = useState([]);
  console.log(user);
  useEffect(() => {
    const getRef = collection(db, "products");
    // const orderedRef = query(getRef, orderBy("actor.date", "desc"));
    onSnapshot(getRef, (snapshot) => {
      setRooms(
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
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              class="nav-link active text-dark"
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              Living
            </button>
            <button
              class="nav-link text-dark"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Kitchens
            </button>
            <button
              class="nav-link text-dark"
              id="nav-contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-contact"
              type="button"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="false"
            >
              Outdoor
            </button>
          </div>
        </nav>
        <div>
          <div className="d-flex align-items-center justify-content-center mt-3">
            <Link to="/pieces/chair" className="btn btn-sm btn-secondary me-1">
              Chairs
            </Link>
            <Link to="/pieces/table" className="btn btn-sm btn-secondary me-1">
              Tables
            </Link>
            <Link
              to="/pieces/freezer"
              className="btn btn-sm btn-secondary me-1"
            >
              Freezers
            </Link>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-3">
            <Link to="/pieces/couch" className="btn btn-sm btn-secondary me-1">
              Couches
            </Link>
            <Link
              to="/pieces/wardrobe"
              className="btn btn-sm btn-secondary me-1"
            >
              Wardrobes
            </Link>
            <Link to="/pieces/tree" className="btn btn-sm btn-secondary me-1">
              Christmas Trees
            </Link>
          </div>
        </div>
        <div class="tab-content" id="nav-tabContent">
          <Search className="mt-3">
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
            <div
              style={{gap: "20px"}}
              class="tab-pane fade show active row justify-content-center"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              {/* {!serch && (
                <h2
                  className="text-secondary mt-4 main-name ms-4 "
                  style={{
                    marginBottom: "-10px",
                    transform: "translateX(-20px)",
                  }}
                >
                  Living Rooms:
                </h2>
              )} */}

              {Rooms.filter((item) =>
                serch === "" ? item : item.title.toLowerCase().includes(serch)
              ).map(
                (item) =>
                  item.type == "living rooms" && <LivingRooms {...item} />
              )}
            </div>
          </Cards>

          <div
            class="tab-pane fade row justify-content-center gap-20 kitchen-holder  "
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            {/* <h2
              className="text-secondary mt-4 kitchen-h2"
              style={{
                marginBottom: "-10px",
                transform: "translateX(-20px)",
                width: "100%",
              }}
            >
              Kitchens :
            </h2> */}
            <Kitchen>
              {Rooms.filter((item) =>
                serch === "" ? item : item.title.toLowerCase().includes(serch)
              ).map(
                (item) => item.type == "kitchens" && <Kitchens {...item} />
              )}
            </Kitchen>
          </div>
          <div
            class="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
          >
            <OutDoors style={{width: "80%"}}>
              {Rooms.filter((item) =>
                serch === "" ? item : item.title.toLowerCase().includes(serch)
              ).map((item) => item.type == "outdoor" && <OutDoor {...item} />)}
            </OutDoors>
          </div>
        </div>
        {/* {user?.uid === "7WspWYMa9nVXa0menWf9WEhRxd82" && ( */}
        <Link
          to="/addproduct"
          className="add-product btn btn-success rounded-pill nav-sticky shadow-lg"
        >
          Add A Product
        </Link>
        {/* )} */}
      </Main>
    </Holder>
  );
};
const Holder = styled.div`
  // background-color: #eee;
  background-image: url("https://images.unsplash.com/photo-1615799998603-7c6270a45196?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: contain !important;
`;
const Main = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  & .kitchen-h2 {
    position: absolute;
    top: 50px;
    left: 100px;
  }
  & .kitchen-holder {
  }
  & .add-product {
    position: fixed;
    left: 10px;
    bottom: 10px;
  }
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
    padding: 0;
    & img {
      height: 199.28px;
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
const Kitchen = styled.div`
  position: absolute;
  top: 272px;
  width: fit-content;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  & .gap-20 {
    gap: 20px;
  }
  & .my-card {
    padding: 0;
    & img {
      height: 199.28px;
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
const OutDoors = styled.div`
  position: absolute;
  top: 272px;
  width: fit-content;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  & .gap-20 {
    gap: 20px;
  }
  & .my-card {
    padding: 0;
    & img {
      height: 199.28px;
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
