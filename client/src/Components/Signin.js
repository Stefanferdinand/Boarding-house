import React, { useState } from "react";
import Navigation from "./Navigation";
import AuthForm from "./AuthForm";

function Signin() {
  return (
    <div className="auth bg-info">
      <AuthForm status="Sign In" />
    </div>
  );
}

export default Signin;
