import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="container-fluid flex pt-3 pb-2 bg-dark ">
      <h1 className="col-8 text-primary">Boarding House</h1>
      <nav className="flex col-3 justify-content-between align-items-center ml-5">
        <Link to="/" className="navlink-text text-white">
          Home
        </Link>
        <Link to="/browse" className="navlink-text text-white">
          Browse
        </Link>
        <Link to="/user/account" className="navlink-text text-white">
          Account
        </Link>
      </nav>
    </div>
  );
}

export default Navigation;
