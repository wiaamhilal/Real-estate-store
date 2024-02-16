import {collection, doc, onSnapshot, setDoc} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {db} from "../firebase";
import {useNavigate} from "react-router-dom";
import {setlocation} from "../redux/UserSlice";
const LocationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, location} = useSelector((state) => state.UserSlice);
  const [number, setnumber] = useState("");
  const [arya, setarya] = useState("");
  const [street, setstreet] = useState("");
  const [building, setbuilding] = useState("");
  const LocationInfo = () => {
    const ref = doc(db, "users", user?.uid, "location", "1212");
    setDoc(ref, {
      number: number,
      arya: arya,
      street: street,
      building: building,
    });
    // setnumber("");
    // setarya("");
    // setstreet("");
    // setbuilding("");
  };
  console.log(location);
  useEffect(() => {
    if (user) {
      const collRef = collection(db, "users", user?.uid, "location");
      onSnapshot(collRef, (querySnapshot) => {
        dispatch(
          setlocation(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
      });
    } else {
      setlocation();
    }
  }, [user]);
  return (
    <Holder>
      <Main className="container">
        <div className="row">
          <div className="col-12 col-sm-6">
            <h5 className="fw-bold text-secondary">Name</h5>
            <input type="text" className="my-feild" value={user?.displayName} />
            <h5 className="fw-bold text-secondary mt-2">Email</h5>
            <input type="email" className="my-feild" value={user?.email} />
            <h5 className="fw-bold text-secondary mt-2">Phone Number</h5>
            <input
              type="number"
              className="my-feild"
              value={number}
              onChange={(e) => setnumber(e.target.value)}
              placeholder="05..."
            />
          </div>
          <div className="col-12 col-sm-6">
            <h5 className="fw-bold text-secondary mt-2 mt-sm-0">Arya</h5>
            <input
              type="text"
              className="my-feild"
              value={arya}
              onChange={(e) => setarya(e.target.value)}
            />
            <h5 className="fw-bold text-secondary mt-2">street</h5>
            <input
              type="text"
              className="my-feild"
              value={street}
              onChange={(e) => setstreet(e.target.value)}
            />
            <h5 className="fw-bold text-secondary mt-2">building</h5>
            <input
              type="text"
              className="my-feild"
              value={building}
              onChange={(e) => setbuilding(e.target.value)}
            />
            <button
              className="btn btn-primary w-100 mt-4"
              disabled={!number || !arya || !street || !building}
              onClick={LocationInfo}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="location-info shadow m-auto mt-4 m-sm-0 ">
          <h3 className="fw-bold">location Info</h3>
          {location.map((item) => (
            <>
              <div>
                {" "}
                <span className="fw-bold">Name : </span>
                <span className="fw-bold text-secondary mt-2">
                  {user.displayName}
                </span>
              </div>
              <div className="mt-2">
                <span className="fw-bold">Phone Number : </span>
                <span className="fw-bold text-secondary mt-2">
                  {item.data.number}
                </span>
              </div>
              <div className="mt-2">
                <span className="fw-bold">Arya : </span>
                <span className="fw-bold text-secondary mt-2">
                  {item.data.arya}
                </span>
              </div>
              <div className="mt-2">
                <span className="fw-bold">Street : </span>{" "}
                <span className="fw-bold mt-2 text-secondary">
                  {item.data.street}
                </span>
              </div>
              <div className="mt-2">
                <span className="fw-bold">Building : </span>
                <span className="fw-bold text-secondary mt-2">
                  {item.data.building}
                </span>
              </div>
            </>
          ))}
        </div>
        {location.map((item) => (
          <button
            className="btn btn-primary w-100 mt-4 mt-sm-5"
            onClick={() => navigate("/payment")}
            disabled={
              !item.data.number ||
              !item.data.building ||
              !item.data.arya ||
              !item.data.street
            }
          >
            Continue to payment
          </button>
        ))}
      </Main>
    </Holder>
  );
};
const Holder = styled.div`
  overflow: hidden;
  padding-top: 80px;
  background-image: url("https://images.unsplash.com/photo-1615799998603-7c6270a45196?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: contain;
  min-height: 100vh;
`;
const Main = styled.div`
  & .my-feild {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: #eee;
    outline: none;
    padding: 5px;
  }
  & .location-info {
    background-color: #eee;
    padding: 15px;
    border-radius: 10px;
    width: fit-content;
  }
`;
export default LocationPage;
