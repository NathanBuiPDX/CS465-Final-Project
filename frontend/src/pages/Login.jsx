import React, { useState, useRef } from "react";

const Login = () => {
  const usernameRef = useRef("");
  const handleFormLogin = (event) => {
    console.log("USERNAME: ", usernameRef.current.value);
    event.preventDefault();
  };
  return (
    <div class="row justify-content-center align-items-center loginFormContainer ">
      <form
        class="border border-dark rounded" onSubmit={handleFormLogin}>
        <h1 class="mb-2">
          <strong>Login</strong>
        </h1>
        <div class="form-group">
          <label for="userName">
            {" "}
            <b>UserName *</b>{" "}
          </label>
          <input
            type="text"
            class="form-control col-lg-12"
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

        </div>
      </form>
    </div>
  );
};

export default Login;
