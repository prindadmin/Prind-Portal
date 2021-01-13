import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Data
import * as Strings from '../../Data/Strings'

// Components
import { CanUseWebP } from '../Common/CheckIfWebpSupported'
import { Alert, Form, Row, FormGroup, Button } from 'react-bootstrap'
import ExtractFormDataToObject from '../Common/ExtractFormDataToObject'

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

    this.setState({
      showSignUpCompleted: false,
      showSignUpError: false,
      errorMessage: null,
    })

    const userDetails = ExtractFormDataToObject(e)
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
        showErrorSigningUp: true,
        errorMessage: result.message,
    })
  }




  getLogo = () => {

    const logoLocation = CanUseWebP ? "/images/logos/buildingim-logo.webp" : "/images/logos/buildingim-logo.png"

    return (
      <React.Fragment>
        <div className="logo-container">
          <a href="https://buildingim.com" target="_blank" rel="noopener noreferrer"><img src={logoLocation} alt="BuildingIM logo"></img></a>
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
      <Form className="sign-up-form form" onSubmit={this.onSignUpFormSubmit}>

        <Row className="form-row with-space-below">
          <FormGroup className="form-group col">
            <Form.Control type="email" className="form-control one-line" id="inputEmail" placeholder={ Strings.USERNAME } />
            <Form.Control type="password" className="form-control one-line" id="inputPassword" placeholder={ Strings.PASSWORD } />
          </FormGroup>
        </Row>

        <Row className="form-row with-space-below">
          <FormGroup className="form-group col">
            <Form.Control type="text" className="form-control one-line" id="inputFirstName" placeholder={ Strings.FIRST_NAME } />
            <Form.Control type="text" className="form-control one-line" id="inputLastName" placeholder={ Strings.LAST_NAME } />
            <Form.Control type="text" className="form-control one-line" id="inputCompany" placeholder={ Strings.COMPANY } />
          </FormGroup>
        </Row>

        {
          this.state.showSignUpError ? <Alert variant="danger">
            <p>{ this.state.errorMessage }</p>
          </Alert> : null
        }

        <Button type="submit" className="btn btn-primary">{ Strings.BUTTON_SIGN_UP }</Button>

        <Row className="form-row">
          <p className="forgot-your-password-text" onClick={this.props.toggleVisibleForm}>{Strings.ALREADY_HAVE_AN_ACCOUNT}</p>
        </Row>

      </Form>
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
