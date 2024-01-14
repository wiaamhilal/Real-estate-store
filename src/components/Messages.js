import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {db} from "../firebase";

const Messages = () => {
  const [message, setmessage] = useState([]);
  const DeleteComment = (id) => {
    const collref = doc(db, "comments", id);
    deleteDoc(collref);
  };
  useEffect(() => {
    const getRef = collection(db, "comments");
    const orderedRef = query(getRef, orderBy("time", "desc"));
    onSnapshot(orderedRef, (snapshot) => {
      setmessage(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);
  console.log(message);
  return (
    <Holder>
      {message.map((item) => (
        <Main className="container mb-3" style={{position: "relative"}}>
          <div className="d-flex align-items-center  ">
            <img
              src={item.img}
              alt=""
              className="me-1 rounded-circle"
              style={{width: "60px", height: "60px"}}
            />
            <div>
              <span className="d-block fw-bold">{item.name}</span>
              <span className="fw-bold mb-1">{item.email}</span>
              <p className="">{item.comment}</p>
            </div>
          </div>
          <button
            onClick={() => DeleteComment(item.id)}
            className="btn btn-sm btn-danger"
            style={{right: "10px", bottom: "10px", position: "absolute"}}
          >
            Delete
          </button>
        </Main>
      ))}
    </Holder>
  );
};
const Holder = styled.div`
  background-color: #eee;
  background-image: url("https://images.unsplash.com/photo-1615799998603-7c6270a45196?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: contain;
  z-index: -121212;
  padding-top: 80px;
  min-height: 100vh;
`;
const Main = styled.div`
  background-color: #80808038;
  border-radius: 15px;
  padding: 10px;
`;
export default Messages;
