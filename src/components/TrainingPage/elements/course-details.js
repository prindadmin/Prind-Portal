import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Checkbox } from '@blueprintjs/core'

export class CourseDetails extends Component {
  static propTypes = {
    details: PropTypes.object,
  }

  render() {

    const { details } = this.props

    return (
      <div className='course-details'>
        <div className='course-name col-8'>
          { details.name }
        </div>
        <div className='course-tick-box col-4'>
          <Checkbox checked={details.passed} disabled={true} />
        </div>
      </div>
    )
  }

}

export default CourseDetails
