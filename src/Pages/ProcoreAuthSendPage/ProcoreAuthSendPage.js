import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'
import classes from './ProcoreAuthSendPage.module.css'
import * as procoreIframeHelpers from '@procore/procore-iframe-helpers'

// Tools
import ReactGA from 'react-ga';

// Data
import * as PageStates from '../PageStates'
import * as Endpoints from '../../Data/Endpoints'
import * as Strings from '../../Data/Strings'

// Functions
//import GetObjectFromParameters from '../../Functions/GetObjectFromParameters'

// Components
import LoadingSpinner from '../../Components/LoadingSpinner'
import HeaderBar from '../../Components/HeaderBar'

const context = procoreIframeHelpers.initialize();


class ProcoreAuthSendPage extends Component {
  static propTypes = {
    user: PropTypes.shape({
      currentRouteObject: PropTypes.shape({
        search: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
      pathname: PropTypes.string.isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    procore: PropTypes.shape({
      companyId: PropTypes.string.isRequired,
      projectId: PropTypes.string.isRequired
    }).isRequired,
    authoriseWithProcoreServer: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      state: PageStates.LOADING
    }
    console.log("procore auth send page loading")
  }

  componentDidMount() {
    // Register pageview with GA
    ReactGA.pageview(this.props.location.pathname);
    this.procoreLogin()
  }



  procoreLogin() {
    const procoreURL = process.env.REACT_APP_PROCORE_AUTH_URL.replace("<CLIENT_ID>", process.env.REACT_APP_PROCORE_CLIENT_ID).replace("<REDIRECT_URI>", process.env.REACT_APP_PROCORE_REDIRECT_URL)
    context.authentication.authenticate({
      // Some URL on your domain that will start the authentication process. In
      // this case, /auth/procore will just forward the user onto the
      // /oauth/authorize endpoint with the appropriate client id and redirect URL
      url: procoreURL,

      // A function to run if authentication is successful. Payload, you will see
      // below, is sent by you at the last stage of the authentication flow.
      // In this case, we don't need to use payload, and instead just forward the
      // user onto some protected content
      onSuccess: this.onCodeProvided,

      // A function to run if authentication fails. We are just logging the error
      // to the console, but you will want to display an error to the user. This
      // function can be triggered by you, or will be triggered automatically if the
      // user closes the authenication window
      onFailure: this.onServerNotGrantedAccess
    })
  }

  onCodeProvided = (payload) => {
    // Get the auth code from the current route object\
    var parameters = { ...payload }
    //console.log(this.props.user.currentRouteObject)
    parameters.redirectURI = process.env.REACT_APP_PROCORE_REDIRECT_URL
    parameters.companyId = this.props.procore.companyId
    parameters.projectId = this.props.procore.projectId
    //console.log(parameters)
    this.props.authoriseWithProcoreServer(parameters, this.onServerGrantedAccess, this.onServerNotGrantedAccess)
  }

  onServerGrantedAccess = () => {
    console.log("Server was granted access")
    this.setState({
      state: PageStates.QUIESCENT
    })
    this.props.history.push(Endpoints.DEFAULTLOGGEDINPAGE)
  }

  onServerNotGrantedAccess = (error) => {
    console.log(error);
    this.setState({
      state: PageStates.ERROR_NO_PROCORE_ACCESS
    })
  }

  getErrorPresentation = () => {
    return (
      <div className={classes.errorPresentation}>
        { Strings.ERROR_GETTING_PROCORE_ACCESS }
        <input
          id='procore-authorise-button'
          type='submit'
          value={ Strings.AUTHORISE_WITH_PROCORE }
          className={classes.procoreButton}
          onClick={(e) => this.procoreLogin() }
          />
      </div>
    )
  }

  getConfirmingPresentation = () => {
    return (
      <React.Fragment>
        <LoadingSpinner />
      </React.Fragment>
    )
  }

  render() {
    return (
      <div id="authorising-procore-page">
        <HeaderBar logOutOnly openProjectSelector={false} />
        <div className={classes.authorisingProcoreContainer}>
          {
            this.state.state === PageStates.QUIESCENT ? this.getConfirmingPresentation() : null
          }
          {
            this.state.state === PageStates.LOADING ? this.getConfirmingPresentation() : null
          }
          {
            this.state.state === PageStates.ERROR_NO_PROCORE_ACCESS ? this.getErrorPresentation() : null
          }
        </div>
      </div>
    )
  }
}

export default ProcoreAuthSendPage
