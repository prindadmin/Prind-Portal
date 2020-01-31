import React from 'react'
import PropTypes from 'prop-types'

import { InputGroup, Button, Icon, TextArea, MenuItem } from '@blueprintjs/core'
import { Select } from "@blueprintjs/select";

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
  const { touched, invalid, active } = field.meta

  return (
    <React.Fragment>
      <TextArea
        {...field.input}
        intent={touched && invalid && !active ? 'danger' : 'none'}
        type='text'
        name={field.input.name}
        value={field.value}
        placeholder={field.placeholder}
        />
    </React.Fragment>
  )
}




export class SelectInput extends React.Component {
  static propTypes = {
    field: PropTypes.object
  }

  itemRenderer = (item, { handleClick }) => {

    return(
      <MenuItem
          {...this.props.input}
          key={item.id}
          text={item.name}
          onClick={handleClick}
          shouldDismissPopover={true}
        />
      )
  }


  render () {

    const { input, values, selectedItem, onItemSelect } = this.props
    const { touched, invalid, error, active } = this.props.meta

    return (
      <React.Fragment>
        <Select
          {...input}
          name={input.name}
          intent={touched && invalid && !active ? 'danger' : 'none'}
          items={values}
          itemRenderer={this.itemRenderer}
          filterable={false}
          onItemSelect={onItemSelect}
          noResults={<MenuItem disabled={true} text="No results." />}
        >
          <Button
            text={selectedItem}
            {...input}
            rightIcon="double-caret-vertical"
            alignText="left"
          />
          { touched && invalid && !active ? <small style={validationErrorStyle}>{error}</small> : null }
        </Select>
      </React.Fragment>
    )
  }

}




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
