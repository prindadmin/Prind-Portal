import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import {
  Button,
  Intent,
} from '@blueprintjs/core'

import * as FormInputs from '../../../shared/formInputs'

import * as strings from '../../../../data/Strings'

// TODO: Implement 'editable' prop.  i.e. make field locked when editable = false
// TODO: Implement max and min dates to the date picker

export class Element extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      fieldDetails: PropTypes.shape({
        dateValue: PropTypes.string,
      }).isRequired,
    }),
    pageName: PropTypes.string.isRequired,
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }


  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------

  // When the user wants to save the changes, update the server
  saveChanges = (e) => {

    const { auth, pageName, projects, elementContent } = this.props

    var details = {
      projectID: projects.chosenProject.projectId,
      pageName,
      fieldID: elementContent.id,
      fieldDetails: {...e},
    }

    this.props.updateField(
      auth.info.idToken.jwtToken,
      pageName,
      details,
    )
  }

  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    const { handleSubmit } = this.props
    const { title, description, fieldDetails } = this.props.elementContent

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
            <form onSubmit={handleSubmit(this.saveChanges)} className='add-member-form'>


              <div className='row'>
                <div className='col'>
                  <Field
                    name="dateValue"
                    component={FormInputs.CalendarPicker}
                    value={currentDateValue}
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
                    text={strings.BUTTON_SAVE_CHANGES}
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
  enableReinitialize: true
})(Element)

export default Element
