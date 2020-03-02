import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

import * as Endpoints from '../../endpoints'

import {
  Label,
  Button,
  ButtonGroup,
  Callout,
} from '@blueprintjs/core'

// TODO: Use strings file here

import * as FormInputs from '../common/formInputs'
import * as validators from '../../validators'
import * as state from '../../states'

class SignIn extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    auth: PropTypes.object,
    init: PropTypes.func,
    history: PropTypes.object
  }

  signIn = async values => {
    values.email = values.email.toLowerCase()
    await this.props.signIn(values)
  }

  componentDidUpdate() {
    if (this.props.auth.isSignedIn === state.AUTH_SUCCESS) {
      this.props.reset()
    }
  }

  renderSignIn() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.signIn)} className='auth-form'>
        {
          this.props.submitFailed ?
          <Callout style={{marginBottom: '15px'}} intent='danger'>
            <div>Login unsuccessful, please check your email address and password</div>
          </Callout> :
          null
        }
        <Label>
          <Field
            component={FormInputs.TextInput}
            name="email"
            placeholder='Email'
            validate={[validators.required, validators.email, validators.maxLength32]}
          />
        </Label>
        <Label>
          <Field
            component={FormInputs.PasswordInput}
            name="password"
            placeholder='Password'
            validate={[validators.required, validators.maxLength32]}
          />
        </Label>
        <ButtonGroup fill style={{marginBottom: '15px'}}>
          <Button
            loading={this.props.submitting}
            disabled={this.props.invalid}
            type='submit'
            intent='primary'
            className='bim-light-blue'
            text='Login' />
        </ButtonGroup>
        <ButtonGroup fill style={{marginBottom: '15px'}}>
          <Button
            intent='primary'
            className='bim-light-blue'
            text='New User? Create Account'
            onClick={() => {this.props.history.push(Endpoints.SIGNUPPAGE)}} />
        </ButtonGroup>
        <ButtonGroup fill>
          <Button
            text='Forgot Password'
            intent='primary'
            className='bim-dark-blue'
            onClick={() => {this.props.history.push('/forgot-password')}}
          />
        </ButtonGroup>
      </form>
    )
  }

  render () {
    const { auth } = this.props
    return (
      <div id='signin' className='row align-items-center justify-content-center'>
        {auth.isSignedIn === state.AUTH_SUCCESS ? <Redirect to={this.props.user.route} /> : this.renderSignIn()}
      </div>
    )
  }
}

export default reduxForm({
  form: 'signIn'
})(SignIn)
