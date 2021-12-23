import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classes from '../SignInUpBox.module.css'

// Data
import * as STRINGS from '../../../Data/Strings'
import * as States from '../../../States'

// Components
//import CanUseWebP from '../../../Functions/CheckIfWebpSupported'


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
      errorMessage: "",
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
    const logoLocation = "/images/logos/prin-d-logo-white.png"
    return (
      <React.Fragment>
        <div className="logo-container">
          <a href="https://prind.tech" target="_blank" rel="noopener noreferrer"><img src={logoLocation} alt="Prin-D Technology logo"></img></a>
        </div>
      </React.Fragment>
    )
  }

  // FUTURE: Add icons to username and password boxes

  getSignUpForm = () => {
    return (
      <form className={classes.form} onSubmit={(e) => e.preventDefault()}>

        <label htmlFor='email'>{STRINGS.PLACEHOLDER_EMAIL}</label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder={ STRINGS.PLACEHOLDER_EMAIL }
          value={this.state.email}
          onChange={this.handleInputChange}
          className={ this.state.email === '' ? "default" : "filled" }/>

        <label htmlFor='password'>{STRINGS.PLACEHOLDER_PASSWORD}</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder={ STRINGS.PLACEHOLDER_PASSWORD }
          value={this.state.password}
          onChange={this.handleInputChange}
          className={ this.state.password === '' ? "default" : "filled" }/>


        <label htmlFor='firstName'>{STRINGS.PLACEHOLDER_FIRST_NAME}</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          placeholder={ STRINGS.PLACEHOLDER_FIRST_NAME }
          value={this.state.firstName}
          onChange={this.handleInputChange}
          className={ this.state.firstName === '' ? "default" : "filled" }/>

        <label htmlFor='lastName'>{STRINGS.PLACEHOLDER_LAST_NAME}</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder={ STRINGS.PLACEHOLDER_LAST_NAME }
          value={this.state.lastName}
          onChange={this.handleInputChange}
          className={ this.state.lastName === '' ? "default" : "filled" }/>

        <label htmlFor='company'>{STRINGS.PLACEHOLDER_COMPANY}</label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder={ STRINGS.PLACEHOLDER_COMPANY }
          value={this.state.company}
          onChange={this.handleInputChange}
          className={ this.state.company === '' ? "default" : "filled" }/>


        {
          this.state.showSignUpError ?
          <div className={classes.errorText}>
            <p>{ this.state.errorMessage }</p>
          </div> :
          null
        }

        <input
          id="signUpButton"
          type="submit"
          value={ STRINGS.BUTTON_SIGN_UP }
          className={`${classes.button} ${classes.submitButton}`}
          onClick={this.onSignUpFormSubmit}/>

        <div className='spacer' />

        <p className={classes.linkText} onClick={(e) => this.props.toggleVisibleForm(States.SIGNINFORM)}>{STRINGS.ALREADY_HAVE_AN_ACCOUNT}</p>

      </form>
    )
  }

  showSignUpNotCompleted = () => {
    return this.getSignUpForm()
  }


  showSignUpCompleted = () => {
    return(
      <p>{ STRINGS.THANK_YOU_FOR_SIGNING_UP }</p>
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
