import React from "react";
import {db} from "../firebase";
import {arrayRemove, arrayUnion, doc, updateDoc} from "firebase/firestore";
import {useSelector} from "react-redux";
import boldDisLike from "../img/dislike-svgrepo-com (1).svg";
import normaDislLike from "../img/dislike-svgrepo-com.svg";

const DisLike = ({docId, dislikes}) => {
  const {user} = useSelector((state) => state.UserSlice);
  const handleDisLike = () => {
    const likeRef = doc(db, "products", docId);
    if (dislikes?.includes(user?.uid)) {
      updateDoc(likeRef, {
        dislikes: arrayRemove(user?.uid),
      })
        .then(() => {
          console.log("unlike");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      updateDoc(likeRef, {
        dislikes: arrayUnion(user?.uid),
      })
        .then(() => {
          console.log("like");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div onClick={handleDisLike}>
      {dislikes.includes(user?.uid) ? (
        <img src={normaDislLike} alt="" />
      ) : (
        <img src={boldDisLike} alt="" />
      )}
    </div>
  );
};

export default DisLike;
