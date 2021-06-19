import axios from "axios";
import React, { useState, useEffect} from "react";
import { Redirect } from "react-router";
import host from "../host";
import "../styles/insert-update.css";

function UpdateHouse() {
  
  const [houseName, setHouseName] = useState("");
  const [pricePerMonth, setPricePerMonth] = useState();
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [logged, setLogged] = useState(
    window.sessionStorage.getItem("loggedIn")
  );

  const [loading, setLoading] = useState(true);

  const urlParsed = window.location.href.split("/");
  const urlParam = urlParsed[urlParsed.length - 1];
  var ownerId;

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
      owner: ownerId,
      pricePerMonth: pricePerMonth,
      address: address,
      description: description,
      image: image,
    };

    axios
      .put(`${host}/api/user/updateHouse/${urlParam}`, data)
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

  const getHouseData = () => {
      axios.get(`${host}/api/user/updateHouse/${urlParam}`)
      .then((res) => {
        
        const data = res.data;
        ownerId = res.data.owner; // id pemilik rumah

        setHouseName(data.name);
        setPricePerMonth(data.pricePerMonth);
        setAddress(data.address);
        setDescription(data.description);
        setImage(data.image);
        setLoading(false);

      })
      .catch((err) => {
          console.log(err);
      });
  }

  useEffect(() => {
    getHouseData();
  }, [])

  return (
    <div className="insert-update-house-container">
      {logged === "true" ? null : <Redirect to="/auth/signin" />}
      {success === true ? <Redirect to="/user/account" /> : null}
      {loading === true ? <div className="spinner-border account-loading" role="status"></div> : null}
      <div className="mb-4">
        <h1 className="text-info">Update House</h1>
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

export default UpdateHouse;
