import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import {
  Button,
  Intent,
  Callout,
} from '@blueprintjs/core'

import * as FormInputs from '../../formInputs'

import * as Strings from '../../../../Data/Strings'

// TODO: BUG: Fix at mobile resolutions (extends past edge of screen)
// TODO: BUG: URGENT: This doesn't change to the chosen date

export class CalendarPicker extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      editable: PropTypes.bool.isRequired,
      fieldDetails: PropTypes.shape({
        dateValue: PropTypes.string,
      }).isRequired,
    }),
    pageName: PropTypes.string.isRequired,
  }

  constructor() {
    super()
    this.state = {
      updateInProgress: false,
      updateError: false,
      errorText: "",
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }


  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------

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
    this.setState({
      updateInProgress: false,
    })
  }

  saveReject = () => {
    this.setState({
      updateError: true,
      updateInProgress: false,
      errorText: Strings.ERROR_SAVING_CHANGES_TO_FIELD
    })
  }

  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    const { handleSubmit } = this.props
    const { title, description, editable, fieldDetails } = this.props.elementContent

    var currentDateValue = new Date()

    if (fieldDetails.dateValue !== undefined  && fieldDetails.dateValue !== null) {
      currentDateValue = new Date(fieldDetails.dateValue)
    }

    return (
      <div id='calendar-picker-element'>
        <div className='calendar-picker-element-container'>
          <div className='element-title'>
            {title}
          </div>

          <div className='element-description'>
            {description}
          </div>

          <div className='container'>
            <form onSubmit={handleSubmit(this.saveChanges)} className='calendar-picker-form'>

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
                    name="dateValue"
                    component={FormInputs.CalendarPicker}
                    value={currentDateValue}
                    disabled={!editable}
                    />
                </div>
              </div>


              <div className='row'>
                <div className='col'>
                  <Button
                    loading={this.props.submitting}
                    disabled={this.props.pristine}
                    className='entry-button'
                    intent={Intent.PRIMARY}
                    text={Strings.BUTTON_SAVE_CHANGES}
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

CalendarPicker = reduxForm({
  enableReinitialize: true
})(CalendarPicker)

export default CalendarPicker
