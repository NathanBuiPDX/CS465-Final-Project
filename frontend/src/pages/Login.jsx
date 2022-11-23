import React, { useState, useRef, useContext } from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { InfoContext } from "../components/InfoProvider";

const Login = () => {
  const context = useContext(InfoContext);
  const history = useHistory();
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const handleFormLogin =  (event) => {
    console.log("USERNAME: ", usernameRef.current.value);
    console.log("Password: ", passwordRef.current.value);
    event.preventDefault();
          axios
            .post("http://localhost:8800/api/auth/login", {
              username: usernameRef.current.value,
              password: passwordRef.current.value,
            }, { withCredentials:true})
            .then(function (response) {
              console.log("RESPONSE: ", response.data);
              document.cookie=`userId=${response.data._id}`;
              context.modifyCurrentUser(response.data)
              history.push("/");
            })
            .catch(function (error) {
              window.alert("unable to register");
              console.log(error);
            });
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
              <button
                type="login"
                onClick={handleFormLogin}
                className="btn btn-primary btn-block"
              >
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
