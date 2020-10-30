import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

import ReactGA from 'react-ga';

import * as Endpoints from '../../endpoints'

import {
  Label,
  Button,
  ButtonGroup,
  Callout,
} from '@blueprintjs/core'

import * as FormInputs from '../common/formInputs'
import * as validators from '../../validators'
import * as state from '../../states'
import * as strings from '../../data/Strings'

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

  componentDidMount() {
    const { location } = this.props
    // Register pageview with GA
    ReactGA.pageview(location.pathname + location.search);
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
            <div>{strings.LOGIN_UNSUCCESSFUL}</div>
          </Callout> :
          null
        }
        <Label>
          <Field
            component={FormInputs.TextInput}
            name="email"
            placeholder={strings.PLACEHOLDER_EMAIL}
            validate={[validators.required, validators.maxLength64, validators.email]}
          />
        </Label>
        <Label>
          <Field
            component={FormInputs.PasswordInput}
            name="password"
            placeholder={strings.PLACEHOLDER_PASSWORD}
            validate={[validators.required, validators.maxLength32]}
          />
        </Label>
        <ButtonGroup fill style={{marginBottom: '15px'}}>
          <Button
            loading={this.props.submitting}
            disabled={this.props.invalid}
            type='submit'
            intent='primary'
            text={strings.BUTTON_LOGIN} />
        </ButtonGroup>
        <ButtonGroup fill style={{marginBottom: '15px'}}>
          <Button
            intent='primary'
            text={strings.BUTTON_NEW_USER}
            onClick={() => {this.props.history.push(Endpoints.SIGNUPPAGE)}} />
        </ButtonGroup>
        <ButtonGroup fill>
          <Button
            text={strings.BUTTON_FORGOT_PASSWORD}
            intent='primary'
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
        {auth.isSignedIn === state.AUTH_SUCCESS ? <Redirect to={this.props.user.currentRoute} /> : this.renderSignIn()}
      </div>
    )
  }
}

export default reduxForm({
  form: 'signIn'
})(SignIn)
