import React, { Component, lazy, Suspense } from 'react';
import './App.css';

import ReactGA from 'react-ga';

import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { AUTH_SUCCESS } from './states'

import * as Endpoints from './endpoints'
import PrivateRoute from './components/PrivateRoute';

import Auth from './components/Auth';
import Error404 from './components/Error404'
import TestPage from './components/TestPage'

/* Before sign in pages */
const SignIn = lazy(() => import('./components/SignIn'));
const SignUp = lazy(() => import('./components/SignUp'));
const ForgotPassword = lazy(() => import('./components/ForgotPassword'));
const ChangePassword = lazy(() => import('./components/ChangePassword'));
const ConfirmEmailPage = lazy(() => import('./components/ConfirmEmailPage'));

/* Stage pages */
const InceptionPage= lazy(() => import('./components/InceptionPage'));
const FeasibilityPage= lazy(() => import('./components/FeasibilityPage'));
const DesignPage= lazy(() => import('./components/DesignPage'));
const TenderPage= lazy(() => import('./components/TenderPage'));
const ConstructionPage= lazy(() => import('./components/ConstructionPage'));
const HandoverPage= lazy(() => import('./components/HandoverPage'));
const OccupationPage= lazy(() => import('./components/OccupationPage'));
const RefurbishmentPage= lazy(() => import('./components/RefurbishmentPage'));

/* Project pages */
const NewProjectPage= lazy(() => import('./components/NewProjectPage'));
const EditProjectPage= lazy(() => import('./components/EditProjectPage'));
const ProjectTeamPage= lazy(() => import('./components/ProjectTeamPage'));

/* Other pages */
const ProfilePage= lazy(() => import('./components/ProfilePage'));
const Foundations= lazy(() => import('./components/FoundationsPage'));

// TODO: Add functionality below 800px width to not show the site
// TODO: make mobile friendly in future
// TODO: Remove aws-cognito-promises dependency from the system as it uses a very old AWS-SDK version
// TODO: Add project name into address bar so it can be restored

class App extends Component{

  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      oldConsoleLog: null,
    }

    // Initialise Google Analytics to log all page views
    ReactGA.initialize(process.env.REACT_APP_GA_ID, {
      gaOptions: {
        siteSpeedSampleRate: 100
      }
    });
  }

  componentDidMount() {
    // Turn off the logger if this is a production environment
    process.env.REACT_APP_STAGE === "PRODUCTION" ? this.disableLogger() : this.enableLogger()
  }

  enableLogger = () => {
      if(this.state.oldConsoleLog == null) {
          return
      }
      window['console']['log'] = this.state.oldConsoleLog;
  };

  disableLogger = () => {
      this.setState({
        oldConsoleLog: console.log
      })
      window['console']['log'] = function() {};
  }



  render() {

    const { auth } = this.props

    return (
      <div className="App full-height">
        <Router>
          <Auth />

          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path='/SignIn' component={SignIn} />
              <Route path='/SignUp' component={SignUp} />
              <Route path='/forgot-password' component={ForgotPassword} />
              <Route path='/reset-password' component={ChangePassword} />
              <Route path='/confirm-email' component={ConfirmEmailPage} />

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
              <PrivateRoute path='/Profile' component={ProfilePage} />
              <PrivateRoute path='/TestPage' component={TestPage} />
              <PrivateRoute path='/Foundations' component={Foundations} />

              <Route path='/'
                render={() =>
                  auth.isSignedIn === AUTH_SUCCESS ? (
                    <Redirect to={this.props.user.route} />
                  ) : (
                    <Redirect to={Endpoints.SIGNINPAGE} />
                  )
                }
              />
              <Route component={ Error404 } />
            </Switch>
          </Suspense>
        </Router>
      </div>
    )
  }
}

export default App;
