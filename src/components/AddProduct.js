import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {Timestamp} from "firebase/firestore";
import {setLoading, setProjucts} from "../redux/AddProjSlice";
const AddProduct = () => {
  const navcate = useNavigate();
  const {user} = useSelector((state) => state.UserSlice);
  const {loading} = useSelector((state) => state.AddProjSlice);
  const dispatch = useDispatch();
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [price, setprice] = useState();
  const [projType, setprojType] = useState("");
  const [picture1, setpicture1] = useState("");
  const [picture2, setpicture2] = useState("");
  const [picture3, setpicture3] = useState("");
  const [picture, setpicture] = useState("");
  // const HandleChange1 = (e) => {
  //   const image = e.target.files[0];
  //   if (image === "" || image === undefined) {
  //     alert(`its not an image, the file is a ${typeof image}`);
  //   } else {
  //     setpicture1(image);
  //   }
  // };
  // const HandleChange2 = (e) => {
  //   const image = e.target.files[0];
  //   if (image === "" || image === undefined) {
  //     alert(`its not an image, the file is a ${typeof image}`);
  //   } else {
  //     setpicture2(image);
  //   }
  // };
  // const HandleChange3 = (e) => {
  //   const image = e.target.files[0];
  //   if (image === "" || image === undefined) {
  //     alert(`its not an image, the file is a ${typeof image}`);
  //   } else {
  //     setpicture3(image);
  //   }
  // };
  const HandleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`its not an image, the file is a ${typeof image}`);
    } else {
      setpicture(image);
    }
  };
  console.log(picture);
  const rest = () => {
    settitle("");
    setdesc("");
    setprice("");
    setprojType("");
    // setpicture1("");
    // setpicture2("");
    // setpicture3("");
    setpicture("");
  };
  const HnadlePost = (e) => {
    setLoading(true);
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    } else {
      const payload = {
        user: user,
        title: title,
        desc: desc,
        price: price,
        projType: projType,
        // picture1: picture1,
        // picture2: picture2,
        // picture3: picture3,
        picture: picture,
        timeStamp: Timestamp.now(),
      };
      dispatch(setProjucts(payload));
      rest();
      setLoading(false);
      navcate("/products");
    }
  };
  // useEffect(() => {
  //   if (!user?.uid === "7WspWYMa9nVXa0menWf9WEhRxd82" || !user) {
  //     navcate("/products", {replace: true});
  //   }
  // }, [user]);

  return (
    <Holder>
      {/* {user?.uid === "7WspWYMa9nVXa0menWf9WEhRxd82" ? ( */}
      <Main className="container">
        <h3 className="mt-2 fw-bold text-center text-secondary">
          Add A New Projuct
        </h3>
        <CardHolder className="rounded container my-shadw mt-4">
          <div className="d-flex align-items-center mb-3">
            {" "}
            <span className="fw-bold text-input">Title : </span>
            <input
              type="text"
              placeholder="type the projuct title"
              className="w-100"
              onChange={(e) => settitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="d-flex align-items-center mb-3">
            {" "}
            <span className="fw-bold text-input">Description : </span>
            <textarea
              type="text"
              placeholder="type the description projuct "
              className="w-100"
              onChange={(e) => setdesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="d-flex align-items-center mb-3">
            <span className="text-input fw-bold">The price : </span>
            <input
              type="number"
              className="w-100"
              placeholder="type your price product"
              onChange={(e) => setprice(e.target.value)}
              value={price}
            />
          </div>
          <div className="fw-bold mb-3">The type of projuct : </div>
          <h6 className="fw-bold">full rooms :</h6>
          <form>
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <input
                  type="radio"
                  name="type_rooms"
                  id="living rooms"
                  onChange={(e) => setprojType(e.target.value)}
                  value="living rooms"
                />
                <label className="ms-2 fw-bold the-label" for="living rooms">
                  Living Rooms
                </label>
              </div>
              <div className="d-flex align-items-center">
                <input
                  name="type_rooms"
                  type="radio"
                  id="kitchens"
                  onChange={(e) => setprojType(e.target.value)}
                  value="kitchens"
                />
                <label className="ms-2 fw-bold the-label" for="kitchens">
                  Kitchens
                </label>
              </div>
              <div className="d-flex align-items-center">
                <input
                  name="type_rooms"
                  type="radio"
                  id="outdoor"
                  onChange={(e) => setprojType(e.target.value)}
                  value="outdoor"
                />
                <label className="ms-2 fw-bold the-label" for="outdoor">
                  Outdoor
                </label>
              </div>
            </div>
            <h6 className="fw-bold">separate pieces :</h6>
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <input
                  name="type_rooms"
                  type="radio"
                  id="chair"
                  onChange={(e) => setprojType(e.target.value)}
                  value="chair"
                />
                <label className="ms-2 fw-bold the-label" for="chair">
                  chair
                </label>
              </div>
              <div className="d-flex align-items-center">
                <input
                  name="type_rooms"
                  type="radio"
                  id="table"
                  onChange={(e) => setprojType(e.target.value)}
                  value="table"
                />
                <label className="ms-2 fw-bold the-label" for="table">
                  table
                </label>
              </div>
              <div className="d-flex align-items-center">
                <input
                  name="type_rooms"
                  type="radio"
                  id="tree"
                  onChange={(e) => setprojType(e.target.value)}
                  value="tree"
                />
                <label className="ms-2 fw-bold the-label" for="tree">
                  Chris tree
                </label>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center">
                <input
                  name="type_rooms"
                  type="radio"
                  id="freezer"
                  onChange={(e) => setprojType(e.target.value)}
                  value="freezer"
                />
                <label className="ms-2 fw-bold the-label" for="freezer">
                  freezer
                </label>
              </div>
              <div className="d-flex align-items-center">
                <input
                  name="type_rooms"
                  type="radio"
                  id="couch"
                  onChange={(e) => setprojType(e.target.value)}
                  value="couch"
                />
                <label className="ms-2 fw-bold the-label" for="couch">
                  couch
                </label>
              </div>
              <div className="d-flex align-items-center">
                <input
                  name="type_rooms"
                  type="radio"
                  id="wardrobe"
                  onChange={(e) => setprojType(e.target.value)}
                  value="wardrobe"
                />
                <label className="ms-2 fw-bold the-label" for="wardrobe">
                  wardrobe
                </label>
              </div>
            </div>
          </form>
          <input
            type="file"
            name="file1"
            onChange={HandleChange}
            id="file1"
            style={{display: "none"}}
          />
          <label
            htmlFor="file1"
            className="btn btn-secondary w-100 mb-3 label-picture1"
          >
            Add A picture
          </label>
          <div>
            {picture && (
              <img
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  borderRadius: "10px",
                }}
                className="mb-3"
                alt=""
                src={URL.createObjectURL(picture)}
              />
            )}
          </div>
          {/* <input
            type="file"
            name="file2"
            onChange={HandleChange2}
            id="file2"
            style={{display: "none"}}
          />
          <label htmlFor="file2" className="btn btn-secondary w-100 mb-3">
            Add the second picture
          </label>
          <div>
            {picture2 && (
              <img
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  borderRadius: "10px",
                }}
                className="mb-3"
                alt=""
                src={URL.createObjectURL(picture2)}
              />
            )}
          </div>
          <input
            type="file"
            name="file3"
            onChange={HandleChange3}
            id="file3"
            style={{display: "none"}}
          />
          <label htmlFor="file3" className="btn btn-secondary w-100 mb-3">
            Add the third picture
          </label>
          <div>
            {picture3 && (
              <img
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  borderRadius: "10px",
                }}
                className="mb-3"
                alt=""
                src={URL.createObjectURL(picture3)}
              />
            )}
          </div> */}
          <button
            onClick={(e) => HnadlePost(e)}
            disabled={!title || !desc || !projType || !price || !picture}
            className="btn btn-primary w-100 rounded-pill"
          >
            Post The Projuct
          </button>
        </CardHolder>
      </Main>
      {/* ) : (
        navcate("/products", {replace: true})
      )} */}
    </Holder>
  );
};
const Holder = styled.div`
  background-image: url("https://images.unsplash.com/photo-1615799998603-7c6270a45196?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: contain !important;
  overflow-x: hidden;
`;
const Main = styled.div`
  padding-top: 80px;
  min-height: 100vh;
`;
const CardHolder = styled.div`
  width: fit-content;
  background-color:#eee;
  padding:10px;
  & input,textarea {
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: white;
    padding: 5px 10px;
    outline: none;
    resize: none;
}

  }
  & .text-input {
    min-width:100px;
}
& .the-label {
  font-size:14px;
}
`;
export default AddProduct;
