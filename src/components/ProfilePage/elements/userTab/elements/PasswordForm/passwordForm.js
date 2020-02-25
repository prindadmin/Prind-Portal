import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import {
  FormGroup,
  Button,
  Intent,
  FileInput,
  Callout,
} from '@blueprintjs/core'

import AWS from 'aws-sdk';

import * as strings from '../../../../../../data/Strings'
import * as validators from '../../../../../../validators'

import * as FormInputs from '../../../../../shared/formInputs'

const defaultAvatar = `images/default-avatar.png`

// TODO: Add spinner to image when loading / updating

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


  updatePassword = (values) => {
    console.log(values)

    const { updatePassword } = this.props

    if (values.newPassword !== values.repeatNewPassword) {
      this.setState({
        passwordError: true,
        errorText: strings.PASSWORDS_DO_NOT_MATCH
      })
      return;
    }

    updatePassword(
      values.currentPassword,
      values.newPassword
    )

  }

  render() {

    const { user, handleSubmit } = this.props

    return (
      <div id='password-change-section'>
        <form onSubmit={handleSubmit(this.updatePassword)} className='profile-form'>
          {
            this.props.submitFailed ?
            <Callout style={{marginBottom: '15px'}} intent='danger'>
              <div>{strings.CHANGE_PASSWORD_UNSUCCESSFUL}</div>
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
            label={strings.CURRENT_PASSWORD}
            labelFor="currentPassword"
            labelInfo={strings.FIELD_IS_REQUIRED}
          >
            <Field
              name="currentPassword"
              validate={[validators.required, validators.maxLength64]}
              component={FormInputs.PasswordInput}
              placeholder={strings.CURRENT_PASSWORD}
            />
          </FormGroup>

          <FormGroup
            label={strings.NEW_PASSWORD}
            labelFor="newPassword"
            labelInfo={strings.FIELD_IS_REQUIRED}
          >
            <Field
              name="newPassword"
              validate={[validators.required, validators.maxLength64, validators.isValidPassword]}
              component={FormInputs.PasswordInput}
              placeholder={strings.NEW_PASSWORD}
            />
          </FormGroup>

          <FormGroup
            label={strings.REPEAT_NEW_PASSWORD}
            labelFor="repeatNewPassword"
            labelInfo={strings.FIELD_IS_REQUIRED}
          >
            <Field
              name="repeatNewPassword"
              validate={[validators.required, validators.maxLength64, validators.isValidPassword]}
              component={FormInputs.PasswordInput}
              placeholder={strings.NEW_PASSWORD}
            />
          </FormGroup>

          <Button
            intent={Intent.PRIMARY}
            type="submit"
            text={strings.BUTTON_SAVE_CHANGES}
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
