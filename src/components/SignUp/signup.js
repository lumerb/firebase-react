import React from "react";

import { auth, createUserProfileDocument } from "../Firebase/firebase";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <div className="group">
            <input
              className="form-input"
              onChange={this.handleChange}
              name="displayName"
              type="text"
              value={displayName}
              required
            />
            <label
              className={`${
                displayName.length ? "shrink" : ""
              } form-input-label`}
            >
              Display Name
            </label>
          </div>
          <div className="group">
            <input
              className="form-input"
              onChange={this.handleChange}
              name="email"
              type="email"
              value={email}
              required
            />
            <label
              className={`${email.length ? "shrink" : ""} form-input-label`}
            >
              Email
            </label>
          </div>
          <div className="group">
            <input
              className="form-input"
              onChange={this.handleChange}
              name="password"
              type="password"
              value={password}
              required
            />
            <label
              className={`${password.length ? "shrink" : ""} form-input-label`}
            >
              Password
            </label>
          </div>

          <div className="group">
            <input
              className="form-input"
              onChange={this.handleChange}
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              required
            />
            <label
              className={`${
                confirmPassword.length ? "shrink" : ""
              } form-input-label`}
            >
              Confirm Password
            </label>
          </div>
          <button className="custom-button" type="submit">
            SIGN UP
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
