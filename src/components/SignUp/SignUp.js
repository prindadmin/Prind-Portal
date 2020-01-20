import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import * as Endpoints from '../../endpoints'

import {
  Label,
  Button,
  ButtonGroup,
  Callout,
  Icon
} from '@blueprintjs/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import * as FormInputs from '../shared/formInputs'
import * as validators from '../../validators'
import * as state from '../../states'

class SignUp extends Component {
  signUp = async (values) => {
    values.email = values.email.toLowerCase()
    await this.props.signUp(values)
  }

  signUpForm = () => {
    const { handleSubmit, auth } = this.props //passing this.props to these consts
    return (
      <form onSubmit={handleSubmit(this.signUp)} className='auth-form'>
        {
          this.props.submitFailed ?
          <Callout style={{marginBottom: '15px'}} intent='danger' title='Registration failed'>
            <div>{auth.error.message}</div>
          </Callout> :
          null
        }
        <Label>
          <Field
            name="firstName"
            validate={[validators.required, validators.maxLength32]}
            component={FormInputs.TextInput}
            placeholder='First Name'
          />
        </Label>
        <Label>
          <Field
            name="lastName"
            validate={[validators.required, validators.maxLength32]}
            component={FormInputs.TextInput}
            placeholder='Last Name'
            type="text"
          />
        </Label>
        <Label>
          <Field
            name="email"
            validate={[validators.required, validators.maxLength64, validators.email]}
            component={FormInputs.TextInput}
            placeholder='Email Address'
            type="email"
          />
        </Label>
        <Label>
          <Field
            name="password"
            validate={[
              validators.required,
              validators.maxLength32,
              validators.isValidPassword
            ]}
            component={FormInputs.PasswordInput}
            placeholder='Password'
            type="password"
          />
        </Label>
        <ButtonGroup fill style={{marginBottom: '15px'}}>
          <Button
            loading={this.props.submitting}
            disabled={this.props.invalid}
            type='submit'
            intent='primary'
            className='bim-light-blue'
            text='Create Account' />
        </ButtonGroup>
        <ButtonGroup fill>
          <Button
            text='Cancel Sign Up'
            intent='primary'
            className='bim-dark-blue'
            onClick={() => {this.props.history.push(Endpoints.defaultPage)}}
          />
        </ButtonGroup>
      </form>
    )
  }

  signedUp = () => {
    const ico = <FontAwesomeIcon icon={faEnvelope} size='8x' />

    const style = {
      textAlign: 'center'
    }

    return (
      <div className='auth-form' style={style}>
        <Icon icon={ico} />
        <h3>We've sent you an email to verify your account. Please check your email inbox.</h3>
        <Button
          className='bim-light-blue'
          intent='primary'
          fill
          text='Back to login page'
          onClick={() => {this.props.history.push(Endpoints.signInPage)}}
        />
      </div>
    )
  }

  render() {
    const { auth } = this.props

    return (
      <div id='signup' className='row align-items-center justify-content-center'>
        {auth.hasSignedUp === state.AUTH_UNKNOWN
          ? this.signUpForm()
          : this.signedUp()}
      </div>
    )
  }
}

export default reduxForm({
  form: 'signUp'
})(SignUp)
