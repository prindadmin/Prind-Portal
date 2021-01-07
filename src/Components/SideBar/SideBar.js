import React, { Component } from 'react'
import ListItem from '../Common/page-tile'

import pageNames from '../../Data/pageNames'

export class SideBar extends Component {

  render() {

    const { projectId } = this.props.projects.chosenProject

    const pathForProject = projectId !== "" ? `/${projectId}` : ""

    return (
        <div className='chooser-section col-xl-2 col-lg-3 col-md-3 col-sm-3'>
          <div className='sidebar'>
            {
              Object.keys(pageNames).map(key => (
                <ListItem
                  key={pageNames[key].name + "item"}
                  pageName={pageNames[key].name}
                  linkTo={`${pageNames[key].linkTo}${pathForProject}`}
                  selected={this.props.location.pathname.startsWith(pageNames[key].linkTo)}
                  history={this.props.history}
                />
              ))
            }
          </div>
        </div>
    )
  }
}


export default SideBar
