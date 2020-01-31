import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import {
  Button,
  MenuItem,
  TextArea,
  FormGroup,
  Intent,
  Alignment,
} from '@blueprintjs/core'

import { Select } from "@blueprintjs/select";

import * as FormInputs from '../../../shared/formInputs'

import * as strings from '../../../../data/Strings'

// TODO: Disable save button until changes are made
// TODO: Implement editable prop
// TODO: Get the drop down and text area to send initial and current values to the store
// TODO: Add in props so that opening the text box can be an optional feature

export class Element extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      editable: PropTypes.bool,
      fieldDetails: PropTypes.shape({
        dropdownValue: PropTypes.string,
        textboxValue: PropTypes.string,
        dropdownOptions: PropTypes.array,
      }),
    })
  }

  constructor() {
    super()
    this.state = {
      dropdownValue: strings.NO_VALUE_SELECTED,
      textboxValue: strings.IF_YES_PROVIDE_DETAILS,
    }
  }

  componentDidMount() {

    const { dropdownValue, textboxValue } = this.props.elementContent.fieldDetails

    var stateUpdate = {}

    if (dropdownValue !== null && dropdownValue !== undefined) {
      stateUpdate.dropdownValue = dropdownValue
    }

    if (textboxValue !== null  && textboxValue !== undefined) {
      stateUpdate.textboxValue = textboxValue
    }

    if (stateUpdate.length !== 0) {
      this.setState({
        ...stateUpdate,
      })
    }
  }

  componentDidUpdate(prevState, prevProps) {

  }


  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------

  onItemSelected = (item) => {
    this.setState({
      dropdownValue: item.name,
    })
  }

  itemRenderer = (item, { handleClick }) => {

    return(
      <MenuItem
          key={item.id}
          text={item.name}
          onClick={handleClick}
          shouldDismissPopover={true}
        />
      )
  }

  saveChanges = (e) => {
    console.log(e)
  }

  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    const { handleSubmit } = this.props
    const { title, description, fieldDetails } = this.props.elementContent
    const { dropdownValue, textboxValue } = this.state

    // Check if drop down options has been provided or not
    const dropdownOptions = fieldDetails.dropdownOptions !== undefined ? fieldDetails.dropdownOptions : []


    return (
      <div id='drop-down-element'>
        <div className={'drop-down-element-container'}>
          <div className='element-title'>
            {title}
          </div>

          <div className='element-description'>
            {description}
          </div>

          <div className='container'>
            <form onSubmit={handleSubmit(this.saveChanges)} className='add-member-form'>
              <div className='row'>
                <div className='col'>
                  <Field
                    name="dropdownValue"
                    values={dropdownOptions}
                    component={FormInputs.SelectInput}
                    onItemSelect={this.onItemSelected}
                    value={dropdownValue}
                    selectedItem={dropdownValue}
                  />
                </div>
              </div>

              <div className='row'>
                <div className='col'>
                  {
                    dropdownValue === strings.YES ?
                    <FormGroup
                      label={strings.IF_YES_PROVIDE_DETAILS}
                      labelFor="extraInfo"
                      labelInfo=""
                      className="last"
                    >
                      {console.log(textboxValue)}
                      <Field
                        name="textboxValue"
                        component={FormInputs.TextBoxInput}
                        className="bp3-input"
                        props={{value: textboxValue}}
                        value={textboxValue}
                      />
                    </FormGroup> :
                    null
                  }
                </div>
              </div>

              <div className='row'>
                <div className='col'>
                <Button
                  loading={this.props.submitting}
                  disabled={this.props.pristine}
                  text={strings.BUTTON_SAVE_CHANGES}
                  intent={Intent.PRIMARY}
                  type='submit'
                />
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    )
  }
}

Element = reduxForm({
  enableReinitialize: true,
  form: 'dropdown'
})(Element)

export default Element
