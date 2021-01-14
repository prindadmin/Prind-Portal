import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

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
  Icon
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
    }
  }


  componentDidMount () {
    this.props.init()
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

        <Field
          name="email"
          validate={[Validators.required, Validators.email]}
          component={FormInputs.TextInput}
          placeholder={ Strings.PLACEHOLDER_USERNAME }
          type="email"
        />

        <Field
          name="password"
          validate={[
            Validators.required,
            Validators.maxLength32,
            Validators.isValidPassword
          ]}
          component={FormInputs.PasswordInput}
          placeholder={Strings.PLACEHOLDER_PASSWORD}
          type="password"
        />

        <Field
          name="firstName"
          validate={[Validators.required, Validators.maxLength32]}
          component={FormInputs.TextInput}
          placeholder={Strings.PLACEHOLDER_FIRST_NAME}
        />

        <Field
          name="lastName"
          validate={[Validators.required, Validators.maxLength32]}
          component={FormInputs.TextInput}
          placeholder={Strings.PLACEHOLDER_LAST_NAME}
          type="text"
        />

        <Field
          name="company"
          validate={[Validators.required, Validators.maxLength64]}
          component={FormInputs.TextInput}
          placeholder={Strings.PLACEHOLDER_COMPANY}
          type="text"
        />


        {
          this.state.showSignUpError ?
          <Callout style={{marginBottom: '15px'}} intent='danger' title='Registration failed'>
            <p>{ this.state.errorMessage }</p>
          </Callout> :
          null
        }

        <ButtonGroup fill style={{marginBottom: '15px'}}>
          <Button
            loading={this.props.submitting}
            disabled={this.props.invalid}
            type='submit'
            intent='primary'
            text={Strings.BUTTON_SIGN_UP} />
        </ButtonGroup>

        <p className="forgot-your-password-text" onClick={this.props.toggleVisibleForm}>{Strings.ALREADY_HAVE_AN_ACCOUNT}</p>

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

export default reduxForm({
  form: 'signUp'
})(SignUpBox)
