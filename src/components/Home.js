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
      <MySlider>
        <div
          id="carouselExampleCaptions"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                style={{opacity: "0.7"}}
                src="https://images.pexels.com/photos/3720778/pexels-photo-3720778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                class="d-block w-100 rounded"
                alt="..."
              />
              <div class="carousel-caption d-none">
                <h5>First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <img
                style={{opacity: "0.7"}}
                src="https://images.pexels.com/photos/5824519/pexels-photo-5824519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                class="d-block w-100 rounded"
                alt="..."
              />
              <div class="carousel-caption d-none">
                <h5>Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <img
                style={{opacity: "0.7"}}
                src="https://images.pexels.com/photos/5824908/pexels-photo-5824908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                class="d-block w-100 rounded"
                alt="..."
              />
              <div class="carousel-caption d-none">
                <h5>Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
                </p>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </MySlider>
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
const MySlider = styled.div`
  transform: translate(0%, 60%);
  max-width: 100%;
  @media (min-width: 767px) {
    transform: translate(-50%, -50%);
    left: 50%;
    max-width: 600px;
    top: 39%;
    position: absolute;
  }
`;
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
    padding-top: 150px;
    @media (min-width: 767px) {
      font-size: 28px;
      padding-top: 560px;
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
  bottom: 97px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  width: 95%;
  background-image: linear-gradient(90deg, black 17%, #737373);
  opacity: 0.8;
  border-radius: 6px;
  padding: 2px 0 2px 5px;
  @media (min-width: 767px) {
    bottom: 10px;
  }
`;
export default Home;
