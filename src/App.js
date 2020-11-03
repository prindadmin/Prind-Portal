import React, { Component, lazy, Suspense } from 'react';
import './App.css';

import ReactGA from 'react-ga';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { AUTH_SUCCESS } from './States'

import * as Endpoints from './Endpoints'
import PrivateRoute from './Components/PrivateRoute';

import Auth from './Components/Auth';
import Error404 from './Components/Error404'
import TestPage from './Components/TestPage'

/* Before sign in pages */
const SignIn = lazy(() => import('./Components/SignIn'));
const SignUp = lazy(() => import('./Components/SignUp'));
const ForgotPassword = lazy(() => import('./Components/ForgotPassword'));
const ChangePassword = lazy(() => import('./Components/ChangePassword'));
const ConfirmEmailPage = lazy(() => import('./Components/ConfirmEmailPage'));

/* Stage pages */
const InceptionPage= lazy(() => import('./Components/InceptionPage'));
const FeasibilityPage= lazy(() => import('./Components/FeasibilityPage'));
const DesignPage= lazy(() => import('./Components/DesignPage'));
const TenderPage= lazy(() => import('./Components/TenderPage'));
const ConstructionPage= lazy(() => import('./Components/ConstructionPage'));
const HandoverPage= lazy(() => import('./Components/HandoverPage'));
const OccupationPage= lazy(() => import('./Components/OccupationPage'));
const RefurbishmentPage= lazy(() => import('./Components/RefurbishmentPage'));

/* Project pages */
const NewProjectPage= lazy(() => import('./Components/NewProjectPage'));
const EditProjectPage= lazy(() => import('./Components/EditProjectPage'));
const ProjectTeamPage= lazy(() => import('./Components/ProjectTeamPage'));

/* Other pages */
const ProfilePage= lazy(() => import('./Components/ProfilePage'));
const Foundations= lazy(() => import('./Components/FoundationsPage'));
const LoggedInContent = lazy(() => import('./Pages/LoggedInContent'));

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
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route path='/forgot-password' component={ForgotPassword} />
              <Route path='/reset-password' component={ChangePassword} />
              <Route path='/confirm-email' component={ConfirmEmailPage} />

              <PrivateRoute path='/project' component={LoggedInContent} />
              <PrivateRoute path='/project/:id?' component={LoggedInContent} />

              <PrivateRoute path='/team' component={ProjectTeamPage} />
              <PrivateRoute path='/team/:id?' component={ProjectTeamPage} />

              <PrivateRoute path='/inception' component={InceptionPage} />
              <PrivateRoute path='/inception/:id?' component={InceptionPage} />

              <PrivateRoute path='/feasibility' component={FeasibilityPage} />
              <PrivateRoute path='/feasibility/:id?' component={FeasibilityPage} />

              <PrivateRoute path='/design' component={DesignPage} />
              <PrivateRoute path='/design/:id?' component={DesignPage} />

              <PrivateRoute path='/tender' component={TenderPage} />
              <PrivateRoute path='/tender/:id?' component={TenderPage} />

              <PrivateRoute path='/construction' component={ConstructionPage} />
              <PrivateRoute path='/construction/:id?' component={ConstructionPage} />

              <PrivateRoute path='/handover' component={HandoverPage} />
              <PrivateRoute path='/handover/:id?' component={HandoverPage} />

              <PrivateRoute path='/occupation' component={OccupationPage} />
              <PrivateRoute path='/occupation/:id?' component={OccupationPage} />

              <PrivateRoute path='/refurbishment' component={RefurbishmentPage} />
              <PrivateRoute path='/refurbishment/:id?' component={RefurbishmentPage} />

              <PrivateRoute path='/newproject' component={NewProjectPage} />
              <PrivateRoute path='/profile' component={ProfilePage} />
              <PrivateRoute path='/testpage' component={TestPage} />
              <PrivateRoute path='/foundations' component={Foundations} />

              <Route path='/'
                render={() =>
                  auth.isSignedIn === AUTH_SUCCESS ? (
                    <Redirect to={this.props.user.currentRoute} />
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
