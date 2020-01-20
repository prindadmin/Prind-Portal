import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class FoundationsError extends Component {
  static propTypes = {
    resultDetails: PropTypes.object,
  }

  render() {

    const { resultDetails } = this.props

    return (
      <div className='error-section'>
        <div className='error-details'>
          <b><h3>There was an error: </h3></b>
          {JSON.stringify(resultDetails)}
        </div>
      </div>
    )
  }

}

export default FoundationsError
