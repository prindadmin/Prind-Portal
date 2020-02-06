import React, { Component } from 'react';
import './App.css';

import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { AUTH_SUCCESS } from './states'

import * as Endpoints from './endpoints'

import PrivateRoute from './components/PrivateRoute';

/* Before sign in pages */
import Auth from './components/Auth';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';

/* Completed pages */
import InceptionPage from './components/InceptionPage';
import FeasibilityPage from './components/FeasibilityPage';
import DesignPage from './components/DesignPage';
import TenderPage from './components/TenderPage';
import ConstructionPage from './components/ConstructionPage';
import HandoverPage from './components/HandoverPage';
import OccupationPage from './components/OccupationPage';
import RefurbishmentPage from './components/RefurbishmentPage';

import NewProjectPage from './components/NewProjectPage';
import EditProjectPage from './components/EditProjectPage';
import ProjectTeamPage from './components/ProjectTeamPage';

/* Other pages */
import Error404 from './components/Error404'

// TODO: Add functionality below 800px width to not show the site
// TODO: make mobile friendly in future
// TODO: Remove aws-cognito-promises dependency from the system as it uses a very old AWS-SDK version

class App extends Component{

  render() {

    const { auth } = this.props // the props exposed are defined in the container

    return (
      <div className="App full-height">
        <Router>
          <Auth />

          <Switch>
            <Route path='/SignIn' component={SignIn} />
            <Route path='/SignUp' component={SignUp} />
            <Route path='/forgot-password' component={ForgotPassword} />
            <Route path='/change-password' component={ChangePassword} />

            <PrivateRoute path='/Project' component={EditProjectPage} />
            <PrivateRoute path='/Team' component={ProjectTeamPage} />
            <PrivateRoute path='/Inception' component={InceptionPage} />
            <PrivateRoute path='/Feasibility' component={FeasibilityPage} />
            <PrivateRoute path='/Design' component={DesignPage} />
            <PrivateRoute path='/Tender' component={TenderPage} />
            <PrivateRoute path='/Construction' component={ConstructionPage} />
            <PrivateRoute path='/Handover' component={HandoverPage} />
            <PrivateRoute path='/Occupation' component={OccupationPage} />
            <PrivateRoute path='/Refurbishment' component={RefurbishmentPage} />

            <PrivateRoute path='/NewProject' component={NewProjectPage} />

            <Route path='/'
              render={() =>
                auth.isSignedIn === AUTH_SUCCESS ? (
                  <Redirect to={Endpoints.DEFAULTLOGGEDINPAGE} />
                ) : (
                  <Redirect to={Endpoints.SIGNINPAGE} />
                )
              }
            />
            <Route component={ Error404 } />
          </Switch>

        </Router>
      </div>
    )
  }
}

export default App;
