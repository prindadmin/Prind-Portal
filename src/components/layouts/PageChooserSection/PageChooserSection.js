import React, { Component } from 'react'
import ListItem from '../../../Components/common/page-tile'

import pageNames from '../../../Data/pageNames'

export class PageChooserSection extends Component {

  render() {
    return (
        <div className='chooser-section col-xl-2 col-lg-3 col-md-3 col-sm-3'>
          <div className='sidebar'>
            {
              Object.keys(pageNames).map(key => (
                <a key={key} href={`${pageNames[key].linkTo} here`}>

                  <ListItem
                    key={pageNames[key].name + "item"}
                    pageName={pageNames[key].name}
                    selected={this.props.location.pathname.startsWith(pageNames[key].linkTo)}
                    onClick={(e) => {
                      e.stopPropagation()
                      this.props.history.push(`${pageNames[key].linkTo}`)
                    }}
                  />
                </a>
              ))
            }
          </div>
        </div>
    )
  }
}


export default PageChooserSection
