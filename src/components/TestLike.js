import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import React from "react";
import {db} from "../firebase";

const TestLike = ({docId, likes}) => {
  const handleLike = () => {
    const likeRef = doc(db, "products", docId);
    updateDoc(likeRef, {
      likes: arrayUnion(114224),
    })
      .then(() => {
        console.log("like");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return <div onClick={handleLike}>like</div>;
};

export default TestLike;
