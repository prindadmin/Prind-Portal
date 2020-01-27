import React, { Component } from 'react'
import ListItem from '../../../components/common/page-tile'

import pageNames from '../../../data/pageNames'

export class PageChooserSection extends Component {

  render() {
    return (
        <div className='chooser-section col-xl-2 col-lg-3 col-md-3 col-sm-3'>
          <div className='sidebar'>
            {
              Object.keys(pageNames).map(key => (
                <a key={key} href={`/#/${key}`}>

                  <ListItem
                    key={pageNames[key].name + "item"}
                    pageName={pageNames[key].name}
                    selected={key.toString() === this.props.location.pathname.replace("/", "")}
                    onClick={() => {
                      this.props.history.push(`/#/${key}`)
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
