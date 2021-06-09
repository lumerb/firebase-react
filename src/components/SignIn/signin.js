import React from "react";

import { signInWithGoogle } from "../Firebase/firebase";

import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ email: "", password: "" });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <div className="group">
            <input
              className="form-input"
              onChange={this.handleChange}
              name="email"
              type="email"
              value={this.state.email}
              required
            />
            <label className={`${
          this.state.email.length ? 'shrink' : ''
        } form-input-label`}>Email</label>
          </div>
          <div className="group">
            <input
              className="form-input"
              onChange={this.handleChange}
              name="password"
              type="password"
              value={this.state.password}
              required
            />
            <label className={`${
          this.state.password.length ? 'shrink' : ''
        } form-input-label`}>Password</label>
          </div>
          <div className="buttons">
            <button className="custom-button" type="submit">
              {" "}
              Sign in{" "}
            </button>
            <button className="custom-button google-sign-in" onClick={signInWithGoogle}>
              Google Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
