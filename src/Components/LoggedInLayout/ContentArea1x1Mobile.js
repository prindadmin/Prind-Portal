import React from 'react'
import PropTypes from 'prop-types'

const ContentArea1x1Mobile = props => {
  return (
    <div id='logged-in-content-area-1x1' className='col-12'>
      { props.children }
    </div>
  )
}

ContentArea1x1Mobile.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default ContentArea1x1Mobile
