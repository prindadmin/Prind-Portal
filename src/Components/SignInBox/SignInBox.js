import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga';

// Data
import * as Endpoints from '../../Data/Endpoints'
import * as Strings from '../../Data/Strings'
import * as FormInputs from '../Common/formInputs'
import * as Validators from '../../Validators'
import * as state from '../../States'

// Components
import { CanUseWebP } from '../Common/CheckIfWebpSupported'

import {
  Label,
  Button,
  ButtonGroup,
  Callout,
} from '@blueprintjs/core'

// FUTURE: Make the "Click here" text change the mouse icon like a real link
// FUTURE: Add icons to username and password boxes

export class SignInBox extends Component {
  static propTypes = {
    toggleVisibleForm: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      showSignInError: false,
    }
  }


  componentDidMount () {
    this.props.init()
    ReactGA.pageview(this.props.location.pathname)
  }

  componentDidUpdate() {
    if (this.props.auth.isSignedIn === state.AUTH_SUCCESS) {
      //this.props.reset()
    }
  }

  forgotPasswordClicked = () => {
    console.log("forgot password was clicked")
    // TODO: Show forgot password screen
  }


  signIn = (e) => {
    e.preventDefault();

    const userDetails = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value
    }

    // Remove the error if it is showing
    this.setState({
      showErrorSigningIn: false,
    })

    // Lower the case of the email address to ensure it is always lower case
    userDetails.email = userDetails.email.toLowerCase()

    // Request sign in
    this.props.signIn(userDetails, this.signInSuccessful, this.signInFailed)
  }


  signInSuccessful = (result) => {
    console.log("sign in successful")
    this.props.history.push(this.props.user.currentRoute)
  }


  signInFailed = (result) => {
    console.log(result)
    this.setState({
        showErrorSigningIn: true,
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

  getSignInForm = () => {
    return (
      <form className="sign-in-form form" onSubmit={this.signIn}>

        <Label>
          <Field
            component={FormInputs.TextInput}
            name="email"
            placeholder={Strings.PLACEHOLDER_EMAIL}
            validate={[Validators.required, Validators.email]}
          />
        </Label>
        <Label>
          <Field
            component={FormInputs.PasswordInput}
            name="password"
            placeholder={Strings.PLACEHOLDER_PASSWORD}
            validate={[Validators.required, Validators.maxLength32]}
          />
        </Label>



        <p className="forgot-your-password-text" onClick={this.forgotPasswordClicked}>{Strings.BUTTON_FORGOT_PASSWORD}</p>

        {
          this.state.showErrorSigningIn ?
          <Callout style={{marginBottom: '15px'}} intent='danger'>
            <p>{ this.props.auth.error.message }</p>
          </Callout> :
          null
        }

        <ButtonGroup fill style={{marginBottom: '15px'}}>
          <Button
            loading={this.props.submitting}
            disabled={this.props.invalid}
            type='submit'
            intent='primary'
            text={Strings.BUTTON_LOGIN} />
        </ButtonGroup>

        <p className="forgot-your-password-text" onClick={this.props.toggleVisibleForm}>{Strings.DONT_HAVE_AN_ACCOUNT}</p>

      </form>
    )
  }


  render () {
    return (
      <React.Fragment>
        { this.getLogo() }
        { this.getSignInForm() }
      </React.Fragment>
    )
  }
}
export default reduxForm({
  form: 'signIn'
})(SignInBox)
