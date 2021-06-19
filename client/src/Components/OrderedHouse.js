import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/order-owned-house.css";

function OrderedHouse(props) {
  const [date, setDate] = useState(props.order[0].date.split("T")[0]);
  const [duration, setDuration] = useState(props.order[0].months);

  return (
    <div className="ordered-container">
      <div className="ordered-image-container">
        <Link to={`/house/${props.data._id}`}><img className="ordered-image" src={props.data.image}></img></Link>
        <span>{date}</span>
        <span>{duration} Month(s)</span>
      </div>
      <span>{props.data.name}</span>
    </div>
  );
}

export default OrderedHouse;
