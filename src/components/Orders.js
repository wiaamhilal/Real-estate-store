import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {db} from "../firebase";
import BasketItem from "./BasketItem";
import formatCurrency from "./FormatCurrency";
import moment from "moment/moment";

const Orders = () => {
  const {user, location} = useSelector((state) => state.UserSlice);
  const [orders, setorders] = useState([]);
  console.log(orders);
  useEffect(() => {
    if (user) {
      const collRef = collection(db, "users", user?.uid, "orders");
      const orderRef = query(collRef, orderBy("created", "desc"));
      onSnapshot(orderRef, (querySnapshot) => {
        setorders(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    } else {
      setorders([]);
    }
  }, [user]);
  console.log(orders[0]?.created);
  return (
    <Holder>
      {orders[0]?.basket ? (
        <Main className="container">
          <h1 className="text-secondary fw-bold mb-5 lh-lg">
            Thank you for your order m.r {user?.displayName}
          </h1>
          <h2 className="mb-3 fw-bold text-secondary">Your Order : </h2>

          <div>
            {orders[0]?.basket?.map((item) => (
              <BasketItem {...item} />
            ))}{" "}
          </div>
          <h2 className="fw-bold text-secondary mt-4">
            Total Price : {formatCurrency(orders[0]?.amount)}
          </h2>
          <h2 className="fw-bold text-secondary mt-4">
            Order Time :{" "}
            {moment.unix(orders[0]?.created).format("MMMM DD  h:mma")}
          </h2>
          {location.map((item) => (
            <h2 className="fw-bold text-secondary mt-4">
              Delever to : {item.data.building}
            </h2>
          ))}
          {/* <h2 className="fw-bold text-secondary mt-4">
        delevery date :
        {moment.unix(orders[0]?.created).format("MMMM DD h:mma")}
      </h2> */}
        </Main>
      ) : (
        <h1 className="fw-bold text-secondary text-center">
          {" "}
          you have no orders !
        </h1>
      )}
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
const Main = styled.div``;
export default Orders;
