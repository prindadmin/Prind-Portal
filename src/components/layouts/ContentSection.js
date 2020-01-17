import React from 'react'

const ContentSection = props => {
  return (
      <div className='content-section col-xl-10 col-lg-9 col-md-9 col-sm-9 full-height'>
        {props.children}
      </div>
  )
}


export default ContentSection
