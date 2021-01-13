import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Data
import * as Strings from '../../Data/Strings'

// Components
import { CanUseWebP } from '../Common/CheckIfWebpSupported'
import { Alert, Form, Row, FormGroup, Button } from 'react-bootstrap'
import ExtractFormDataToObject from '../Common/ExtractFormDataToObject'

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
  }

  forgotPasswordClicked = () => {
    console.log("forgot password was clicked")
  }


  onSignInFormSubmit = (e) => {
    e.preventDefault();

    this.setState({
      showErrorSigningIn: false,
    })

    const userDetails = ExtractFormDataToObject(e)
    this.props.signIn(userDetails, this.signInSuccessful, this.signInFailed)
  }

  signInSuccessful = (result) => {
    console.log("sign in successful")
  }

  signInFailed = (result) => {
    console.log(result)

    this.setState({
        showErrorSigningIn: true,
    })
  }

  getLogo = () => {

    const logoLocation = CanUseWebP ? "/images/logos/buildingim-logo.webp" : "/images/logos/buildingim-logo.png"

    return (
      <React.Fragment>
        <div className="logo-container">
          <a href="https://buildingim.com" target="_blank" rel="noopener noreferrer"><img src={logoLocation} alt="BuildingIM logo"></img></a>
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
      <Form className="sign-in-form form" onSubmit={this.onSignInFormSubmit}>

        <Row className="form-row">
          <FormGroup className="form-group col">
            <Form.Control type="email" className="form-control one-line" id="inputUsername" placeholder={ Strings.USERNAME } />
            <Form.Control type="password" className="form-control one-line" id="inputPassword" placeholder={ Strings.PASSWORD } />
          </FormGroup>
        </Row>

        <Row className="form-row with-space-below">
          <p className="forgot-your-password-text" onClick={this.forgotPasswordClicked}>{Strings.FORGOT_YOUR_PASSWORD}</p>
        </Row>

        {
          this.state.showErrorSigningIn ? <Alert variant="danger">
            <p>{ this.props.auth.error.message }</p>
          </Alert> : null
        }

        <Button type="submit" className="btn btn-primary">{ Strings.BUTTON_CONTINUE }</Button>

        <Row className="form-row">
          <p className="forgot-your-password-text" onClick={this.props.toggleVisibleForm}>{Strings.DONT_HAVE_AN_ACCOUNT}</p>
        </Row>
      </Form>
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

export default SignInBox
