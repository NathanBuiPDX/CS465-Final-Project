import React, { useState, useRef } from "react";
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
    <div class="row loginFormContainer">
      <div>
        <form
          class=" border border-dark rounded login-form"
          onSubmit={handleFormLogin}
        >
          <h1 class="mb-2 login-header">
            <strong>Login</strong>
          </h1>
          <div class="form-group">
            <label for="userName">
              {" "}
              <b>UserName *</b>{" "}
            </label>
            <input
              type="text"
              class="form-control col-lg-12 form-input"
              id="userName"
              name="userName"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">
              {" "}
              <b>Password *</b>{" "}
            </label>
            <input
              type="text"
              class="form-control col-lg-12"
              id="password"
              name="password"
              required
            />
          </div>
          <div class="form-group row">
            <div class="col">
              <button type="login" class="btn btn-primary btn-block">
                Login
              </button>
            </div>

            <div class="col">
              <button
                type="register"
                onClick={handleFormRegister}
                class="btn btn-primary btn-block"
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
