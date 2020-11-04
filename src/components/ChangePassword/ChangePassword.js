import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import qs from 'stringquery'
import PropTypes from 'prop-types'

import ReactGA from 'react-ga';

import {
  Label,
  Button,
  ButtonGroup,
  Callout,
  Icon
} from '@blueprintjs/core'

import ItemIcon from '../common/ItemIcon'

import * as FormInputs from '../common/formInputs'
import * as Validators from '../../Validators'
import * as state from '../../States'

// TODO: Implement strings file here

class ResetPassword extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    setNewPassword: PropTypes.func.isRequired,
    auth: PropTypes.object,
    init: PropTypes.func,
    history: PropTypes.object
  }

  componentDidMount () {
    // Register pageview with GA
    ReactGA.pageview(this.props.location.pathname + this.props.location.search);
  }


  resetPassword = async values => {
    const query = qs(this.props.location.search)

    console.log(query)

    values = { ...values, ...query}
    //values.email = values.email.toLowerCase()
    await this.props.setNewPassword(values)
  }

  renderSuccess () {
    const ico = <ItemIcon icon="lock" size='8x' />

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

  renderResetPassword() {
    const { handleSubmit, auth } = this.props

    return (
      <form onSubmit={handleSubmit(this.resetPassword)} className='auth-form'>
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
              Validators.required,
              Validators.maxLength32
            ]}
          />
        </Label>
        <Label>
          <Field
            component={FormInputs.PasswordInput}
            name="passwordMatch"
            placeholder='Repeat password'
            validate={[
              Validators.required,
              Validators.passwordMatch,
              Validators.isValidPassword
            ]}
          />
        </Label>
        <ButtonGroup fill style={{marginBottom: '15px'}}>
          <Button
            loading={this.props.submitting}
            disabled={this.props.invalid}
            type='submit'
            intent='primary'
            text='Change Password' />
        </ButtonGroup>
      </form>
    )
  }

  render () {
    const { auth } = this.props

    return (
      <div id="change-password" className='row align-items-center justify-content-center full-height'>
        {auth.hasChangedPassword === state.AUTH_SUCCESS
          ? this.renderSuccess()
          : this.renderResetPassword()}
      </div>
    )
  }
}

export default reduxForm({
  form: 'resetPassword'
})(ResetPassword)
