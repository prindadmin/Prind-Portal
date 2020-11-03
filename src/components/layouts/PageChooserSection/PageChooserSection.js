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
                <a key={key} href={`${key}`}>

                  <ListItem
                    key={pageNames[key].name + "item"}
                    pageName={pageNames[key].name}
                    selected={pageNames[key].linkTo.replace("/", "") === this.props.location.pathname.replace("/", "")}
                    onClick={() => {
                      this.props.history.push(`/#/${pageNames[key].linkTo}`)
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
