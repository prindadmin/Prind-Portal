import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Data
import * as Strings from '../../../Data/Strings'
import * as FormOptions from '../../../States'
import * as ComponentStates from '../../ComponentStates'

// Components
import CanUseWebP from '../../../Functions/CheckIfWebpSupported'

// TODO: FUTURE: Make the "Click here" text change the mouse icon like a real link
// TODO: FUTURE: Add icons to username and password boxes

export class SignInBox extends Component {
  static propTypes = {
    toggleVisibleForm: PropTypes.func.isRequired,
    username: PropTypes.string,
    signIn: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    user: PropTypes.shape({
      currentRoute: PropTypes.string.isRequired
    }).isRequired
  }

  constructor(props) {
    super()
    this.state = {
      email: props.username === undefined ? '' : props.username,
      password: '',
      errorMessage: '',
      state: ComponentStates.QUIESCENT,
    }
  }

  componentDidMount () {
  }

  handleInputChange = (event) => {
    //console.log(event)
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  forgotPasswordClicked = () => {
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
      state: ComponentStates.LOADING,
      errorMessage: '',
    })

    // Lower the case of the email address to ensure it is always lower case
    userDetails.email = userDetails.email.toLowerCase()

    // Request sign in
    this.props.signIn(userDetails, this.signInSuccessful, this.signInFailed)
  }


  signInSuccessful = (result) => {
    //console.log("sign in successful")
    this.props.history.push(this.props.user.currentRoute)
  }


  signInFailed = (result) => {
    //console.log(result)
    this.setState({
        state: ComponentStates.SIGN_IN_FAILED,
        errorMessage: result.message,
    })
  }

  getLogo = () => {
    const logoLocation = CanUseWebP ? "/images/logos/prind-tech-logo.webp" : "/images/logos/prind-tech-logo.png"

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

  getSpinner = () => {
    return (
      <React.Fragment>
        <div className='lds-ring'><div></div><div></div><div></div><div></div></div>
      </React.Fragment>
    )
  }

  getErrorCallout = () => {
    return (
      <React.Fragment>
        <div className='error-callout'>
          <p>{ this.state.errorMessage }</p>
        </div>
        <div className='spacer' />
      </React.Fragment>
    )
  }

  getSignInForm = () => {
    return (
      <form className="sign-in-form">

        <input
          id="email"
          name="email"
          type="email"
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

        <p className="forgot-your-password-text" onClick={this.forgotPasswordClicked}>{Strings.BUTTON_FORGOT_PASSWORD}</p>

        <div className='spacer' />
        {
          this.state.state === ComponentStates.SIGN_IN_FAILED ? this.getErrorCallout() : null
        }

        <input
          id="signInButton"
          name="signInButton"
          type="submit"
          value={ Strings.BUTTON_LOGIN }
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
          this.state.state === ComponentStates.QUIESCENT ? this.getSignInForm() : null
        }
        {
          this.state.state === ComponentStates.LOADING ? this.getSpinner() : null
        }
        {
          this.state.state === ComponentStates.SIGN_IN_FAILED ? this.getSignInForm() : null
        }
      </React.Fragment>
    )
  }
}
export default SignInBox
