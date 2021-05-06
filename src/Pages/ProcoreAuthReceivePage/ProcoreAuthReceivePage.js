import { Component } from 'react'
import PropTypes from 'prop-types'
import * as procoreIframeHelpers from '@procore/procore-iframe-helpers'

// Tools
import ReactGA from 'react-ga';

// Functions
import GetObjectFromParameters from '../../Functions/GetObjectFromParameters'

// Components
import LoadingSpinner from '../../Components/LoadingSpinner'


class ProcoreAuthReceivePage extends Component {
  static propTypes = {
    user: PropTypes.shape({
      currentRouteObject: PropTypes.shape({
        search: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
  }

  componentDidMount() {
    // Register pageview with GA
    ReactGA.pageview(this.props.location.pathname);
    //console.log(this.props.location.search);
    //console.log(this.props.user.currentRouteObject)
    // Get the auth code from the current route object
    var parameters = GetObjectFromParameters(this.props.location.search)
    //console.log(parameters)
    // Initialise the procore iFrame helper
    const context = procoreIframeHelpers.initialize();
    // This is the payload passed to your onSuccess handler.
    context.authentication.notifySuccess(parameters)
  }

  render() {
    return <LoadingSpinner />
  }
}

export default ProcoreAuthReceivePage
