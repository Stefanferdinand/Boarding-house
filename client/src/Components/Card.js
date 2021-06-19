import React from "react";
import { Link } from "react-router-dom";
import "../styles/card.css";

function Card(props) {
  const manip = (ppm) => {
    let str = ppm.toString();
    var newStr = "";

    for (let i = str.length - 1, x = 0; i >= 0; i--, x++) {
      newStr += str[i];
      if (x == 2 && i != 0) {
        x = -1;
        newStr += ".";
      }
    }
    return newStr.split("").reverse().join("");
  };

  return (
    <div className="card-item-container col-4 col-centered">
      <Link to={`/house/${props.data._id}`}>
        <div className="card-img-container">
          <img className="card-img" src={props.data.image}></img>
          <h1 className="ppm">
            Rp{manip(props.data.pricePerMonth)} <br /> / Month
          </h1>
        </div>
      </Link>
      <div className="card-details">
        <span>{props.data.name}</span>
        <span>{props.data.address}</span>
      </div>
    </div>
  );
}

export default Card;
