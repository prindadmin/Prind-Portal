import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Callout } from '@blueprintjs/core'
import PopOverHandler from '../popOverHandler'

import * as Strings from '../../../Data/Strings'
import * as Validators from '../../../Validators'
import * as FormInputs from '../formInputs'

const fieldTypes = process.env.REACT_APP_FUNCTIONALITY_GIT_TEXT_V1 === "True" ?
[
  {
    value: "file",
    label: "File Upload"
  },
  {
    value: "calendar",
    label: "Date Picker"
  },
  {
    value: "dropdown",
    label: "Drop Down Menu"
  },
  {
    value: "longText",
    label: "Text Box"
  },
  {
    value: "gitText",
    label: "Change Tracking Text Box"
  }
] :
[
  {
    value: "file",
    label: "File Upload"
  },
  {
    value: "calendar",
    label: "Date Picker"
  },
  {
    value: "dropdown",
    label: "Drop Down Menu"
  },
  {
    value: "longText",
    label: "Text Box"
  }
]

// TODO: FUTURE: Add functionality that clicking tick box next to a drop down option sets optionOpensTextBox to true:
/*
{
  title,
  description,
  type,
  fieldDetails: {
    dropDownOptions,
    optionOpensTextBox,
  }
}
*/

export class Element extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    onClosePopover: PropTypes.func.isRequired,
    createField: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      type: 'file',
      fieldDropDownOptions: '',
      createError: false,
      errorText: '',
    }
  }


  // Trigger the closing of the popover
  closePopover = () => {
    this.props.onClosePopover()
  }

  createResolve = (result) => {
    this.closePopover()
  }

  createReject = () => {
    this.setState({
      createError: true,
      errorText: Strings.ERROR_CREATING_CUSTOM_FIELD,
    })
  }


  createField = (e) => {
    e.preventDefault()

    this.setState({
      createError: false,
      errorText: "",
    })

    const { projectId, pageName } = this.props
    const { title, description, type, fieldDropDownOptions } = this.state

    var newFieldDetails = {
      title,
      description,
      type,
    }

    // If it's not a drop down, send the simple version
    // TODO: FUTURE: Fix this so it doesn't always return false for the tick boxes
    if (type === 'dropdown') {
      newFieldDetails['fieldDetails'] = {
        dropDownOptions: fieldDropDownOptions.split(",").map(item => item.trim()),
        optionOpensTextBox: []
      }
    }
    // Send to server
    this.props.createField(projectId, pageName, newFieldDetails, this.createResolve, this.createReject)
  }


  getDropDownTypingField = () => {
    return (
      <React.Fragment>
        <label htmlFor="fieldDropDownOptions">{Strings.DROP_DOWN_OPTIONS}</label>
        <input
          id="fieldDropDownOptions"
          name="fieldDropDownOptions"
          type="text"
          placeholder={ Strings.DROP_DOWN_OPTIONS }
          value={this.state.fieldDropDownOptions}
          onChange={this.handleInputChange}
          className={ this.state.fieldDropDownOptions === null ? "default" : "filled" }
          required />
      </React.Fragment>

    )
  }

  getCheckBoxes = () => {
    const { fieldDropDownOptions } = this.state

    if(fieldDropDownOptions !==  '') {
      const optionsArray = fieldDropDownOptions.split(",").map(item => item.trim())

      return (
        <div className='drop-down-container'>
          {
            optionsArray.map((item, index) => {
              return (
                <span key={index}>
                  <input
                    id={item}
                    name={item}
                    key={index}
                    label={item}
                    type='checkbox'
                    disabled
                  />
                  <label>{item}</label>
                </span>
              )
            })
          }
        </div>
      )
    } else {
      return (
        <div className="no-options">
          {Strings.PLEASE_ENTER_SOME_OPTIONS}
        </div>
      )
    }
  }

  getErrorMessage = () => {
    return (
      <Callout style={{marginBottom: '15px'}} intent='danger'>
        <div>{this.state.errorText}</div>
      </Callout>
    )
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getForm = () => {
    return (
      <div className='form-container'>
        <form onSubmit={(e) => e.preventDefault()} className='create-field-form'>

          <label htmlFor="title">{Strings.FIELD_TITLE}</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder={ Strings.FIELD_TITLE }
            value={this.state.title}
            onChange={this.handleInputChange}
            className={ this.state.title === null ? "default" : "filled" }
            required />

          <label htmlFor="description">{Strings.FIELD_DESCRIPTION}</label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder={ Strings.FIELD_DESCRIPTION }
            value={this.state.description}
            onChange={this.handleInputChange}
            className={ this.state.description === null ? "default" : "filled" }
            required />

          <p>{Strings.FIELD_TYPE}</p>
          <div className='radio-container'>
            {
              fieldTypes.map((field, index) => {
                return(
                  <span key={index}>
                    <input
                      id={`fieldType${field.value}`}
                      name="type"
                      type="radio"
                      value={field.value}
                      onChange={this.handleInputChange} />
                    <label htmlFor="type">{field.label}</label>
                  </span>
                )
              })
            }
          </div>

          {
            this.state.type === 'dropdown' ?
              <React.Fragment>
                {this.getDropDownTypingField()}
                {this.getCheckBoxes()}
              </React.Fragment>
                : null
          }

          <input
            id="submit"
            name="submit"
            type="submit"
            value={ Strings.BUTTON_CREATE_FIELD }
            className="submit-button"
            readOnly
            onClick={(e) => this.createField(e)}/>

          <input
            id="cancel"
            name="cancel"
            type="cancel"
            value={ Strings.BUTTON_CANCEL }
            className="cancel-button"
            readOnly
            onClick={this.closePopover}/>


        </form>
      </div>
    )
  }


  render() {
    return (
      <PopOverHandler>
        <div id='popup-greyer' onClick={(e) => {
          this.closePopover()
          e.stopPropagation()
          }}>
          <div id='create-custom-field-popover'>
            <div id='popup-box'>
              <div id='create-custom-field-popover-container' className='create-custom-field-popover-container' onClick={(e) => e.stopPropagation()}>
                <div className='element-title'>
                  {Strings.CREATE_CUSTOM_FIELD}
                </div>
                <div className='element-description'>
                  {
                    this.state.errorText !== '' ? this.getErrorMessage() : null
                  }
                  {
                    this.getForm()
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopOverHandler>
    )
  }
}

export default Element
