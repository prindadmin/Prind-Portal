import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import PropTypes from 'prop-types'

import {
  FormGroup,
  Button,
  ButtonGroup,
  Callout,
} from '@blueprintjs/core'

import PopOverHandler from '../popOverHandler'

import * as Strings from '../../../Data/Strings'
import * as Validators from '../../../Validators'
import * as FormInputs from '../formInputs'

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
      createError: false,
      errorText: "",
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

  createResolve = () => {
    this.closePopover()
  }

  createReject = () => {
    this.setState({
      createError: true,
      errorText: Strings.ERROR_CREATING_CUSTOM_FIELD,
    })
  }


  createField = (e) => {

    this.setState({
      createError: false,
      errorText: "",
    })

    const { projectID, pageName } = this.props

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
      projectID,
      pageName,
      newFieldDetails,
      this.createResolve,
      this.createReject,
    )
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
          {Strings.PLEASE_ENTER_SOME_OPTIONS}
        </div>
      )
    }
  }


  getForm = () => {

    const { handleSubmit } = this.props
    const { selectedTypeValue } = this.state

    return (
      <div className='form-container'>
        {
          this.state.createError ?
          <Callout style={{marginBottom: '15px'}} intent='danger'>
            <div>{this.state.errorText}</div>
          </Callout> :
          null
        }
        <form onSubmit={handleSubmit(this.createField)} className='create-field-form'>
          <FormGroup
            label={Strings.FIELD_TITLE}
            labelFor="title"
            labelInfo={Strings.FIELD_IS_REQUIRED}
          >
            <Field
              name="title"
              validate={[Validators.required, Validators.maxLength64]}
              component={FormInputs.TextInput}
              placeholder={Strings.FIELD_TITLE}
            />
          </FormGroup>

          <FormGroup
            label={Strings.FIELD_DESCRIPTION}
            labelFor="description"
            labelInfo={Strings.FIELD_IS_REQUIRED}
          >
            <Field
              name="description"
              validate={[Validators.required]}
              component={FormInputs.TextInput}
              placeholder={Strings.FIELD_DESCRIPTION}
            />
          </FormGroup>



          <FormGroup
            label={Strings.FIELD_TYPE}
            labelInfo={Strings.FIELD_IS_REQUIRED}
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
                label={Strings.DROP_DOWN_OPTIONS}
                labelFor="fieldDropDownOptions"
                labelInfo={Strings.FIELD_IS_REQUIRED}
              >
                <Field
                  name="fieldDropDownOptions"
                  validate={[Validators.required]}
                  component={FormInputs.TextInput}
                  placeholder={Strings.DROP_DOWN_OPTIONS}
                />
              </FormGroup>

              <FormGroup
                label={Strings.DROP_DOWN_OPTIONS_OPENING_TEXT_BOX}
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
              text={Strings.BUTTON_CREATE_FIELD}
            />
          </ButtonGroup>
          <ButtonGroup fill>
            <Button
              text={Strings.BUTTON_CANCEL}
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
                  {Strings.CREATE_CUSTOM_FIELD}
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
