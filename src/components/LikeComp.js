import React from "react";
import {db} from "../firebase";
import {arrayRemove, arrayUnion, doc, updateDoc} from "firebase/firestore";
import {useSelector} from "react-redux";
import boldLike from "../img/like-svgrepo-com (2).svg";
import normalLike from "../img/like-svgrepo-com (3).svg";
import {useNavigate} from "react-router-dom";

const LikeComp = ({docId, likes}) => {
  const {user} = useSelector((state) => state.UserSlice);
  const navicate = useNavigate();
  const handleLike = () => {
    if (!user) {
      alert("you have to sign in first");
      navicate("/signin");
    } else {
      const likeRef = doc(db, "products", docId);
      if (likes?.includes(user?.uid)) {
        updateDoc(likeRef, {
          likes: arrayRemove(user?.uid),
        })
          .then(() => {
            console.log("unlike");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        updateDoc(likeRef, {
          likes: arrayUnion(user?.uid),
        })
          .then(() => {
            console.log("like");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  return (
    <div onClick={handleLike}>
      {likes.includes(user?.uid) ? (
        <img src={normalLike} alt="" />
      ) : (
        <img src={boldLike} alt="" />
      )}
    </div>
  );
};

export default LikeComp;
