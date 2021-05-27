import React from "react";
import Navigation from "./Navigation";
import AuthForm from "./AuthForm";

function Signup() {
  return (
    <div className="auth bg-info">
      <AuthForm status="Sign Up" />
    </div>
  );
}

export default Signup;
