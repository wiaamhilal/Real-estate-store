import React from "react";
import {Link} from "react-router-dom";

const LivingRooms = ({id, firstImg, title, description}) => {
  return (
    <Link
      to={`/product/${id}`}
      class="card mt-4 border-0 row-md-6 my-shadw my-card"
      style={{
        width: "18rem",
        textDecoration: "none",
        // maxHeight: "389px",
      }}
    >
      <img src={firstImg} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text">{description.substring(0, 120)}</p>
        <Link to={`/product/${id}`} class="btn btn-primary">
          {" "}
          More Info
        </Link>
      </div>
    </Link>
  );
};

export default LivingRooms;
