import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReactGA from 'react-ga';
import { ButtonGroup, Button, Callout } from '@blueprintjs/core'

import * as Endpoints from '../../Data/Endpoints'
import EmailConfirming from '../Common/ProjectLoading'

import * as Strings from '../../Data/Strings'

// TODO: FUTURE: Get the confirmation page to log the user in rather than navigate to the login page
// TODO: FUTURE: Remove blueprintjs

class ConfirmEmailPage extends Component {
  static propTypes = {
    confirmUser: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired
    }),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }


  constructor(props) {
    super()

    const { search } = props.location

    if (search === "" || !search) {
      this.state = {
        confirmationError: true,
        errorMessage: Strings.ERROR_CONFIRMING_USER_NO_SEARCH_TERMS,
        parameters: {}
      }
      return;
    }

    var noQuestionString = search.substring(1)

    // Build an object with the passed parameters
    var parametersObject = noQuestionString.split("&").reduce((tempObject, parameter) => {
      var key = parameter.substring(0, parameter.indexOf("="))
      var value = parameter.substring(parameter.indexOf("=") + 1)
      tempObject[key] = value
      return tempObject
    }, {})

    this.state = {
      confirmationError: false,
      errorMessage: "",
      parameters: parametersObject
    }

    //console.log(parametersObject)
  }


  componentDidMount() {
    // Register pageview with GA
    ReactGA.pageview(this.props.location.pathname);

    this.sendConfirmUser()
  }

  sendConfirmUser = () => {
    this.setState({
      confirmationError: false,
      errorMessage: "",
    })
    this.props.confirmUser(
      this.state.parameters,
      this.resolveRegister,
      this.rejectRegister
    )
  }

  resolveRegister = (username) => {
    //console.log("confirmation succeeded")
    if (process.env.REACT_APP_IS_PROCORE === "True") {
      window.open(encodeURI(process.env.REACT_APP_PROCORE_LOGIN_URL), "_self")
      return;
    }
    this.props.history.push({
      pathname: Endpoints.SIGNINPAGE,
    })
  }

  rejectRegister = () => {
    //console.log("confirmation failed")
    this.setState({
      confirmationError: true,
      errorMessage: Strings.ERROR_CONFIRMING_USER,
    })
  }

  getErrorPresentation = () => {
    return (
      <div className='error-container'>
        <Callout style={{marginBottom: '15px'}} intent='danger'>
          <div>{ this.state.errorMessage }</div>
        </Callout>
        <ButtonGroup fill style={{marginBottom: '15px'}}>
          <Button
            id="retry-button"
            intent='primary'
            text={ Strings.BUTTON_RETRY }
            onClick={() => {this.sendConfirmUser()}} />
          </ButtonGroup>
      </div>
    )
  }


  render() {
    return (
      <div id="confirming-email-address">
        {
          this.state.confirmationError ?
          this.getErrorPresentation() :
          <EmailConfirming text={Strings.CONFIRMING_EMAIL_PLEASE_WAIT} />
        }

      </div>
    )
  }

}

export default ConfirmEmailPage
