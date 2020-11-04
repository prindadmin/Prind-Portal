import React from 'react'
import PropTypes from 'prop-types'

const ContentArea1x1 = props => {
  return (
    <div id='logged-in-content-area-1x1' className='col-xl-10 col-lg-9 col-md-9 col-sm-9'>
      { props.children }
    </div>
  )
}

ContentArea1x1.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default ContentArea1x1
