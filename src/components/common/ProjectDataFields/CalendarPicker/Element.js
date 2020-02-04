import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Intent,
} from '@blueprintjs/core'

import {
  DatePicker,
} from '@blueprintjs/datetime'

import * as strings from '../../../../data/Strings'

// TODO: Implement 'editable' prop.  i.e. make field locked when editable = false
// TODO: Implement calls to server

export class Element extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      fieldDetails: PropTypes.object.isRequired,
    })
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }


  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------



  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    // TODO: Implement onChange to date picker

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

            <div className='row'>
              <div className='col'>
                <DatePicker
                  value={dateValue}
                  />
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                <Button
                  className='entry-button'
                  intent={Intent.PRIMARY}
                  text={strings.BUTTON_SAVE_CHANGES}
                  />
              </div>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

export default Element
