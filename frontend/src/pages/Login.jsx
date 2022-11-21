import React, { useState, useRef } from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const handleFormLogin = (event) => {
    console.log("USERNAME: ", usernameRef.current.value);
    console.log("Password: ", passwordRef.current.value);
    event.preventDefault();
  };
  const handleFormRegister = (event) => {
    event.preventDefault();
    history.push("/Register");
  };
  return (
    <div className="row loginFormContainer">
      <div>
        <form
          className=" border border-dark rounded login-form"
          onSubmit={handleFormLogin}
        >
          <h1 className="mb-2 login-header">
            <strong>Login</strong>
          </h1>
          <div className="form-group">
            <label htmlFor="userName">
              {" "}
              <b>UserName *</b>{" "}
            </label>
            <input
              type="text"
              className="form-control col-lg-12 form-input"
              id="userName"
              name="userName"
              required
              ref={usernameRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              {" "}
              <b>Password *</b>{" "}
            </label>
            <input
              type="text"
              className="form-control col-lg-12"
              id="password"
              name="password"
              required
              ref={passwordRef}
            />
          </div>
          <div className="form-group row">
            <div className="col">
              <button type="login" className="btn btn-primary btn-block">
                Login
              </button>
            </div>

            <div className="col">
              <button
                type="register"
                onClick={handleFormRegister}
                className="btn btn-primary btn-block"
              >
                Back to Registration Page
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
