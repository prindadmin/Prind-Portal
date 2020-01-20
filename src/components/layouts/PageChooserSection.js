import React from 'react'
import ListItem from '../../components/common/page-tile'

import pageDetails from '../../data/pageDetails'

const PageChooserSection = props => {

  return (
      <div className='chooser-section col-xl-2 col-lg-3 col-md-3 col-sm-3'>
        <div className='sidebar'>
          {
            Object.keys(pageDetails).map(key => (
              <a key={key} href={`/#/${key}`}>

                <ListItem
                  key={pageDetails[key].name + "item"}
                  pageDetails={pageDetails[key]}
                  selected={pageDetails[key].name.toString() === window.location.pathname.replace("/", "")}
                  onClick={() => {
                    this.props.history.push(`/#/${pageDetails[key].name}`)
                  }}
                />
              </a>
            ))
          }
        </div>
      </div>
  )
}


export default PageChooserSection
