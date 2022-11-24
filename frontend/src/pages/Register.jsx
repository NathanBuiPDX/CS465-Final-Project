import React, { useState, useRef } from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";
import axios from "axios"
//call register endpoint when submitting the form
const Register = () => {


  const history = useHistory();
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const prefNameRef = useRef("");
  const fullNameRef = useRef("");
  const emailAddressRef = useRef("");
  const [profileFile, setProfileFile] = useState(null);
  const imgRef = useRef("");
  const maleCheckBoxRef = useRef("");
  const femaleCheckBoxRef = useRef("");
  const otherCheckBoxRef = useRef("");
  const aboutMeRef = useRef("");
  
 const handleImageUpload = (event) => {
    event.preventDefault();
    try {
      console.log("FILE: ", event.target.files[0]);
      //event.target is the place where we upload image/txt
      //if we want to extract the img, must call event.target.files 0,1,2 depending on position
      //if we want to extract the inputTxt, it will be event.target.value
      setProfileFile(event.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  
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
    

      axios
        .post("http://localhost:8800/api/auth/register", {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
          name: prefNameRef.current.value,
          full_name: fullNameRef.current.value,
          email: emailAddressRef.current.value,
          icon_url: profileFile,
          about: aboutMeRef.current.value,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          window.alert("unable to register");
          console.log(error);
        });
  };
  const handleFormLogin = (event) => {
    event.preventDefault();
    history.push("/Login");
  };
  return (
    <div className="row justify-content-center align-items-center formContainer">
      <div>
        <form className="border border-dark rounded" onSubmit={handleFormRegister}>
          <h1 className="mb-2">
            <strong>REGISTER</strong>
          </h1>
          <div className="form-group">
            <label htmlFor="userName">
              {" "}
              <b>UserName *</b>{" "}
            </label>
            <input
              type="text"
              className="form-control col-lg-12"
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
              type="password"
              className="form-control col-lg-12"
              id="password"
              name="password"
              required
              ref={passwordRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="prefName">
              {" "}
              <b>Preferred Name *</b>{" "}
            </label>
            <input
              type="text"
              className="form-control col-lg-12"
              id="prefName"
              name="prefName"
              required
              ref={prefNameRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullName">
              {" "}
              <b>Name *</b>{" "}
            </label>
            <input
              type="text"
              className="form-control col-lg-12"
              id="fullName"
              name="fullName"
              required
              ref={fullNameRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailAddress">
              <b>Email Address </b>{" "}
            </label>
            <input
              type="email"
              className="form-control"
              id="emailAddress"
              name="emailAddress"
              ref={emailAddressRef}
            />
          </div>
          <div
            className="form-group"
            action="/upload"
            method="POST"
            encType="multipart/form-data"
          >
            <label htmlFor="img">
              <b>Upload a pic </b>
            </label>
            <input type="file" id="picture" name="picture" ref={imgRef} />
            <button type="submit">Upload</button>
            <img src="url" alt=" " name="pic" />
          </div>
          <div className="form-group form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="maleCheckBox"
              name="maleCheckBox"
              ref={maleCheckBoxRef}
            />
            <label className="form-check-label" htmlFor="checkBox">
              {" "}
              <b>Male</b>
            </label>
            <br />
          </div>
          <div className="form-group form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="femaleCheckBox"
              name="femaleCheckBox"
              ref={femaleCheckBoxRef}
            />
            <label className="form-check-label" htmlFor="checkBox">
              {" "}
              <b>Female</b>
            </label>
            <br />
          </div>
          <div className="form-group form-check">
            <input
              className="form-check-input"
              type="checkBox"
              id="otherCheckBox"
              name="otherCheckBox"
              ref={otherCheckBoxRef}
            />
            <label className="form-check-label" htmlFor="otherCheckBox">
              {" "}
              <b>Other</b>
            </label>
            <br />
          </div>

          <div className="form-group">
            <label htmlFor="aboutMe">
              <b>AboutMe</b>{" "}
            </label>

            <input
              className="form-control"
              id="aboutMe"
              rows="4"
              ref={aboutMeRef}
            />
          </div>

          <div className="form-group row">
            <div className="col">
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </div>
            <div className="col">
              <button type="reset" className="btn btn-primary btn-block">
                Reset
              </button>
            </div>
            <div className="col">
              <button
                type="login"
                onClick={handleFormLogin}
                className="btn btn-primary btn-block"
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
