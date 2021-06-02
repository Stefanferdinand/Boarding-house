import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import host from "../host";

function Browse() {
  const [houses, setHouses] = useState([]);

  const getAllHouse = () => {
    axios
      .get(`${host}/browse`)
      .then((res) => {
        console.log(res);
        setHouses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log('useeffect');
    console.log(houses.length);
    getAllHouse();
  }, []);

  return (
    <div>
      {houses.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center flex-md-column">
          <div className="spinner-border loading" role="status"></div>
          <div className="mt-4">
            If loading is taking too long, please check again later
          </div>
        </div>
      ) : (
        <div className="card-container row">
          {houses.map((it) => {
            return <Card key={it._id} data={it} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Browse;
