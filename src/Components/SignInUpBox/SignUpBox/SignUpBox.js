import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Data
import * as Strings from '../../../Data/Strings'
import * as States from '../../../States'

// Components
import { CanUseWebP } from '../../Common/CheckIfWebpSupported'
import {
  Callout,
} from '@blueprintjs/core'

// TODO: Test the signing up functionality
// TODO: Add styling to components

export class SignUpBox extends Component {
  static propTypes = {
    toggleVisibleForm: PropTypes.func.isRequired,
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
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  onSignUpFormSubmit = (e) => {
    e.preventDefault();

    const userDetails = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      firstName: e.target.elements.firstName.value,
      lastName: e.target.elements.lastName.value,
      company: e.target.elements.company.value,
    }

    this.setState({
      showSignUpCompleted: false,
      showSignUpError: false,
      errorMessage: null,
    })

    userDetails.email = userDetails.email.toLowerCase()
    this.props.signUp(userDetails, this.signUpSuccessful, this.signUpFailed)
  }

  signUpSuccessful = (result) => {
    console.log("sign up successful")

    this.setState({
      showSignUpCompleted: true,
    })
  }

  signUpFailed = (result) => {
    console.log(result)

    this.setState({
        showSignUpError: true,
        errorMessage: result.message,
    })
  }




  getLogo = () => {

    const logoLocation = CanUseWebP ? "/images/logos/prind-tech-logo.webp" : "/images/logos/prind-tech-logo.png"

    return (
      <React.Fragment>
        <div className="logo-container">
          <a href="https://prind.tech" target="_blank" rel="noopener noreferrer"><img src={logoLocation} alt="Prin D Tech logo"></img></a>
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
      <form className="sign-up-form form" onSubmit={this.onSignUpFormSubmit}>

        <input
          id="email"
          name="email"
          type="text"
          placeholder={ Strings.PLACEHOLDER_EMAIL }
          value={this.state.email}
          onChange={this.handleInputChange}
          className={ this.state.email === null ? "default" : "filled" }/>

        <input
          id="password"
          name="password"
          type="password"
          placeholder={ Strings.PLACEHOLDER_PASSWORD }
          value={this.state.password}
          onChange={this.handleInputChange}
          className={ this.state.password === null ? "default" : "filled" }/>

        <input
          id="firstName"
          name="firstName"
          type="text"
          placeholder={ Strings.PLACEHOLDER_FIRST_NAME }
          value={this.state.firstName}
          onChange={this.handleInputChange}
          className={ this.state.firstName === null ? "default" : "filled" }/>

        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder={ Strings.PLACEHOLDER_LAST_NAME }
          value={this.state.lastName}
          onChange={this.handleInputChange}
          className={ this.state.lastName === null ? "default" : "filled" }/>

        <input
          id="company"
          name="company"
          type="text"
          placeholder={ Strings.PLACEHOLDER_COMPANY }
          value={this.state.company}
          onChange={this.handleInputChange}
          className={ this.state.company === null ? "default" : "filled" }/>


        {
          this.state.showSignUpError ?
          <Callout style={{marginBottom: '15px'}} intent='danger' title='Registration failed'>
            <p>{ this.state.errorMessage }</p>
          </Callout> :
          null
        }
        <div className='spacer' />

        <input
          type="submit"
          value={ Strings.BUTTON_SIGN_UP }
          className="submit-button" />

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
