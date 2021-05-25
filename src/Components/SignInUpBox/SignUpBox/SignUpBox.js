import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Data
import * as Strings from '../../../Data/Strings'
import * as States from '../../../States'

// Components
import CanUseWebP from '../../../Functions/CheckIfWebpSupported'
/*
import {
  Callout,
} from '@blueprintjs/core'
*/

// TODO: FUTURE: Test the signing up functionality
// TODO: FUTURE: Add styling to components

export class SignUpBox extends Component {
  static propTypes = {
    toggleVisibleForm: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    init: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      showSignUpCompleted: false,
      showSignUpError: false,
      errorMessage: null,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      company: '',
    }
  }


  componentDidMount () {
    this.props.init()
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }


  onSignUpFormSubmit = (e) => {
    e.preventDefault();

    const { email, password, firstName, lastName, company } = this.state
    const userDetails = {
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
      company
    }

    this.setState({
      showSignUpCompleted: false,
      showSignUpError: false,
      errorMessage: null,
    })

    this.props.signUp(userDetails, this.signUpSuccessful, this.signUpFailed)
  }

  signUpSuccessful = (result) => {
    //console.log("sign up successful")
    this.setState({
      showSignUpCompleted: true,
    })
  }

  signUpFailed = (result) => {
    //console.log(result)
    this.setState({
        showSignUpError: true,
        errorMessage: result.message,
    })
  }


  getLogo = () => {
    const logoLocation = CanUseWebP() ? "/images/logos/prind-tech-logo.webp" : "/images/logos/prind-tech-logo.png"
    return (
      <React.Fragment>
        <div className="logo-container">
          <a href="https://prind.tech" target="_blank" rel="noopener noreferrer"><img src={logoLocation} alt="Prin-D Technology logo"></img></a> 
        </div>
        { !this.state.showSignUpCompleted ?
          <React.Fragment>
            <div className="welcome-text-heading">
              { Strings.WELCOME_TEXT }
            </div>
            <div className="welcome-text-body">
              { Strings.PLEASE_SIGN_UP_TEXT }
            </div>
          </React.Fragment> : null
        }
      </React.Fragment>
    )
  }

  // FUTURE: Add icons to username and password boxes

  getSignUpForm = () => {
    return (
      <form className="sign-up-form form" onSubmit={(e) => e.preventDefault()}>

        <input
          id="email"
          name="email"
          type="text"
          placeholder={ Strings.PLACEHOLDER_EMAIL }
          value={this.state.email}
          onChange={this.handleInputChange}
          className={ this.state.email === '' ? "default" : "filled" }/>

        <input
          id="password"
          name="password"
          type="password"
          placeholder={ Strings.PLACEHOLDER_PASSWORD }
          value={this.state.password}
          onChange={this.handleInputChange}
          className={ this.state.password === '' ? "default" : "filled" }/>

        <input
          id="firstName"
          name="firstName"
          type="text"
          placeholder={ Strings.PLACEHOLDER_FIRST_NAME }
          value={this.state.firstName}
          onChange={this.handleInputChange}
          className={ this.state.firstName === '' ? "default" : "filled" }/>

        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder={ Strings.PLACEHOLDER_LAST_NAME }
          value={this.state.lastName}
          onChange={this.handleInputChange}
          className={ this.state.lastName === '' ? "default" : "filled" }/>

        <input
          id="company"
          name="company"
          type="text"
          placeholder={ Strings.PLACEHOLDER_COMPANY }
          value={this.state.company}
          onChange={this.handleInputChange}
          className={ this.state.company === '' ? "default" : "filled" }/>


        {
          this.state.showSignUpError ?
          <div className='error-callout'>
            <p>{ this.state.errorMessage }</p>
          </div> :
          null
        }
        <div className='spacer' />

        <input
          id="signUpButton"
          type="submit"
          value={ Strings.BUTTON_SIGN_UP }
          className="submit-button"
          onClick={this.onSignUpFormSubmit}/>

        <div className='spacer' />

        <p className="sign-up-in-text" onClick={(e) => this.props.toggleVisibleForm(States.SIGNINFORM)}>{Strings.ALREADY_HAVE_AN_ACCOUNT}</p>

      </form>
    )
  }

  showSignUpNotCompleted = () => {
    return this.getSignUpForm()
  }


  showSignUpCompleted = () => {
    return(
      <p>{ Strings.THANK_YOU_FOR_SIGNING_UP }</p>
    )
  }

  render () {
    return (
      <React.Fragment>
        { this.getLogo() }
        { this.state.showSignUpCompleted ? this.showSignUpCompleted() : this.showSignUpNotCompleted() }
      </React.Fragment>
    )
  }
}

export default SignUpBox
