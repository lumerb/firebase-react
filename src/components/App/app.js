import React from "react";

import "./app.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from '../Firebase/firebase';

import Nav from "../Navigation/navigation";
import LandingPage from "../Landing/landing";
import SignUpPage from "../SignUp/signup";
import SignInPage from "../SignIn/signin";
import PasswordForgetPage from "../PasswordForget/passwordforget";
import HomePage from "../Home/home";
import AccountPage from "../Account/account";
import AdminPage from "../Admin/admin";


import * as ROUTES from "../../constants/routes";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      }

      this.setState({ currentUser: userAuth });
    });
    
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  componentDidUpdate() {
    console.log(this.state)
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav currentUser={this.state.currentUser}></Nav>
          <div className="content-container">
          <Switch>
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} > {this.state.currentUser ? <Redirect to="/"/> : <Route path={ROUTES.SIGN_UP} component={SignUpPage} />}</Route>
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
              path={ROUTES.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
          </Switch>

          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
