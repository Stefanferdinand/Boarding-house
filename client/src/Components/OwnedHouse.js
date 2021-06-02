import React, { useState } from "react";
import removeIcon from "../images/remove-icon.png";
import host from "../host";
import { Link, Redirect } from "react-router-dom";

function OwnedHouse(props) {

  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  }

  return (
    <div className="owned-container">
      {update === true ? <Redirect to={`/user/updateHouse/${props.data._id}`}></Redirect> : null}
      <div className="owned-image-container">
      <Link to={`/house/${props.data._id}`}><img className="owned-image" src={props.data.image}></img></Link>
        <button type="button" className="btn btn-primary update-btn" onClick= {() => handleUpdate()}>Update</button>
      </div>
      <span>{props.data.name}</span>
      <button className="remove-btn" type="button" onClick={() => props.remove(props.data._id)}>
        <img className="remove-logo" src={removeIcon}></img>
      </button>
    </div>
  );
}

export default OwnedHouse;
