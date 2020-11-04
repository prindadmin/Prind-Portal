import React from 'react'
import PropTypes from 'prop-types'

const BodySection = props => {
  return (
    <div id='logged-in-body-section' className='row'>
        { props.children }
    </div>
  )
}

BodySection.propTypes = {
  children: PropTypes.array
}

export default BodySection
