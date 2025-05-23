import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types'
import './App.css';

import Amplify, { Auth } from 'aws-amplify';
import ReactGA from 'react-ga';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

// Data
import { AUTH_SUCCESS } from './States'
import * as Endpoints from './Data/Endpoints'
import * as Strings from './Data/Strings'

// Functions
import GetObjectFromParameters from './Functions/GetObjectFromParameters'

// Add Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* Before sign in pages */
import PrivateRoute from './Components/PrivateRoute';
import ProjectLoading from './Components/Common/ProjectLoading'
import Error404 from './Components/Error404'

const ProcoreAuthSendPage = lazy(() => import('./Pages/ProcoreAuthSendPage'));
const ProcoreAuthReceivePage = lazy(() => import('./Pages/ProcoreAuthReceivePage'));
const SignInPage = lazy(() => import('./Pages/SignInPage'))
const ConfirmEmailPage = lazy(() => import('./Components/ConfirmEmailPage'));

/* Other pages */
const LoggedInContent = lazy(() => import('./Pages/LoggedInContent'));

// TODO: FUTURE: make mobile version pages the right height (1x1 content is way longer than it needs to be)
// TODO: FUTURE: make the page menu float over other elements and not be 100% width in mobile size
// TODO: FUTURE: Strip out axios dependency (not needed as a root dependency)
// TODO: FUTURE: Strip out bootstrap
// TODO: FUTURE: Strip out blueprint (if possible; date picker is important)
// TODO: FUTURE: Strip out node-sass (why is this used?)
// TODO: FUTURE: Strip out typescript???
// TODO: FUTURE: Migrate to CSS Grid from bootstrap where possible (no rows and cols in classnames)
// TODO: FUTURE: Simplify CSS by using modules
// TODO: FUTURE: Remove the Long Text box once the Git Text box is complete
// TODO: FUTURE: Make page content in Redux follow the available fields for a projectType
// TODO: FUTURE: Put a dev password on the front of the dev portal
// TODO: FUTURE: Add Toasts when errors occur
// TODO: URGENT: Procore crashes in Team member page and project details page


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
  static propTypes = {
    auth: PropTypes.shape({
      isSignedIn: PropTypes.string.isRequired
    }).isRequired,
    user: PropTypes.shape({
      currentRoute: PropTypes.string.isRequired
    }).isRequired,
    refreshSession: PropTypes.func.isRequired,
    storeProcoreDetails: PropTypes.func.isRequired
  }


  constructor(props) {
    super(props)
    this.state = {
      oldConsoleLog: null,
    }
    if (process.env.REACT_APP_IS_PROCORE === "True") {
      // Store the Procore details if they are provided
      const parameters = GetObjectFromParameters(window.location.search)
      if (parameters.companyId && parameters.projectId) {
        props.storeProcoreDetails(parameters)
      }
    }

    if (process.env.REACT_APP_GA_TEST === 'True') {
      ReactGA.initialize('dummy', { testMode: true });
      return;
    }

    ReactGA.initialize(process.env.REACT_APP_GA_ID, {
      gaOptions: {
        siteSpeedSampleRate: 100
      }
    });
  }

  componentDidMount() {
    // Turn off the logger if this is a production environment
    if (process.env.REACT_APP_STAGE === "PRODUCTION") {
      this.disableLogger()
    }
    // If the refreshToken is present, refresh the login
    this.props.refreshSession()
  }


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
              <Route path={Endpoints.SIGNINPAGE} component={SignInPage} />
              <Route path={Endpoints.SIGNUPPAGE} component={SignInPage} />
              <Route path={Endpoints.FORGOTPASSWORDPAGE} component={SignInPage} />
              <Route path={Endpoints.RESETPASSWORDPAGE} component={SignInPage} />
              <Route path={Endpoints.CONFIRMEMAILPAGE} component={ConfirmEmailPage} />
              <Route path={Endpoints.PROCOREAUTHRECEIVEPAGE} component={ProcoreAuthReceivePage} />

              <PrivateRoute path={Endpoints.PROCOREAUTHSENDPAGE} component={ProcoreAuthSendPage} />

              <PrivateRoute path={Endpoints.PROJECTDETAILSPAGE} component={LoggedInContent} />
              <PrivateRoute path={`${Endpoints.PROJECTDETAILSPAGE}/:id`} component={LoggedInContent} />

              <PrivateRoute path={Endpoints.PROJECTTEAMPAGE} component={LoggedInContent} />
              <PrivateRoute path={`${Endpoints.PROJECTTEAMPAGE}/:id`} component={LoggedInContent} />

              <PrivateRoute path={Endpoints.INCEPTIONPAGE} component={LoggedInContent} />
              <PrivateRoute path={`${Endpoints.INCEPTIONPAGE}/:id`} component={LoggedInContent} />

              <PrivateRoute path={Endpoints.FEASIBILITYPAGE} component={LoggedInContent} />
              <PrivateRoute path={`${Endpoints.FEASIBILITYPAGE}/:id`} component={LoggedInContent} />

              <PrivateRoute path={Endpoints.DESIGNPAGE} component={LoggedInContent} />
              <PrivateRoute path={`${Endpoints.DESIGNPAGE}/:id`} component={LoggedInContent} />

              <PrivateRoute path={Endpoints.TENDERPAGE} component={LoggedInContent} />
              <PrivateRoute path={`${Endpoints.TENDERPAGE}/:id`} component={LoggedInContent} />

              <PrivateRoute path={Endpoints.CONSTRUCTIONPAGE} component={LoggedInContent} />
              <PrivateRoute path={`${Endpoints.CONSTRUCTIONPAGE}/:id`} component={LoggedInContent} />

              <PrivateRoute path={Endpoints.HANDOVERPAGE} component={LoggedInContent} />
              <PrivateRoute path={`${Endpoints.HANDOVERPAGE}/:id`} component={LoggedInContent} />

              <PrivateRoute path={Endpoints.OCCUPATIONPAGE} component={LoggedInContent} />
              <PrivateRoute path={`${Endpoints.OCCUPATIONPAGE}/:id`} component={LoggedInContent} />

              <PrivateRoute path={Endpoints.REFURBISHMENTPAGE} component={LoggedInContent} />
              <PrivateRoute path={`${Endpoints.REFURBISHMENTPAGE}/:id`} component={LoggedInContent} />

              <PrivateRoute path={Endpoints.NEWPROJECTPAGE} component={LoggedInContent} />

              <PrivateRoute path={Endpoints.PROFILEPAGE} component={LoggedInContent} />
              {/* <PrivateRoute path={Endpoints.FOUNDATIONSPAGE} component={LoggedInContent} /> */}

              <Route path='/'
                render={() =>
                  auth.isSignedIn === AUTH_SUCCESS ?
                    <Redirect to={this.props.user.currentRoute} /> :
                    <Redirect to={Endpoints.SIGNINPAGE} />
                }
              />
              <Route component={ Error404 } />
            </Switch>
          </Suspense>
        </Router>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
      </div>
    )
  }
}

export default App;
