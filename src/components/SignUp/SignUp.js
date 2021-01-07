import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import ReactGA from 'react-ga';

import * as Endpoints from '../../Data/Endpoints'

import {
  Label,
  Button,
  ButtonGroup,
  Callout,
  Icon
} from '@blueprintjs/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import * as FormInputs from '../common/formInputs'
import * as Validators from '../../Validators'
import * as state from '../../States'
import * as Strings from '../../Data/Strings'

class SignUp extends Component {
  signUp = async (values) => {
    values.email = values.email.toLowerCase()
    await this.props.signUp(values)
  }


  componentDidMount() {
    const { location } = this.props
    // Register pageview with GA
    ReactGA.pageview(location.pathname + location.search);
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
            validate={[Validators.required, Validators.maxLength32]}
            component={FormInputs.TextInput}
            placeholder={Strings.PLACEHOLDER_FIRST_NAME}
          />
        </Label>
        <Label>
          <Field
            name="lastName"
            validate={[Validators.required, Validators.maxLength32]}
            component={FormInputs.TextInput}
            placeholder={Strings.PLACEHOLDER_LAST_NAME}
            type="text"
          />
        </Label>
        <Label>
          <Field
            name="email"
            validate={[Validators.required, Validators.maxLength64, Validators.email]}
            component={FormInputs.TextInput}
            placeholder='Email Address'
            type="email"
          />
        </Label>
        <Label>
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
        </Label>
        <ButtonGroup fill style={{marginBottom: '15px'}}>
          <Button
            loading={this.props.submitting}
            disabled={this.props.invalid}
            type='submit'
            intent='primary'
            text={Strings.BUTTON_CREATE_ACCOUNT} />
        </ButtonGroup>
        <ButtonGroup fill>
          <Button
            text={Strings.BUTTON_CANCEL_SIGN_UP}
            intent='primary'
            onClick={() => {this.props.history.push(Endpoints.DEFAULTPAGE)}}
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
        <h3>{Strings.PLEASE_VERIFY_ACCOUNT}</h3>
        <Button
          intent='primary'
          fill
          text={Strings.BUTTON_BACK_TO_LOGIN_PAGE}
          onClick={() => {this.props.history.push(Endpoints.SIGNINPAGE)}}
        />
      </div>
    )
  }

  render() {
    const { auth } = this.props

    return (
      <div id='signup' className='row align-items-center justify-content-center'>
        <div className='sign-up-container'>
          {
            auth.hasSignedUp === state.AUTH_UNKNOWN
            ? this.signUpForm()
            : this.signedUp()
          }
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'signUp'
})(SignUp)
