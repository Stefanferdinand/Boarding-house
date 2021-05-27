import React, { useState } from "react";

function OrderedHouse(props) {
  const [date, setDate] = useState(props.order[0].date.split("T")[0]);
  const [duration, setDuration] = useState(props.order[0].months);

  return (
    <div className="ordered-container">
      {console.log(props.order[0])}
      <div className="ordered-image-container">
        <img className="ordered-image" src={props.data.image}></img>
        <span>{date}</span>
        <span>{duration} Month(s)</span>
      </div>
      <span>{props.data.name}</span>
    </div>
  );
}

export default OrderedHouse;
