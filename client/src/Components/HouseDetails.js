import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import host from "../host";

import dropdownIcon from "../images/dropdown-icon.png";
import accountLogo from "../images/account-logo.png";

function HouseDetails() {
  const [house, setHouse] = useState();
  const [owner, setOwner] = useState();

  const [duration, setDuration] = useState(1);
  const [status, setStatus] = useState(false);

  const [logged, setLogged] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const getHouseDetails = () => {
    const url = window.location.href;
    const arr = url.split("/");
    const id = arr[arr.length - 1];

    axios
      .get(`${host}/house/` + id)
      .then((res) => {
        const data = res.data;
        setHouse(data.house);
        setOwner(data.owner[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDuration = () => {
    setStatus(status === true ? false : true);
  };

  const handleDrop = (e) => {
    const arr = e.target.value.split(" ");

    setDuration(arr[0]);
    setStatus(false);
  };

  const handleOrder = (house, duration) => {
    if (window.sessionStorage.length === 0) {
      setLogged(false);
      return;
    } else {
      let data = {
        id: house._id,
        userEmail: window.sessionStorage.getItem("userEmail"),
        months: parseInt(duration, 10),
      };

      axios
        .post(`${host}/house/`, data)
        .then((res) => {
          let x = res.data;
          if (x.status === false) {
            setErrorMsg(x.msg);
          } else {
            alert(
              "Order success, please check your account for more information"
            );
            setDuration(1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getHouseDetails();
  }, []);

  const manip = (ppm) => {
    // manipulasi string buat munculin . di nominal uang
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
    <div>
      {errorMsg === "" ? null : alert(errorMsg)}
      {logged === true ? null : <Redirect to="/auth/signin" />}
      {house == undefined ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border loading" role="status"></div>
        </div>
      ) : (
        <div onClick={() => (status === true ? setStatus(false) : null)}>
          <div className="details-container row">
            <div className="details-img col-9">
              <img src={house.image}></img>
            </div>

            <div className="details col-3">
              <div className="details-description ">
                <h1>{house.name}</h1>
                <h2>{house.address}</h2>
              </div>
              <div className="details-order">
                <h1>Rp{manip(house.pricePerMonth)} / Month</h1>
                <div className="duration">
                  <button
                    className="duration-btn"
                    type="button"
                    onClick={() => handleDuration()}
                  >
                    {`${duration} Month(s)`}
                    <img src={dropdownIcon}></img>
                  </button>

                  <div
                    className={
                      status === true ? "duration-drop" : "duration-drop-none"
                    }
                  >
                    <input
                      type="button"
                      value="1 Month"
                      onClick={(e) => handleDrop(e)}
                    ></input>
                    <input
                      type="button"
                      onClick={(e) => handleDrop(e)}
                      value="3 Months"
                    ></input>
                    <input
                      type="button"
                      onClick={(e) => handleDrop(e)}
                      value="6 Months"
                    ></input>
                    <input
                      type="button"
                      onClick={(e) => handleDrop(e)}
                      value="12 Months"
                    ></input>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-success mt-2 order-btn"
                  onClick={() => handleOrder(house, duration)}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
          <div className="overview-container row">
            <div className="overview col-9">
              <h1 className="text-primary">Overview</h1>
              <p>{house.description}</p>
            </div>
            {owner === undefined ? null : (
              <div className="owner col-3">
                <h1>Owner</h1>
                <img src={accountLogo}></img>
                <span>{owner.name}</span>
                <span>{owner.email}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HouseDetails;
