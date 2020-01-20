import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import qs from 'stringquery'
import PropTypes from 'prop-types'

import {
  Label,
  Button,
  ButtonGroup,
  Callout,
  Icon
} from '@blueprintjs/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

import * as FormInputs from '../shared/formInputs'
import * as validators from '../../validators'
import * as state from '../../states'

class ChangePassword extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    auth: PropTypes.object,
    init: PropTypes.func,
    history: PropTypes.object
  }

  changePassword = async values => {
    const query = qs(this.props.location.search)
    values = { ...values, ...query}
    values.email = values.email.toLowerCase()
    await this.props.changePassword(values)
  }

  changePasswordAccounts = async values => {
    const oldPassword = values.oldPassword
    const newPassword = values.password
    await this.props.changePasswordAccounts(oldPassword, newPassword)
  }

  cancelChange = () => {
    this.props.cancelChange()
  }

  renderSuccess () {
    const ico = <FontAwesomeIcon icon={faLock} size='8x' />

    const style = {
      textAlign: 'center'
    }

    return (
      <div className='auth-form' style={style}>
        <Icon icon={ico} />
        <h3>Your password changed. You may proceed.</h3>
        <Button
          className='bim-light-blue'
          intent='primary'
          fill
          text='Back to login page'
          onClick={() => {this.props.history.push('/signin')}}
        />
      </div>
    )
  }

  renderSuccessAccounts () {
    const ico = <FontAwesomeIcon icon={faLock} size='8x' />

    const style = {
      textAlign: 'center'
    }

    return (
      <div className='auth-form' style={style}>
        <Icon icon={ico} />
        <h3>Your password has successfully changed.</h3>
        <Button
          className='bim-light-blue'
          intent='primary'
          fill
          text='Back to account page'
          onClick={this.props.cancelChange}
        />
      </div>
    )
  }

  renderChangePassword() {
    const { handleSubmit, auth } = this.props

    return (
      <form onSubmit={handleSubmit(this.changePassword)} className='auth-form'>
        {
          this.props.submitFailed ?
          <Callout style={{marginBottom: '15px'}} intent='danger'>
            <div>
              {
                auth.error.code === 'ExpiredCodeException'
                  ? 'Your change password link is expired. Please request a new one.'
                  : 'Error: something went wrong. Please try again.'
              }
            </div>
          </Callout> :
          null
        }
        <Label>
          <Field
            component={FormInputs.PasswordInput}
            name="password"
            placeholder='Password'
            validate={[
              validators.required,
              validators.maxLength32
            ]}
          />
        </Label>
        <Label>
          <Field
            component={FormInputs.PasswordInput}
            name="passwordMatch"
            placeholder='Repeat password'
            validate={[
              validators.required,
              validators.passwordMatch,
              validators.isValidPassword
            ]}
          />
        </Label>
        <ButtonGroup fill style={{marginBottom: '15px'}}>
          <Button
            loading={this.props.submitting}
            disabled={this.props.invalid}
            type='submit'
            intent='primary'
            className='bim-light-blue'
            text='Change Password' />
        </ButtonGroup>
      </form>
    )
  }

  renderChangePasswordAccounts() {
    const { handleSubmit, auth } = this.props

    return (
      <form onSubmit={handleSubmit(this.changePasswordAccounts)} className='auth-form'>
        {
          this.props.submitFailed ?
          <Callout style={{marginBottom: '15px'}} intent='danger'>
            <div>
              {
                auth.error.code === 'ExpiredCodeException'
                  ? 'Your change password link is expired. Please request a new one.'
                  : 'Error: something went wrong. Please try again.'
              }
            </div>
          </Callout> :
          null
        }
        <Label>
          <Field
            component={FormInputs.PasswordInput}
            name="oldPassword"
            placeholder='Old Password'
            validate={[
              validators.required,
              validators.maxLength32
            ]}
          />
        </Label>
        <Label>
          <Field
            component={FormInputs.PasswordInput}
            name="password"
            placeholder='New Password'
            validate={[
              validators.required,
              validators.maxLength32
            ]}
          />
        </Label>
        <Label>
          <Field
            component={FormInputs.PasswordInput}
            name="passwordMatch"
            placeholder='Confirm New Password'
            validate={[
              validators.required,
              validators.passwordMatch,
              validators.isValidPassword
            ]}
          />
        </Label>
        <ButtonGroup fill style={{marginBottom: '15px'}}>
          <Button
            loading={this.props.submitting}
            disabled={this.props.invalid}
            type='submit'
            intent='primary'
            className='bim-light-blue'
            text='Change Password'
          />
        </ButtonGroup>
        <ButtonGroup fill>
          <Button
            type='submit'
            intent='primary'
            className='bim-dark-blue'
            text='Cancel Password Change'
            onClick={this.props.cancelChange}
          />
        </ButtonGroup>
      </form>
    )
  }

  render () {
    const { auth, changingPassword } = this.props

    return (
      <div className='row accounts-change-password justify-content-center full-height'>
        {auth.hasChangedPassword === state.AUTH_SUCCESS
          ?  changingPassword ?
              this.renderSuccessAccounts() : this.renderSuccess()
           : (
           auth.isSignedIn===state.AUTH_SUCCESS ?
            this.renderChangePasswordAccounts() : this.renderChangePassword()
          )
        }
      </div>
    )
  }
}

export default reduxForm({
  form: 'changePassword'
})(ChangePassword)
