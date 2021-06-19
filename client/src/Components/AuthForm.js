import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import host from "../host";
import "../styles/authform.css";

class AuthForm extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      redirect: false,
      errorMsg: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    if (this.props.status == "Sign Up") {
      e.preventDefault();

      const data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };

      axios
        .post(`${host}/api/auth/signup`, data)
        .then((res) => {
          if (res.data.status == false) {
            // if fail
            this.setState({ errorMsg: res.data.msg });
          } else {
            this.setState({ redirect: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.props.status == "Sign In") {
      e.preventDefault();

      const data = {
        email: this.state.email,
        password: this.state.password,
      };

      axios
        .post(`${host}/api/auth/signin`, data)
        .then((res) => {
          if (res.data.status == false) {
            // if fail
            this.setState({ errorMsg: res.data.msg });
          } else {
            window.sessionStorage.setItem("loggedIn", "true");
            window.sessionStorage.setItem("userName", res.data.name);
            window.sessionStorage.setItem("userEmail", res.data.email);
            this.setState({ redirect: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div className="auth-form-container bg-white">
        <h1 className="auth-form-title text-primary">{this.props.status}</h1>
        <form className="auth-form" noValidate onSubmit={this.onSubmit}>
          {this.props.status == "Sign Up" ? (
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                placeholder="Username"
                name="name"
                className="form-control"
                value={this.state.name}
                onChange={this.onChange}
              />
              <br />
            </div>
          ) : null}

          <label>E-mail:</label>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="form-control"
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <br />
          <label>Password: </label>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <br />

          {this.state.errorMsg == "" ? null : (
            <span className="text-danger">
              {this.state.errorMsg} <br />
            </span>
          )}

          <input
            type="submit"
            value={this.props.status}
            className="btn text-light btn-block bg-dark mb-2 submit-btn"
          />
          {this.props.status == "Sign In" ? (
            <span>
              Don't have an account yet?{" "}
              <Link to="/auth/signup" className="text-primary">
                Sign Up
              </Link>
            </span>
          ) : null}
        </form>
        {this.state.redirect ? <Redirect to="/user/account" /> : null}
      </div>
    );
  }
}

export default AuthForm;
