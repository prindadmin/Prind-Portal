import React, { Component, lazy, Suspense } from 'react';
import './App.css';

import Amplify, { Auth } from 'aws-amplify';

import ReactGA from 'react-ga';

import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { AUTH_SUCCESS } from './States'

import * as Endpoints from './Data/Endpoints'
import PrivateRoute from './Components/PrivateRoute';
import ProjectLoading from './Components/common/ProjectLoading'

import Error404 from './Components/Error404'
import * as Strings from './Data/Strings'

/* Before sign in pages */
const SignIn = lazy(() => import('./Components/SignIn'));
const SignUp = lazy(() => import('./Components/SignUp'));
const ForgotPassword = lazy(() => import('./Components/ForgotPassword'));
const ResetPassword = lazy(() => import('./Components/ResetPassword'));
const ConfirmEmailPage = lazy(() => import('./Components/ConfirmEmailPage'));

/* Other pages */
const LoggedInContent = lazy(() => import('./Pages/LoggedInContent'));

// TODO: make mobile version pages the right height (1x1 content is way longer than it needs to be)
// TODO: make the page menu float over other elements and not be 100% width in mobile size
// TODO: Add error handling when a page cannot load

// Use existing Cognito resource for auth
Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Region
        region: process.env.REACT_APP_REGION,

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.REACT_APP_USER_POOL_ID,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: process.env.REACT_APP_CLIENT_ID,
    },
    API: {
        endpoints: [
            {
                name: process.env.REACT_APP_API_NAME,
                endpoint: process.env.REACT_APP_API_ENDPOINT
            }
        ]
    }
});

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

    // Show the details of the Auth configuration
    const currentConfig = Auth.configure();
    console.log(currentConfig)

    // If the refreshToken is present, refresh the login
    this.props.refreshSession()
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

  loadingPlaceholder = () => {
    return(
      <div id='loading-placeholder'>
        <ProjectLoading text={Strings.LOADING}/>
      </div>
    )
  }

  render() {

    const { auth } = this.props

    return (
      <div className="App full-height container-fluid">
        <Router>
          <Suspense fallback={this.loadingPlaceholder()}>
            <Switch>
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route path='/forgot-password' component={ForgotPassword} />
              <Route path='/reset-password' component={ResetPassword} />
              <Route path='/confirm-email' component={ConfirmEmailPage} />

              <PrivateRoute path='/project' component={LoggedInContent} />
              <PrivateRoute path='/project/:id?' component={LoggedInContent} />

              <PrivateRoute path='/team' component={LoggedInContent} />
              <PrivateRoute path='/team/:id?' component={LoggedInContent} />

              <PrivateRoute path='/inception' component={LoggedInContent} />
              <PrivateRoute path='/inception/:id?' component={LoggedInContent} />

              <PrivateRoute path='/feasibility' component={LoggedInContent} />
              <PrivateRoute path='/feasibility/:id?' component={LoggedInContent} />

              <PrivateRoute path='/design' component={LoggedInContent} />
              <PrivateRoute path='/design/:id?' component={LoggedInContent} />

              <PrivateRoute path='/tender' component={LoggedInContent} />
              <PrivateRoute path='/tender/:id?' component={LoggedInContent} />

              <PrivateRoute path='/construction' component={LoggedInContent} />
              <PrivateRoute path='/construction/:id?' component={LoggedInContent} />

              <PrivateRoute path='/handover' component={LoggedInContent} />
              <PrivateRoute path='/handover/:id?' component={LoggedInContent} />

              <PrivateRoute path='/occupation' component={LoggedInContent} />
              <PrivateRoute path='/occupation/:id?' component={LoggedInContent} />

              <PrivateRoute path='/refurbishment' component={LoggedInContent} />
              <PrivateRoute path='/refurbishment/:id?' component={LoggedInContent} />

              <PrivateRoute path='/newproject' component={LoggedInContent} />

              <PrivateRoute path='/profile' component={LoggedInContent} />
              <PrivateRoute path='/foundations' component={LoggedInContent} />

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
