import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router";
import host from "../host";

function InsertHouse() {

  const [houseName, setHouseName] = useState("");
  const [houseOwnerEmail, setHouseOwnerEmail] = useState(
    window.sessionStorage.getItem("userEmail")
  );
  const [pricePerMonth, setPricePerMonth] = useState();
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [logged, setLogged] = useState(
    window.sessionStorage.getItem("loggedIn")
  );

  // function buat mengencode image yang diupload menjadi base64 url string
  const encodeImageFileAsURL = () => {
    var filesSelected = document.getElementById("inputFileToLoad").files;

    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var fileReader = new FileReader();
      fileReader.readAsDataURL(fileToLoad);

      fileReader.onload = function (fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64
        setImage(srcData);
      };
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: houseName,
      owner: houseOwnerEmail,
      pricePerMonth: pricePerMonth,
      address: address,
      description: description,
      image: image,
    };

    axios
      .post(`${host}/user/insertHouse`, data)
      .then((res) => {
        if (res.data.status == false) {
          setErrorMsg(res.data.msg);
        } else {
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="ad-house-container">
      {logged === "true" ? null : <Redirect to="/auth/signin" />}
      {success === true ? <Redirect to="/" /> : null}
      <div className="mb-4">
        <h1 className="text-info">Advertise House</h1>
        <span className="text-danger mt-1">
          * Please fill in the information below
        </span>
      </div>
      <form noValidate onSubmit={onSubmit}>
        <div className="form-group">
          <label>House Name: </label>
          <input
            type="text"
            name="houseName"
            className="form-control"
            value={houseName}
            onChange={(e) => setHouseName(e.target.value)}
          />
          <br />
        </div>

        <div className="form-group">
          <label>Address: </label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
        </div>

        <div className="form-group">
          <label>Price per Month: </label>
          <input
            type="number"
            name="pricePerMonth"
            className="form-control"
            value={pricePerMonth}
            onChange={(e) => setPricePerMonth(e.target.value)}
          />
          <br />
        </div>

        <div className="form-group">
          <label>Description: </label>
          <textarea
            type="text"
            name="description"
            className="form-control desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="10"
          />

          <br />
        </div>

        <label>House Image: </label>
        <br />
        <input
          id="inputFileToLoad"
          type="file"
          onChange={encodeImageFileAsURL}
        />

        {errorMsg != "" ? (
          <span className="text-danger">*{errorMsg}</span>
        ) : null}

        <input
          type="submit"
          value="Submit"
          className="btn text-light btn-block mt-4 bg-success mt-5"
        />
      </form>
    </div>
  );
}

export default InsertHouse;
