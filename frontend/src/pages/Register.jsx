import React, { useState, useRef } from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
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
  const [imagePreview, setImagePreview] = useState(null);

  

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
    
    console.log("aboutMe", aboutMeRef.current.value);
    event.preventDefault();
    

    let newUser = new FormData();
    newUser.append("username", usernameRef.current.value);
    newUser.append("password", passwordRef.current.value);
    newUser.append("name", prefNameRef.current.value);
    newUser.append("full_name", fullNameRef.current.value);
    if (emailAddressRef.current.value)
      newUser.append("email", emailAddressRef.current.value);
    if (aboutMeRef.current.value) newUser.append("about", aboutMeRef.current.value);
    history.push("/Login");

    axios
      .post("http://localhost:8800/api/auth/register", newUser,
      )
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
        <form
          className="border border-dark rounded"
          onSubmit={handleFormRegister}
        >
          <h1 className="mb-3 ">
            <strong>SocialApp</strong>
          </h1>
          <h4>Register</h4>
          <div className="form-group">
            <label htmlFor="userName">
              {" "}
              <b>Username *</b>{" "}
            </label>
            <input
              type="text"
              className="form-control col-lg-12"
              id="userName"
              name="userName"
              required
              ref={usernameRef}
            />
            <br />
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
            <br />
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
          <br />

          <div className="form-group">
            <label htmlFor="fullName">
              {" "}
              <b>Full Name *</b>{" "}
            </label>
            <input
              type="text"
              className="form-control col-lg-12"
              id="fullName"
              name="fullName"
              required
              ref={fullNameRef}
            />
            <br />
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
          <br />

          <div className="form-group">
            <label htmlFor="aboutMe">
              <b>About Me</b>{" "}
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
                Login Page
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
