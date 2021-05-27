import React, { useState } from "react";
import removeIcon from "../images/remove-icon.png";

function OwnedHouse(props) {
  return (
    <div className="owned-container">
      <img className="owned-image" src={props.data.image}></img>
      <span>{props.data.name}</span>
      <button type="button" onClick={() => props.remove(props.data._id)}>
        <img className="remove-logo" src={removeIcon}></img>
      </button>
    </div>
  );
}

export default OwnedHouse;
