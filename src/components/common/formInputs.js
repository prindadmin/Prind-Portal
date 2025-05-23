import React from 'react'
import PropTypes from 'prop-types'

import { InputGroup, Button, Icon, TextArea, MenuItem, RadioGroup, Radio, Checkbox } from '@blueprintjs/core'
import { DatePicker } from '@blueprintjs/datetime'
import { Select } from "@blueprintjs/select";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import * as Strings from '../../Data/Strings'

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
        disabled={field.disabled !== undefined ? field.disabled : false}
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
        value={field.input.value}
        placeholder={field.placeholder}
        disabled={field.disabled !== undefined ? field.disabled : false}
        />
    </React.Fragment>
  )
}

export const CheckBoxInput = (field) => {

  return (
    <React.Fragment>
      <Checkbox
        {...field.input}
        name={field.input.name}
        label={field.label}
        checked={field.isChecked}
        />
    </React.Fragment>
  )
}




export class SelectInput extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    values: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
    onItemSelect: PropTypes.func,
    disabled: PropTypes.bool,
  }

  itemRenderer = (item, { handleClick }) => {
    return(
      <MenuItem
          {...this.props.input}
          key={item.id}
          text={item.name}
          onClick={handleClick}
          shouldDismissPopover={true}
          className="high-z"
        />
      )
  }


  render () {

    const { input, values, onItemSelect, disabled, placeholder } = this.props
    const { touched, invalid, error, active } = this.props.meta

    return (
      <React.Fragment>
        <Select
          {...input}
          intent={touched && invalid && !active ? 'danger' : 'none'}
          items={values}
          itemRenderer={this.itemRenderer}
          filterable={false}
          onItemSelect={(e) => {
            input.onChange(e.name)
            onItemSelect(e)
          }}
          noResults={<MenuItem disabled={true} text="No results." />}
          disabled={disabled === true}
        >
          <Button
            text={input.value !== "" ? input.value : placeholder}
            rightIcon="double-caret-vertical"
            alignText="left"
            disabled={disabled === true}
          />
          { touched && invalid && !active ? <small style={validationErrorStyle}>{error}</small> : null }
        </Select>
      </React.Fragment>
    )
  }

}



export class RadioOptions extends React.Component {
  static propTypes = {
    field: PropTypes.object
  }

  render () {
    const { options, onRadioChange, selectedValue } = this.props

    return (
      <React.Fragment>
        <RadioGroup
          selectedValue={selectedValue}
          onChange={(e) => onRadioChange(e.currentTarget.value)}
        >


          {
            options.map((fieldType, index) => {
              return (
                <Radio key={index} label={fieldType.label} value={fieldType.value} />
              )
            })
          }
        </RadioGroup>
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
