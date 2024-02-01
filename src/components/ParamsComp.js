import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import {collection, doc, onSnapshot, updateDoc} from "firebase/firestore";
import LikeComp from "./LikeComp";
import {db, storage} from "../firebase";
import {useDispatch, useSelector} from "react-redux";
import DisLike from "./DisLike";
import {addItem, setloading} from "../redux/UserSlice";
import {drowProjucts} from "../redux/AddProjSlice";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
const ParamsComp = () => {
  const dispatch = useDispatch();
  // const [allProduts, setallProduts] = useState([]);
  const {user, basket} = useSelector((user) => user.UserSlice);
  const {projucts} = useSelector((state) => state.AddProjSlice);
  const [img, setimg] = useState("");
  const [toggle, settoggle] = useState(false);
  console.log(user);
  console.log(basket);
  useEffect(() => {
    const getRef = collection(db, "products");
    // const orderedRef = query(getRef, orderBy("actor.date", "desc"));
    onSnapshot(getRef, (snapshot) => {
      dispatch(
        drowProjucts(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      );
    });
  }, []);
  const params = useParams();
  const HandleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`its not an image, the file is a ${typeof image}`);
    } else {
      setimg(image);
    }
  };
  const chamgepic1 = (id) => {
    dispatch(setloading(true));
    const collStorage = ref(storage, `images/${img.name}`);
    const uploadStorage = uploadBytesResumable(collStorage, img);
    uploadStorage.on(
      "state_changed",
      (snapshot) => {
        // const progress = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
        // console.log(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadStorage.snapshot.ref).then((downloadURL) => {
          const callref = doc(db, "products", id);
          updateDoc(callref, {
            firstImg: downloadURL,
          });
        });
        dispatch(setloading(false));
      }
    );
    settoggle(false);
    setimg("");
  };

  return (
    <div>
      {projucts.map(
        (item) =>
          item.id === params.id && (
            <div className="bg-light">
              {toggle && (
                <MainToggle>
                  <div className="container-toggle">
                    <input
                      type="file"
                      name="img1"
                      onChange={HandleChange}
                      id="img1"
                      style={{display: "none"}}
                    />
                    <label
                      htmlFor="img1"
                      className="btn btn-secondary w-100 mb-3 label-picture1"
                    >
                      Add A New picture
                    </label>
                    <div>
                      {img ? (
                        <img
                          className="mb-3"
                          src={URL.createObjectURL(img)}
                          alt=""
                          style={{
                            width: "100%",
                            maxHeight: "300px",
                            borderRadius: "10px",
                          }}
                        />
                      ) : (
                        <img
                          className="mb-3"
                          src={item.firstImg}
                          alt=""
                          style={{
                            width: "100%",
                            maxHeight: "300px",
                            borderRadius: "10px",
                          }}
                        />
                      )}
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                      <button
                        className="btn btn-danger rounded-pill"
                        onClick={() => {
                          settoggle(false);
                          setimg("");
                        }}
                      >
                        Close
                      </button>
                      {img && (
                        <button
                          className="btn btn-primary rounded-pill"
                          onClick={() => chamgepic1(item.id)}
                        >
                          Change Now
                        </button>
                      )}
                    </div>
                  </div>
                </MainToggle>
              )}
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
                        <div class="carousel-item active position-relative">
                          <span
                            className="position-absolute btn btn-primary rounded-pill btn-sm"
                            onClick={() => settoggle(true)}
                            style={{top: "5px", left: "5px"}}
                          >
                            change the photo
                          </span>
                          <img
                            src={item.firstImg}
                            class="d-block slide-pic w-100"
                            alt="..."
                          />
                        </div>
                        <div class="carousel-item position-relative">
                          <img
                            src={item.secondImg}
                            class="d-block slide-pic w-100"
                            alt="..."
                          />
                        </div>
                        <div class="carousel-item">
                          <img
                            src={item.thirdImg}
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
                    <span className="text-color">{item.description}</span>
                  </div>
                </Head>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <h4 className="mt-3">The price: {item.price} dhr</h4>
                  <button
                    onClick={() =>
                      dispatch(
                        addItem({
                          // img: item["img-1"],
                          // title: item.title,
                          // price: item.price,
                          ...item,
                        })
                      )
                    }
                    className="btn btn-sm btn-primary rounded-pill"
                  >
                    Add To Card
                  </button>
                </div>
                <Like>
                  <span
                    className="d-flex justify-content-center"
                    style={{flexDirection: "column"}}
                  >
                    {/* <img src={normalLike} alt="" />{" "} */}
                    <LikeComp docId={item.id} likes={item.likes} />
                    <span className="fw-bold text-secondary m-auto mt-1">
                      {item.likes.length - 1}
                    </span>
                  </span>

                  <span
                    className="d-flex justify-content-center"
                    style={{flexDirection: "column"}}
                  >
                    <DisLike docId={item.id} dislikes={item.dislikes} />
                    <span className="fw-bold text-secondary m-auto">
                      {item.dislikes.length - 1}
                    </span>
                  </span>
                </Like>
                <CardHolder className="row">
                  <Link
                    to="/pieces/chair"
                    class="card my-shadw border-0 col-6 col-sm-4 col-md-3 m-auto card-item mb-3"
                    style={{padding: "0", textDecoration: "none"}}
                  >
                    <img
                      src="https://images.pexels.com/photos/6344440/pexels-photo-6344440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <h6 class="card-title fw-bold">Chairs</h6>
                      <p class="card-text">
                        Chairs are furniture designed for sitting, typically
                        consisting of a seat, backrest some items....{" "}
                      </p>
                    </div>
                  </Link>
                  <Link
                    to="/pieces/table"
                    class="card my-shadw border-0 col-6 col-sm-4 col-md-3 m-auto card-item mb-3"
                    style={{padding: "0", textDecoration: "none"}}
                  >
                    <img
                      src="https://images.pexels.com/photos/2097118/pexels-photo-2097118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <h6 class="card-title fw-bold">Tables</h6>
                      <p class="card-text">
                        Tables are flat surfaces supported by legs or a base,
                        providing a stable platform for..
                      </p>
                    </div>
                  </Link>
                  <Link
                    to="/pieces/freezer"
                    class="card my-shadw border-0 col-6 col-sm-4 col-md-3 m-auto card-item mb-3"
                    style={{padding: "0", textDecoration: "none"}}
                  >
                    <img
                      src="https://assets.teenvogue.com/photos/64ecb6225f93d6e6cc9ea03e/4:3/w_1200,h_900,c_limit/Comm_BestFridges_Aug2023_PROMO.jpg"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <h6 class="card-title fw-bold">Freezers</h6>
                      <p class="card-text">
                        Explore cutting-edge technologies that enhance
                        efficiency, such as adjustable temperature controls
                      </p>
                    </div>
                  </Link>
                  <Link
                    to="/pieces/couch"
                    class="card my-shadw border-0 col-6 col-sm-4 col-md-3 m-auto card-item mb-3"
                    style={{padding: "0", textDecoration: "none"}}
                  >
                    <img
                      src="https://images.pexels.com/photos/9760216/pexels-photo-9760216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <h6 class="card-title fw-bold">Couches</h6>
                      <p class="card-text">
                        Indulge in the epitome of elegance and sophistication
                        with our carefully selected coach designs
                      </p>
                    </div>
                  </Link>
                  <Link
                    to="/pieces/wardrobe"
                    class="card my-shadw border-0 col-6 col-sm-4 col-md-3 m-auto card-item mb-3"
                    style={{padding: "0", textDecoration: "none"}}
                  >
                    <img
                      src="https://brandsourcett.com/wp-content/uploads/2023/11/7468224152_1-300x300.webp"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <h6 class="card-title fw-bold">Wardrobes</h6>
                      <p class="card-text">
                        Discover a diverse range of wardrobe styles, from modern
                        and minimalist to classic and..
                      </p>
                    </div>
                  </Link>
                  <Link
                    to="/pieces/tree"
                    class="card my-shadw border-0 col-6 col-sm-4 col-md-3 m-auto card-item mb-3"
                    style={{padding: "0", textDecoration: "none"}}
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNC00nKCi3MPaApNfhoEl5MA_e2448HKY4Fw&usqp=CAU"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <h6 class="card-title fw-bold">Christmas trees</h6>
                      <p class="card-text">
                        Choose from a variety of sizes, styles, and colors to
                        match your unique holiday decor theme
                      </p>
                    </div>
                  </Link>
                </CardHolder>
                <Details>
                  <h4 className="d-block mt-3">Room Delivery Services :</h4>
                  <p className=" text-color" style={{lineHeight: "1.7"}}>
                    At NPMC, we pride ourselves on providing unparalleled
                    convenience with our top-notch room delivery services.
                    Whether you're moving into a new home, renovating your
                    existing space, or managing a hospitality business, our
                    dedicated team ensures a seamless and stress-free
                    experience.
                  </p>
                  <h6>Efficient Logistics:</h6>
                  <p
                    style={{fontSize: "14px", lineHeight: "1.7"}}
                    className="text-color"
                  >
                    Our experienced logistics team manages the entire delivery
                    process, ensuring that rooms, furniture, and essentials
                    reach your destination in a timely and efficient manner. We
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
                    furniture will be expertly assembled and arranged according
                    to your specifications.
                  </p>
                  <h6>Dedicated Customer Support:</h6>
                  <p
                    style={{fontSize: "14px", lineHeight: "1.7"}}
                    className="text-color"
                  >
                    Have questions or concerns? Our friendly customer support
                    team is available to assist you at every step. We prioritize
                    clear communication and aim to address your queries
                    promptly.
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
            </div>
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
const CardHolder = styled.div`
  & .card-item {
    width: 16rem;
    @media (max-width: 767px) {
      font-size: 12px;
      width: 45%;
    }
    img {
      height: 170px;
      @media (max-width: 767px) {
        height: 120px;
      }
    }
  }
`;
const MainToggle = styled.div`
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 111111;
  background-color: rgba(0, 0, 0, 0.788);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fade 0.5s;
  & .container-toggle {
    position: absolute;
    background-color: #eee;
    border-radius: 10px;
    padding: 10px;
    width: 400px;
    max-width: 100%;
  }
`;
export default ParamsComp;
