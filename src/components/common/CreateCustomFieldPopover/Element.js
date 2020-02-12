import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import PropTypes from 'prop-types'

import {
  FormGroup,
  Button,
  ButtonGroup,
} from '@blueprintjs/core'

import PopOverHandler from '../popOverHandler'

import * as strings from '../../../data/Strings'
import * as validators from '../../../validators'
import * as FormInputs from '../../shared/formInputs'

// TODO: Future: Make this wait for response before closing

const fieldTypes = [
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

export class Element extends Component {
  static propTypes = {
    projectID: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    onClosePopover: PropTypes.func.isRequired,
  }


  constructor() {
    super()
    this.state = {
      selectedTypeValue: fieldTypes[0].value,
      optionsArray: [],
    }
  }


  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }


  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------


  // Trigger the closing of the popover
  closePopover = () => {
    this.props.onClosePopover()
  }

  createField = (e) => {

    const { auth, projectID, pageName } = this.props

    var newFieldDetails = {}

    // If it's not a drop down, send the simple version
    if (e.type !== 'dropdown') {
      newFieldDetails = {
        title: e.title,
        description: e.description,
        type: e.type,
      }

    // Otherwise send the complicated version
    } else {

      const dropDownOptions = e.fieldDropDownOptions.split(",").map(item => item.trim())
      const optionOpensTextBox = dropDownOptions.filter((item) =>
          e.hasOwnProperty(item) && e[item] === true
      )

      newFieldDetails = {
        title: e.title,
        description: e.description,
        type: e.type,
        fieldDetails: {
          dropDownOptions,
          optionOpensTextBox,
        }
      }
    }


    // Send to server
    this.props.createField(
      auth.info.idToken.jwtToken,
      projectID,
      pageName,
      newFieldDetails
    )

    this.closePopover()
  }


  onRadioChange= (value) => {

    this.setState({
      selectedTypeValue: value,
    })

    this.props.change(
      'type', value
    )
  }


  getCheckBoxes = () => {

    const { dropDownOptions } = this.props

    if(dropDownOptions !==  undefined) {
      const optionsArray = dropDownOptions.split(",").map(item => item.trim())

      return (
        optionsArray.map((item, index) => {
          return(
            <Field
              name={item}
              key={index}
              label={item}
              component={FormInputs.CheckBoxInput}
            />
          )
        })
      )
    } else {
      return (
        <div className="no-options">
          {strings.PLEASE_ENTER_SOME_OPTIONS}
        </div>
      )
    }
  }


  getForm = () => {

    const { handleSubmit } = this.props
    const { selectedTypeValue } = this.state

    return (
      <div className='form-container'>
        <form onSubmit={handleSubmit(this.createField)} className='create-field-form'>
          <FormGroup
            label={strings.FIELD_TITLE}
            labelFor="title"
            labelInfo={strings.FIELD_IS_REQUIRED}
          >
            <Field
              name="title"
              validate={[validators.required, validators.maxLength64]}
              component={FormInputs.TextInput}
              placeholder={strings.FIELD_TITLE}
            />
          </FormGroup>

          <FormGroup
            label={strings.FIELD_DESCRIPTION}
            labelFor="description"
            labelInfo={strings.FIELD_IS_REQUIRED}
          >
            <Field
              name="description"
              validate={[validators.required]}
              component={FormInputs.TextInput}
              placeholder={strings.FIELD_DESCRIPTION}
            />
          </FormGroup>



          <FormGroup
            label={strings.FIELD_TYPE}
            labelInfo={strings.FIELD_IS_REQUIRED}
          >
            <Field
              name="type"
              component={FormInputs.RadioOptions}
              options={fieldTypes}
              onRadioChange={this.onRadioChange}
              selectedValue={this.state.selectedTypeValue}
            />

          </FormGroup>

          {
            selectedTypeValue === 'dropdown' ?
            <React.Fragment>
              <FormGroup
                label={strings.DROP_DOWN_OPTIONS}
                labelFor="fieldDropDownOptions"
                labelInfo={strings.FIELD_IS_REQUIRED}
              >
                <Field
                  name="fieldDropDownOptions"
                  validate={[validators.required]}
                  component={FormInputs.TextInput}
                  placeholder={strings.DROP_DOWN_OPTIONS}
                />
              </FormGroup>

              <FormGroup
                label={strings.DROP_DOWN_OPTIONS_OPENING_TEXT_BOX}
              >
                {this.getCheckBoxes()}
              </FormGroup>
            </React.Fragment>
            : null
          }


          <ButtonGroup fill>
            <Button
              loading={this.props.submitting}
              disabled={this.props.invalid}
              type='submit'
              intent='primary'
              text={strings.BUTTON_CREATE_FIELD}
            />
          </ButtonGroup>
          <ButtonGroup fill>
            <Button
              text={strings.BUTTON_CANCEL}
              intent='none'
              onClick={(e) => {
                this.closePopover(e)
                e.stopPropagation()
              }}
            />
          </ButtonGroup>
        </form>
      </div>
    )
  }


  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    return (
      <PopOverHandler>
        <div id='popup-greyer' onClick={(e) => {
          this.closePopover()
          e.stopPropagation()
          }}>
          <div id='create-custom-field-popover'>
            <div id='popup-box'>
              <div className='create-custom-field-popover-container' onClick={(e) => e.stopPropagation()}>
                <div className='element-title'>
                  {strings.CREATE_CUSTOM_FIELD}
                </div>
                <div className='element-description'>
                  {this.getForm()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopOverHandler>
    )
  }
}

Element = reduxForm({
  enableReinitialize: true,
  form: 'newField'
})(Element)

// Decorate with connect to read form values
const selector = formValueSelector('newField') // <-- same as form name
Element = connect(state => {
  // can select values individually
  const dropDownOptions = selector(state, 'fieldDropDownOptions')
  return {
    dropDownOptions
  }
})(Element)


export default Element
