import React from 'react'

const PageChooserSection = props => {
  return (
      <div className='chooser-section col-xl-2 col-lg-3 col-md-3 col-sm-3'>
        <div className='sidebar'>
          {props.children}
        </div>
      </div>
  )
}


export default PageChooserSection
