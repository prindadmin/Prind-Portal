import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CourseDetails from './course-details'


export class ProviderDetails extends Component {
  static propTypes = {
    details: PropTypes.object,
  }

  render() {

    const { details } = this.props

    return (
      <div className='provider-details-section'>
        <h2>{details.name}</h2>
        <div className='provider-course-section'>
          <div className='course-name course-table-heading col-8'>
            Course Name:
          </div>
          <div className='course-table-heading col-4'>
            Passed:
          </div>
        </div>
        {
          details.courses != null ? details.courses.map((singleCourse) => {

              return (
                <div className='course' key={singleCourse.id}>
                  <CourseDetails details={singleCourse} />
                </div>
              )
            }

          ) : null
        }
      </div>
    )
  }

}

export default ProviderDetails
