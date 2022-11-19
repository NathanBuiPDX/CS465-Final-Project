import React, { useState, useRef } from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";
const Register = () => {
  const history = useHistory();
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const prefNameRef = useRef("");
  const fullNameRef = useRef("");
  const emailAddressRef = useRef("");
  const imgRef = useRef("");
  const maleCheckBoxRef = useRef("");
  const femaleCheckBoxRef = useRef("");
  const otherCheckBoxRef = useRef("");
  const aboutMeRef = useRef("");
  const handleFormRegister = (event) => {
    console.log("USERNAME: ", usernameRef.current.value);
    console.log("Password: ", passwordRef.current.value);
    console.log("PrefName: ", prefNameRef.current.value);
    console.log("FullName: ", fullNameRef.current.value);
    console.log("Email ", emailAddressRef.current.value);
    console.log("Img", imgRef.current.value);
    console.log("maleCheckBox", maleCheckBoxRef.current.checked);
    console.log("femaleCheckBox", femaleCheckBoxRef.current.checked);
    console.log("otherCheckBox", otherCheckBoxRef.current.checked);
    console.log("aboutMe", aboutMeRef.current.value);

    event.preventDefault();
  };
  const handleFormLogin = (event) => {
    event.preventDefault();
    history.push("/Login");
  };
  return (
    <div class="row justify-content-center align-items-center formContainer">
      <div>
        <form class="border border-dark rounded" onSubmit={handleFormRegister}>
          <h1 class="mb-2">
            <strong>REGISTER</strong>
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
              ref={usernameRef}
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
              ref={passwordRef}
            />
          </div>
          <div class="form-group">
            <label for="prefName">
              {" "}
              <b>Preferred Name *</b>{" "}
            </label>
            <input
              type="text"
              class="form-control col-lg-12"
              id="prefName"
              name="prefName"
              required
              ref={prefNameRef}
            />
          </div>

          <div class="form-group">
            <label for="fullName">
              {" "}
              <b>Name *</b>{" "}
            </label>
            <input
              type="text"
              class="form-control col-lg-12"
              id="fullName"
              name="fullName"
              required
              ref={fullNameRef}
            />
          </div>
          <div class="form-group">
            <label for="emailAddress">
              <b>Email Address </b>{" "}
            </label>
            <input
              type="email"
              class="form-control"
              id="emailAddress"
              name="emailAddress"
              ref={emailAddressRef}
            />
          </div>
          <div
            class="form-group"
            action="/upload"
            method="POST"
            enctype="multipart/form-data"
          >
            <label for="img">
              <b>Upload a pic </b>
            </label>
            <input type="file" id="picture" name="picture" ref={imgRef} />
            <button type="submit">Upload</button>
            <img src="url" alt=" " name="pic" />
          </div>
          <div class="form-group form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="maleCheckBox"
              name="maleCheckBox"
              ref={maleCheckBoxRef}
            />
            <label class="form-check-label" for="checkBox">
              {" "}
              <b>Male</b>
            </label>
            <br />
          </div>
          <div class="form-group form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="femaleCheckBox"
              name="femaleCheckBox"
              ref={femaleCheckBoxRef}
            />
            <label class="form-check-label" for="checkBox">
              {" "}
              <b>Female</b>
            </label>
            <br />
          </div>
          <div class="form-group form-check">
            <input
              class="form-check-input"
              type="checkBox"
              id="otherCheckBox"
              name="otherCheckBox"
              ref={otherCheckBoxRef}
            />
            <label class="form-check-label" for="otherCheckBox">
              {" "}
              <b>Other</b>
            </label>
            <br />
          </div>

          <div class="form-group">
            <label for="aboutMe">
              <b>AboutMe</b>{" "}
            </label>

            <input
              class="form-control"
              id="aboutMe"
              rows="4"
              ref={aboutMeRef}
            />
          </div>

          <div class="form-group row">
            <div class="col">
              <button type="submit" class="btn btn-primary btn-block">
                Submit
              </button>
            </div>
            <div class="col">
              <button type="reset" class="btn btn-secondary btn-block">
                Reset
              </button>
            </div>
            <div class="col">
            <button
              type="login"
              onClick={handleFormLogin}
              class="btn btn-primary btn-block"
            >
              Back To Login Page
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
