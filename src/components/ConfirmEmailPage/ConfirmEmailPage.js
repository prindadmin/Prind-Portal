import React, { Component } from 'react'

import ReactGA from 'react-ga';

import * as Endpoints from '../../endpoints'
import EmailConfirming from '../common/ProjectLoading'

import * as strings from '../../data/Strings'

class ConfirmEmailPage extends Component {

  constructor(props) {
    super()

    const { search } = props.location

    if (search !== "") {
      var noQuestionString = search.substring(1)

      // Build an object with the passed parameters
      var parametersObject = noQuestionString.split("&").reduce((tempObject, parameter) => {
        var key = parameter.substring(0, parameter.indexOf("="))
        var value = parameter.substring(parameter.indexOf("=") + 1)
        tempObject[key] = value
        return tempObject
      }, {})
    }

    this.state = {
      confirmationError: false,
      errorMessage: "",
    }

    console.log(parametersObject)
  }


  componentDidMount() {
    const { location, confirmUser } = this.props

    // Register pageview with GA
    ReactGA.pageview(location.pathname);

    confirmUser(
      location.search,
      this.resolveRegister,
      this.rejectRegister
    )
  }

  resolveRegister = () => {
    console.log("confirmation succeeded")
    this.props.history.push(Endpoints.SIGNINPAGE)
  }

  // TODO: This shouldn't forward on reject, but CORS is throwing an error at the moment
  rejectRegister = () => {
    console.log("confirmation failed")
    /*
    this.setState({
      confirmationError: true,
      errorMessage: strings.ERROR_CONFIRMING_USER,
    })
    */
    this.props.history.push(Endpoints.SIGNINPAGE)
  }


  render() {
    return (
      <div id="confirming-email-address">
        <EmailConfirming text={strings.CONFIRMING_EMAIL_PLEASE_WAIT} />
      </div>
    )
  }

}

export default ConfirmEmailPage
