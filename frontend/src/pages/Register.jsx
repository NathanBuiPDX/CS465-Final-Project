import React, {useState, useRef} from "react";

const Register = () => {
    const usernameRef = useRef("");
    const handleFormRegister = (event) => {
        console.log("USERNAME: ", usernameRef.current.value);
        event.preventDefault();
    }
  return (
    <div>
      <div class="row justify-content-center align-items-center formContainer">
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
            <input type="file" name="picture" />
            <button type="submit">Upload</button>
            <img src="url" alt=" " name="pic" />
          </div>
          <div class="form-group form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="maleCheckBox"
              name="maleCheckBox"
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
            />
            <label class="form-check-label" for="otherCheckBox">
              {" "}
              <b>Other</b>
            </label>
            <br />
          </div>

          <div class="form-group">
            <label for="commentArea">
              <b>AboutMe</b>{" "}
            </label>
            <textarea class="form-control" id="aboutMe" rows="4"></textarea>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
