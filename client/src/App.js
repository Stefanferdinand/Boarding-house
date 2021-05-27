import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./Components/Navigation";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Account from "./Components/Account";
import InsertHouse from "./Components/InsertHouse";
import Browse from "./Components/Browse";
import HouseDetails from "./Components/HouseDetails";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Route exact path="/" component={Home} />
        <Route path="/browse" component={Browse} />
        <Route path="/house/:id" component={HouseDetails} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/auth/signin" component={Signin} />
        <Route path="/user/account" component={Account} />
        <Route path="/user/insertHouse" component={InsertHouse} />
      </div>
    </Router>
  );
}

export default App;
