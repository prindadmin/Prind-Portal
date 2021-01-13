import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'

// Components
const SignUpBox  = lazy(() => import('../SignUpBox'));
const SignInBox  = lazy(() => import('../SignInBox'));

// FUTURE: Make the "Click here" text change the mouse icon like a real link

export class SignInUpBox extends Component {
  static propTypes = {
    isSignIn: PropTypes.bool
  }


  constructor(props) {
    super()

    var signInShown = false

    if(props.isSignIn !== undefined) {
      signInShown = props.isSignIn
    }


    this.state = {
      showSignInForm: signInShown,
    }
  }

  showSignInForm = () => {
    return (
      <SignInBox
        toggleVisibleForm={this.toggleVisibleForm}
        />
    )
  }

  showSignUpForm = () => {
    return (
      <SignUpBox
        toggleVisibleForm={this.toggleVisibleForm}
        />
    )
  }

  toggleVisibleForm = () => {
    this.setState({
      showSignInForm: !this.state.showSignInForm,
    })
  }

  render () {

    return (
      <div id='component-sign-in-up-box'>
        <div className="component-sign-in-up-box-content-container">
            {
              this.state.showSignInForm ?
              this.showSignInForm() :
              this.showSignUpForm()
            }
        </div>
      </div>
    )
  }
}

export default SignInUpBox
