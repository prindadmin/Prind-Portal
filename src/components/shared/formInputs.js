import React from 'react'
import PropTypes from 'prop-types'

import { InputGroup, Button, Icon, TextArea } from '@blueprintjs/core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const validationErrorStyle = {
  color: '#db3737',
  position: 'absolute',
  width: '300px',
  textAlign: 'justify',
}

export const TextInput = (field) => {
  const { touched, invalid, error, active } = field.meta
  return (
    <React.Fragment>
      <InputGroup
        {...field.input}
        intent={touched && invalid && !active ? 'danger' : 'none'}
        type='text'
        name={field.input.name}
        placeholder={field.placeholder}
      />
      { touched && invalid && !active ? <small style={validationErrorStyle}>{error}</small> : null }
    </React.Fragment>
  )
}

export const TextBoxInput = (field) => {
  const { touched, invalid, error, active } = field.meta
  return (
    <React.Fragment>
      <TextArea
        {...field.input}
        intent={touched && invalid && !active ? 'danger' : 'none'}
        type='text'
        name={field.input.name}
        placeholder={field.placeholder}
        />
        { touched && invalid && !active ? <small style={validationErrorStyle}>{error}</small> : null }
    </React.Fragment>
  )
}
/*
if a more in depth sel;ector is required later install blueprintjs/select

export const SelectInput = (field) => {
  const { touched, invalid, error, active } = field.meta
  return (
    <React.Fragment>
      <Select
        {...field.input}
        items
        intent={touched && invalid && !active ? 'danger' : 'none'}
        name={field.input.name}
        placeholder={field.placeholder}
        />
        { touched && invalid && !active ? <small style={validationErrorStyle}>{error}</small> : null }
    </React.Fragment>
  )
}
*/
export class PasswordInput extends React.Component {
  static propTypes = {
    field: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      showPassword: false
    }
  }

  toggleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  render () {
    const { showPassword } = this.state
    const { touched, invalid, error, active } = this.props.meta
    const ico = <FontAwesomeIcon icon={ showPassword ? faEyeSlash : faEye} />
    const ShowPassword = <Button minimal icon={<Icon icon={ico} />} onClick={this.toggleShowPassword} />

    return (
      <React.Fragment>
        <InputGroup
          {...this.props.input}
          intent={touched && invalid && !active ? 'danger' : 'none'}
          type={showPassword ? 'text' : 'password'}
          name={this.props.input.name}
          placeholder={this.props.placeholder}
          rightElement={ShowPassword}
        />
        { touched && invalid && !active ? <small style={validationErrorStyle}>{error}</small> : null }
      </React.Fragment>
    )
  }
}
