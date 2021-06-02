import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import accountLogo from "../images/account-logo.png";
import axios from "axios";
import host from "../host";

import OwnedHouse from "./OwnedHouse";
import OrderedHouse from "./OrderedHouse";

function Account() {
  const [status, setStatus] = useState(
    window.sessionStorage.getItem("loggedIn")
  );

  const [logout, setLogout] = useState(false);
  const [insert, setInsert] = useState(false);

  const [ownedHouses, setOwnedHouses] = useState([]);
  const [orderedHouses, setOrderedHouses] = useState([]);

  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  // get ownedhouse dan orderedhouse
  const handleOwnedOrdered = () => {
    axios
      .get(`${host}/user/account/${sessionStorage["userEmail"]}`)
      .then((res) => {
        setOwnedHouses(res.data.ownedHouse);
        setOrderedHouses(res.data.orderedHouse);
        setOrder(res.data.arrOrdered);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // mengecek apakah user mempunyai ownedhouse atau orderedhouse
  const getUserInfo = () => {
    axios
      .get(`${host}/user/${sessionStorage["userEmail"]}`)
      .then((res) => {
        if (res.data.status === true) {
          setLoading(true);
          handleOwnedOrdered();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdvertise = () => {
    setInsert(true);
  };

  const handleLogout = () => {
    window.sessionStorage.clear();
    setLogout(true);
  };

  // delete ownedhouse
  const handleRemove = (id) => {
    axios
      .delete(`${host}/user/account/` + id)
      .then((res) => {
        const x = ownedHouses.filter((it) => it._id != id);
        setOwnedHouses(x);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      {}
      {insert === true ? <Redirect to="/user/insertHouse" /> : null}
      {logout === true ? <Redirect to="/" /> : null}
      {status === "true" ? null : <Redirect to="/auth/signin" />}
      {loading === true ? (
        <div className="spinner-border account-loading" role="status"></div>
      ) : null}
      <div className="account-container mt-5 pt-5">
        <img className="account-logo" src={accountLogo}></img>
        <span className="font-weight-bold text-primary">
          {window.sessionStorage.getItem("userName")}
        </span>
        <span>{window.sessionStorage.getItem("userEmail")}</span>
        <div className="account-btn-container">
          <button
            type="button"
            onClick={handleAdvertise}
            className="btn btn-success mt-5 account-btn"
          >
            Advertise House
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-danger mt-5 account-btn"
          >
            Logout
          </button>
        </div>
      </div>

      {ownedHouses.length == 0 && orderedHouses.length == 0 ? null : (
        <div className="account-own-ordered-container">
          {ownedHouses.length == 0 ? null : (
            <div className="owned">
              <h1 className="text-info">Owned House</h1>
              <div className="owned-item">
                {ownedHouses.map((it) => {
                  return (
                    <OwnedHouse key={it._id} data={it} remove={handleRemove} />
                  );
                })}
              </div>
            </div>
          )}
          {orderedHouses.length == 0 || order.length == 0 ? null : (
            <div className="ordered">
              <h1 className="text-info">Ordered House</h1>
              <div className="ordered-item">
                {orderedHouses.map((it) => {
                  return (
                    <OrderedHouse
                      key={it._id}
                      data={it}
                      order={order.filter((el) => el.id == it._id)}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Account;
