import React from "react";
import {useParams} from "react-router-dom";
import products1 from "../JsonFiles/Products-1.json";
import products2 from "../JsonFiles/Products-2.json";
import styled from "styled-components";
import normalLike from "../img/like-svgrepo-com (2).svg";
import normalDislike from "../img/dislike-svgrepo-com (1).svg";
const ParamsComp = () => {
  const params = useParams();

  return (
    <div className="bg-light">
      {[...products1, ...products2].map(
        (item) =>
          item.id === params.id && (
            <Main className="container">
              <Head>
                {" "}
                {/* <img src={item["img-1"]} alt="" /> */}
                <Photo>
                  <div
                    // style={{width: "500px", height: "500px"}}
                    className="photo-holder"
                    id="carouselExampleIndicators"
                    class="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div class="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        class="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                      ></button>
                    </div>
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img
                          src={item["img-1"]}
                          class="d-block slide-pic w-100"
                          alt="..."
                        />
                      </div>
                      <div class="carousel-item">
                        <img
                          src={item["img-2"]}
                          class="d-block slide-pic w-100"
                          alt="..."
                        />
                      </div>
                      <div class="carousel-item">
                        <img
                          src={item["img-3"]}
                          class="d-block slide-pic w-100"
                          alt="..."
                        />
                      </div>
                    </div>
                    <button
                      class="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button
                      class="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </div>
                </Photo>
                <div>
                  <h2 className=" text-center d-block text-sm-start">
                    Description
                  </h2>
                  <span className="text-color">{item.fullDisk}</span>
                </div>
              </Head>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <h4 className="mt-3">The price: {item.price} dhr</h4>
                <button className="btn btn-sm btn-primary rounded-pill">
                  Add To Card
                </button>
              </div>
              <Like>
                <span
                  className="d-flex justify-content-center"
                  style={{flexDirection: "column"}}
                >
                  <img src={normalLike} alt="" />{" "}
                  <span className="fw-bold text-secondary m-auto mt-1">56</span>
                </span>

                <span
                  className="d-flex justify-content-center"
                  style={{flexDirection: "column"}}
                >
                  <img src={normalDislike} alt="" />
                  <span className="fw-bold text-secondary m-auto">56</span>
                </span>
              </Like>
              <Details>
                <h4 className="d-block mt-3">Room Delivery Services :</h4>
                <p className=" text-color" style={{lineHeight: "1.7"}}>
                  At NPMC, we pride ourselves on providing unparalleled
                  convenience with our top-notch room delivery services. Whether
                  you're moving into a new home, renovating your existing space,
                  or managing a hospitality business, our dedicated team ensures
                  a seamless and stress-free experience.
                </p>
                <h6>Efficient Logistics:</h6>
                <p
                  style={{fontSize: "14px", lineHeight: "1.7"}}
                  className="text-color"
                >
                  Our experienced logistics team manages the entire delivery
                  process, ensuring that rooms, furniture, and essentials reach
                  your destination in a timely and efficient manner. We
                  understand the importance of punctuality, and our logistics
                  system is optimized for accuracy and speed.
                </p>
                <h6></h6>
                <p
                  style={{fontSize: "14px", lineHeight: "1.7"}}
                  className="text-color"
                ></p>
                <h6>Careful Handling:</h6>
                <p
                  style={{fontSize: "14px", lineHeight: "1.7"}}
                  className="text-color"
                >
                  Every room and its contents are handled with the utmost care
                  by our trained professionals. From delicate furnishings to
                  bulky items, we employ best practices to ensure that your
                  belongings arrive in pristine condition.
                </p>
                <h6>Customizable Packages:</h6>
                <p
                  style={{fontSize: "14px", lineHeight: "1.7"}}
                  className="text-color"
                >
                  Tailor our services to meet your specific needs. Whether you
                  require a single room's furnishings or a complete set for an
                  entire home or hotel, we offer customizable packages to
                  accommodate various requirements.
                </p>
                <h6>Real-time Tracking:</h6>
                <p
                  style={{fontSize: "14px", lineHeight: "1.7"}}
                  className="text-color"
                >
                  Stay informed throughout the delivery process with our
                  real-time tracking system. You can monitor the progress of
                  your shipment, receive updates, and plan accordingly.
                </p>
                <h6>Professional Assembly:</h6>
                <p
                  style={{fontSize: "14px", lineHeight: "1.7"}}
                  className="text-color"
                >
                  Our skilled team goes beyond delivery – we also offer
                  professional assembly services. Rest easy knowing that your
                  furniture will be expertly assembled and arranged according to
                  your specifications.
                </p>
                <h6>Dedicated Customer Support:</h6>
                <p
                  style={{fontSize: "14px", lineHeight: "1.7"}}
                  className="text-color"
                >
                  Have questions or concerns? Our friendly customer support team
                  is available to assist you at every step. We prioritize clear
                  communication and aim to address your queries promptly.
                </p>
              </Details>
              <Comments>
                <form>
                  {" "}
                  <input type="text" placeholder="Leave a comment" />
                  <button>Submit</button>
                </form>
              </Comments>
            </Main>
          )
      )}
    </div>
  );
};
const Main = styled.div`
  padding-top: 80px;
`;
const Head = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
  & .slide-pic {
    border-radius: 10px;
    width: 100%;
    height: 300px;
    @media (min-width: 767px) {
      width: 500px !important;
      height: 400px;
    }
  }
  & span {
    line-height: 1.7;
  }
`;
const Photo = styled.div``;
const Like = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;

  & img {
    width: 40px;
  }
`;
const Comments = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  margin-bottom: 20px;
  border-top: 1px solid #ccc;
  & form {
    display: flex;
    justify-content: center;
  }
  & input {
    border: 1px solid #ccc;
    border-right: none;
    background-color: white;
    // border-radius: 6px 0 0 6px;
    border-radius: 6px;
    padding: 3px;
    outline: none;
  }
  & button {
    // border-radius: 0 6px 6px 0;
    border-radius: 6px;
    padding: 3px;
    border: 1px solid #ccc;
    border-left: none;
  }
`;
const Details = styled.div``;
export default ParamsComp;
