import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import homeImg from "../images/home-img.jpg";

function Home() {
  const [show, setShow] = useState(false);
  const [ads, setAds] = useState(false);

  const showMore = () => {
    setShow(true);
  };

  const advertise = () => {
    setAds(true);
  };

  return (
    <div className="flex justify-content-around mr-5 ml-5 mt-5 pt-5">
      {show === true ? <Redirect to="/browse" /> : null}
      {ads === true ? (
        window.sessionStorage.length > 0 ? (
          <Redirect to="/user/insertHouse" />
        ) : (
          <Redirect to="/auth/signin" />
        )
      ) : null}
      <div>
        <div className="home-text">
          <b className="text-info">All That You Need</b>
          <br />
          <div>
            We strive for simplicity and efficiency, find the perfect boarding
            house near you or advertise your property on our website.
          </div>
        </div>
        <div className="home-btn">
          <button className="bg-primary" onClick={showMore}>
            Show More
          </button>
          <button className="bg-primary" onClick={advertise}>
            Advertise
          </button>
        </div>
      </div>
      <div>
        <img className="img-home" src={homeImg}></img>
      </div>
    </div>
  );
}

export default Home;
