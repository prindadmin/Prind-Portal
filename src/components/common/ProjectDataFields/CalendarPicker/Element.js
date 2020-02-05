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
// TODO: Implement calls to server

export class Element extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      fieldDetails: PropTypes.shape({
        dateValue: PropTypes.string.isRequired,
      }),
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      chosenDate: this.props.elementContent.fieldDetails.dateValue
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }


  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------

  // TODO: Implement the server call for the data
  saveChanges = (e) => {
    console.log(e)
  }

  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    const { handleSubmit } = this.props
    const { title, description, fieldDetails } = this.props.elementContent

    var dateValue = new Date()

    if (fieldDetails.dateValue !== undefined) {
      dateValue = new Date(fieldDetails.dateValue)
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
                    value={dateValue}
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
