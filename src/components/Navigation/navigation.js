import React from "react";
import { Link } from "react-router-dom";
import "./navigation.scss";

import { auth } from "../Firebase/firebase";

import * as ROUTES from "../../constants/routes";

const Nav = ({ currentUser }) => (
  <div className="navigation-container">
    <div className="nav-title">
      <h4>FIREBASE-REACT</h4>
    </div>
    <div className="nav-links">
      <ul>
        <li>
          {currentUser ? (
            <p className="sign-out" onClick={() => auth.signOut()}>
              Sign Out
            </p>
          ) : (
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
          )}
        </li>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
        {currentUser ? null : (
          <li>
            <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
          </li>
        )}
      </ul>
    </div>
  </div>
);

export default Nav;
