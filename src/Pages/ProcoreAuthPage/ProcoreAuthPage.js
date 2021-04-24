import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'

// Tools
import ReactGA from 'react-ga';

// Data
import * as PageStates from '../PageStates'
import * as Endpoints from '../../Data/Endpoints'
import * as Strings from '../../Data/Strings'

// Functions
import GetObjectFromParameters from '../../Functions/GetObjectFromParameters'

// Components
import LoadingSpinner from '../../Components/LoadingSpinner'
const HeaderBar = lazy(() => import('../../Components/HeaderBar'));


class ProcoreAuthPage extends Component {
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
    authoriseWithProcoreServer: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      state: PageStates.LOADING
    }
    console.log("procore auth page loading")
  }

  componentDidMount() {
    // Register pageview with GA
    ReactGA.pageview(this.props.location.pathname);
    console.log(this.props.user.currentRouteObject)
    // Get the auth code from the current route object\
    var parameters = GetObjectFromParameters(this.props.user.currentRouteObject.search)
    parameters.redirectURI = process.env.REACT_APP_PROCORE_REDIRECT_URL
    this.props.authoriseWithProcoreServer(parameters, this.onServerGrantedAccess, this.onServerNotGrantedAccess)
  }

  onServerGrantedAccess = () => {
    console.log("Server was granted access")
    this.setState({
      state: PageStates.QUIESCENT
    })
    this.props.history.push(Endpoints.DEFAULTLOGGEDINPAGE)
  }

  onServerNotGrantedAccess = () => {
    this.setState({
      state: PageStates.ERROR_NO_PROCORE_ACCESS
    })
  }

  goToProcoreAuth = () => {
    const procoreURL = process.env.REACT_APP_PROCORE_AUTH_URL
      .replace("<CLIENT_ID>", process.env.REACT_APP_PROCORE_CLIENT_ID)
      .replace("<REDIRECT_URI>", process.env.REACT_APP_PROCORE_REDIRECT_URL)
    window.open(procoreURL,"_self")
  }

  getErrorPresentation = () => {
    return (
      <React.Fragment>
        { Strings.ERROR_GETTING_PROCORE_ACCESS }
        <input
          id='procore-authorise-button'
          type='submit'
          value={ Strings.AUTHORISE_WITH_PROCORE }
          className='procore-button'
          onClick={this.goToProcoreAuth}
          />
      </React.Fragment>
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
        <HeaderBar logOutOnly />
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
    )
  }
}

export default ProcoreAuthPage
