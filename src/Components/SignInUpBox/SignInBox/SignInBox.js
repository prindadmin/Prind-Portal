import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Data
import * as Strings from '../../../Data/Strings'
import * as FormOptions from '../../../States'
import * as ComponentState from '../States'

// Components
import { CanUseWebP } from '../../Common/CheckIfWebpSupported'

import {
  Callout,
} from '@blueprintjs/core'

// TODO: FUTURE: Make the "Click here" text change the mouse icon like a real link
// TODO: FUTURE: Add icons to username and password boxes

export class SignInBox extends Component {
  static propTypes = {
    toggleVisibleForm: PropTypes.func.isRequired,
    username: PropTypes.string,
  }

  constructor(props) {
    super()
    const email = props.username !== undefined ? props.username : ''
    this.state = {
      email,
      password: '',
      errorMessage: '',
      state: ComponentState.QUIESCENT,
    }
  }

  componentDidMount () {
  }

  handleInputChange = (event) => {
    //console.log(event)
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  forgotPasswordClicked = () => {
    console.log("forgot password was clicked")
    this.props.toggleVisibleForm(FormOptions.FORGOTPASSWORDFORM)
  }


  signIn = () => {
    //e.preventDefault();

    const userDetails = {
      email: this.state.email,
      password: this.state.password
    }

    // Remove the error if it is showing
    this.setState({
      state: ComponentState.LOADING,
      errorMessage: '',
    })

    // Lower the case of the email address to ensure it is always lower case
    userDetails.email = userDetails.email.toLowerCase()

    // Request sign in
    this.props.signIn(userDetails, this.signInSuccessful, this.signInFailed)
  }


  signInSuccessful = (result) => {
    console.log("sign in successful")
    this.setState({
      state: ComponentState.SIGN_IN_SUCCESS,
    })
    this.props.history.push(this.props.user.currentRoute)
  }


  signInFailed = (result) => {
    console.log(result)
    this.setState({
        state: ComponentState.SIGN_IN_FAILED,
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
        <div className="welcome-text-heading">
          { Strings.WELCOME_TEXT }
        </div>
        <div className="welcome-text-body">
          { Strings.PLEASE_SIGN_IN_TEXT }
        </div>
      </React.Fragment>
    )
  }

  getSpinner = () => {
    return (
      <React.Fragment>
        <div className='lds-ring'><div></div><div></div><div></div><div></div></div>
      </React.Fragment>
    )
  }

  getSignInForm = () => {
    return (
      <form className="sign-in-form form">

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

        <p className="forgot-your-password-text" onClick={this.forgotPasswordClicked}>{Strings.BUTTON_FORGOT_PASSWORD}</p>

        <div className='spacer' />
        {
          this.state.state === ComponentState.SIGN_IN_FAILED ?
          <Callout style={{marginBottom: '15px'}} intent='danger'>
            <p>{ this.state.errorMessage }</p>
          </Callout> :
          null
        }

        <input
          id="signInButton"
          name="signInButton"
          type="submit"
          value={ Strings.BUTTON_LOGIN }
          className="submit-button"
          onClick={(e) => this.signIn(e)}/>

        <div className='spacer' />

        <p className="sign-up-in-text" onClick={(e) => this.props.toggleVisibleForm(FormOptions.SIGNUPFORM)}>{Strings.DONT_HAVE_AN_ACCOUNT}</p>

      </form>
    )
  }


  render () {
    return (
      <React.Fragment>
        { this.getLogo() }
        {
          this.state.state === ComponentState.QUIESCENT ? this.getSignInForm() : null
        }
        {
          this.state.state === ComponentState.LOADING ? this.getSpinner() : null
        }
        {
          this.state.state === ComponentState.SIGN_IN_FAILED ? this.getSignInForm() : null
        }
      </React.Fragment>
    )
  }
}
export default SignInBox
