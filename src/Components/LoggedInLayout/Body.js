import React from 'react'
import PropTypes from 'prop-types'
import classes from './Body.module.css'

const BodySection = props => {

  const bodyClass = props.noFoundationsBannerShowing ? classes.bodySectionWithBanner : classes.bodySection

  return (
    <div id='logged-in-body-section' className={classes.bodySection}>
        { props.children }
    </div>
  )
}

BodySection.propTypes = {
  children: PropTypes.array,
  noFoundationsBannerShowing: PropTypes.bool
}

export default BodySection
