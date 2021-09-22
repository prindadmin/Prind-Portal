import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import {
  Button,
  FormGroup,
  Intent,
  Callout,
} from '@blueprintjs/core'

import * as FormInputs from '../../formInputs'

import * as Strings from '../../../../Data/Strings'

export class DropDownOption extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      editable: PropTypes.bool.isRequired,
      fieldDetails: PropTypes.shape({
        dropdownValue: PropTypes.string,
        textboxValue: PropTypes.string,
        dropDownOptions: PropTypes.array.isRequired,
        optionOpensTextBox: PropTypes.oneOfType([
          PropTypes.array,
          PropTypes.string,
        ]).isRequired,
      }).isRequired,
    }),
    pageName: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    const { dropdownValue, textboxValue } = props.elementContent.fieldDetails

    var stateUpdate = {
      dropdownValue: Strings.NO_VALUE_SELECTED,
      textboxValue: Strings.PLEASE_PROVIDE_DETAILS_HERE,
      updateInProgress: false,
      updateError: false,
      errorText: "",
    }

    if (dropdownValue !== null && dropdownValue !== undefined) {
      stateUpdate.dropdownValue = dropdownValue
    }

    if (textboxValue !== null  && textboxValue !== undefined) {
      stateUpdate.textboxValue = textboxValue
    }

    this.state = stateUpdate
  }

  componentDidMount() {
  }

  componentDidUpdate(prevState, prevProps) {

  }


  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------

  onItemSelected = (item) => {
    this.setState({
      dropdownValue: item.id,
    })
  }

  // When the user wants to save the changes, update the server
  saveChanges = (fieldDetails) => {

    const { pageName, projects, elementContent } = this.props

    this.setState({
      updateError: false,
      updateInProgress: true,
    })

    this.props.updateField(
      projects.chosenProject.projectId,
      pageName,
      elementContent.id,
      fieldDetails,
      this.saveResolve,
      this.saveReject,
    )
  }

  saveResolve = () => {

    console.log("saveResolve")

    this.setState({
      updateInProgress: false,
    })
  }

  saveReject = () => {

    console.log("saveReject")

    this.setState({
      updateError: true,
      updateInProgress: false,
      errorText: Strings.ERROR_SAVING_CHANGES_TO_FIELD
    })
  }


  getDropDownPresentation = () => {
    const { handleSubmit } = this.props
    const { fieldDetails, editable } = this.props.elementContent
    const { dropdownValue, textboxValue } = this.state

    // Check if drop down options has been provided or not
    const dropDownOptions = fieldDetails.dropDownOptions !== undefined ? fieldDetails.dropDownOptions : []

    // re-key the roles array so the keys match those required by the drop down
    var formattedDropDownOptions = dropDownOptions.map(element => {
      return {
        id: element,
        name: element
      };
    });

    return (
      <form onSubmit={handleSubmit(this.saveChanges)} className='drop-down-picker-form'>

        {
          this.state.updateError ?
          <div className='row'>
            <Callout style={{marginBottom: '15px'}} intent='danger'>
              <div>{this.state.errorText}</div>
            </Callout>
          </div> : null
        }

        <div className='row'>
          <div className='col'>
            <Field
              name="dropdownValue"
              values={formattedDropDownOptions}
              component={FormInputs.SelectInput}
              onItemSelect={this.onItemSelected}
              placeholder={Strings.NO_ITEM_CHOSEN}
              disabled={!editable}
            />
          </div>
        </div>


        <div className='row'>
          <div className='col'>
            {
              fieldDetails.optionOpensTextBox.includes(dropdownValue) ?
              <FormGroup
                label={Strings.IF_XXX_PROVIDE_DETAILS_BELOW.replace("XXX", dropdownValue)}
                labelFor="extraInfo"
                labelInfo=""
                className="last"
              >
                <Field
                  name="textboxValue"
                  component='textarea'
                  className="bp3-input"
                  value={textboxValue}
                  disabled={!editable}
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
            text={Strings.BUTTON_SAVE_CHANGES}
            className='entry-button'
            intent={Intent.PRIMARY}
            type='submit'
          />
          </div>
        </div>
      </form>
    )
  }

  getNoDropDownOptionsPresent = () => {
    return (
      <React.Fragment>
        { Strings.NO_DROP_DOWN_OPTIONS_PRESENT }
      </React.Fragment>
    )
  }


  render() {

    //const { handleSubmit } = this.props
    const { title, description, fieldDetails } = this.props.elementContent
    //const { dropdownValue, textboxValue } = this.state

    console.log(this.props.elementContent.fieldDetails)

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
            {
              fieldDetails.dropDownOptions === undefined ? this.getNoDropDownOptionsPresent() : this.getDropDownPresentation()
            }
          </div>

        </div>
      </div>
    )
  }
}

DropDownOption = reduxForm({
  enableReinitialize: true
})(DropDownOption)

export default DropDownOption
