import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import {
  Label,
  Button,
  ButtonGroup,
  Icon
} from '@blueprintjs/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import * as FormInputs from '../shared/formInputs'
import * as validators from '../../validators'

class ForgotPassword extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    sendCode: PropTypes.func.isRequired,
    auth: PropTypes.object,
    init: PropTypes.func,
    history: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      showSuccess: false
    }
  }

  sendCode = async values => {
    values.email = values.email.toLowerCase()
    try {
      await this.props.sendCode(values)
      this.setState({ showSuccess: true })
    } catch (e) {
      this.setState({ showSuccess: true })
    }
  }

  showSuccess () {
    const ico = <FontAwesomeIcon icon={faCheck} size='8x' />

    const style = {
      textAlign: 'center'
    }

    return (
      <div className='auth-form' style={style}>
        <Icon icon={ico} />
        <h3>Change password link successfuly sent! Please check your email.</h3>
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

  renderForgotPassword() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.sendCode)} className='auth-form'>
        <h4>In order to change your password we'll send you a link to the change password page</h4>
        <Label>
          <Field
            component={FormInputs.TextInput}
            name="email"
            placeholder='Email'
            validate={[validators.required, validators.email, validators.maxLength32]}
          />
        </Label>
        <ButtonGroup fill style={{marginBottom: '15px'}}>
          <Button
            loading={this.props.submitting}
            disabled={this.props.invalid}
            type='submit'
            intent='primary'
            className='bim-light-blue'
            text='Send Code' />
        </ButtonGroup>
      </form>
    )
  }

  render () {
    const { showSuccess } = this.state

    return (
      <div className='row align-items-center justify-content-center full-height'>
        {showSuccess ? this.showSuccess() : this.renderForgotPassword()}
      </div>
    )
  }
}

export default reduxForm({
  form: 'forgotPassword'
})(ForgotPassword)
