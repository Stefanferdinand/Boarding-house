import React, { useState } from "react";
import removeIcon from "../images/remove-icon.png";

function OwnedHouse(props) {
  return (
    <div className="owned-container">
      <div className="owned-image-container">
        <a href={`/house/${props.data._id}`}><img className="owned-image" src={props.data.image}></img></a>
        <button type="button" className="btn btn-primary update-btn" onClick= {() => window.location.href = `/user/updateHouse/${props.data._id}`}>Update</button>
      </div>
      <span>{props.data.name}</span>
      <button className="remove-btn" type="button" onClick={() => props.remove(props.data._id)}>
        <img className="remove-logo" src={removeIcon}></img>
      </button>
    </div>
  );
}

export default OwnedHouse;
