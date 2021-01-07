import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import {
  FormGroup,
  Button,
  Intent,
  Callout,
} from '@blueprintjs/core'

import * as Strings from '../../../../../../Data/Strings'
import * as Validators from '../../../../../../Validators'

import * as FormInputs from '../../../../../common/formInputs'

export class Page extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      passwordError: false
    }
  }

  passwordUpdatedSuccessfully = (e) => {
    console.log("passwordUpdatedSuccessfully")
    console.log(e)
  }

  passwordUpdateFailed = () => {
    console.log("passwordUpdateFailed")

    this.setState({
      passwordError: true,
      errorText: this.props.auth.error.message
    })
  }


  updatePassword = (values) => {
    console.log(values)

    this.setState({
      passwordError: false,
    })

    const { updatePassword } = this.props

    if (values.newPassword !== values.repeatNewPassword) {
      this.setState({
        passwordError: true,
        errorText: Strings.PASSWORDS_DO_NOT_MATCH
      })
      return;
    }

    updatePassword(
      values.currentPassword,
      values.newPassword,
      this.passwordUpdatedSuccessfully,
      this.passwordUpdateFailed,
    )

  }

  render() {

    const { handleSubmit } = this.props

    return (
      <div id='password-change-section'>
        <form onSubmit={handleSubmit(this.updatePassword)} className='profile-form'>
          {
            this.props.submitFailed ?
            <Callout style={{marginBottom: '15px'}} intent='danger'>
              <div>{Strings.CHANGE_PASSWORD_UNSUCCESSFUL}</div>
            </Callout> :
            null
          }
          {
            this.state.passwordError ?
            <Callout style={{marginBottom: '15px'}} intent='danger'>
              <div>{this.state.errorText}</div>
            </Callout> :
            null
          }
          <FormGroup
            label={Strings.CURRENT_PASSWORD}
            labelFor="currentPassword"
            labelInfo={Strings.FIELD_IS_REQUIRED}
          >
            <Field
              name="currentPassword"
              validate={[Validators.required, Validators.maxLength64]}
              component={FormInputs.PasswordInput}
              placeholder={Strings.CURRENT_PASSWORD}
            />
          </FormGroup>

          <FormGroup
            label={Strings.NEW_PASSWORD}
            labelFor="newPassword"
            labelInfo={Strings.FIELD_IS_REQUIRED}
          >
            <Field
              name="newPassword"
              validate={[Validators.required, Validators.maxLength64, Validators.isValidPassword]}
              component={FormInputs.PasswordInput}
              placeholder={Strings.NEW_PASSWORD}
            />
          </FormGroup>

          <FormGroup
            label={Strings.REPEAT_NEW_PASSWORD}
            labelFor="repeatNewPassword"
            labelInfo={Strings.FIELD_IS_REQUIRED}
          >
            <Field
              name="repeatNewPassword"
              validate={[Validators.required, Validators.maxLength64, Validators.isValidPassword]}
              component={FormInputs.PasswordInput}
              placeholder={Strings.NEW_PASSWORD}
            />
          </FormGroup>

          <Button
            intent={Intent.PRIMARY}
            type="submit"
            text={Strings.BUTTON_SAVE_CHANGES}
            loading={this.props.submitting}
            disabled={this.props.pristine || this.props.invalid}
          />

        </form>
      </div>
    )
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: 'password'
})(Page)
