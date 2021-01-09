import React, { Component } from 'react'
import ListItem from '../Common/page-tile'

import PAGENAMES from '../../Data/pageNames'

export class SideBar extends Component {

  render() {

    const { chosenProject } = this.props.projects
    const { projectId, projectType } = chosenProject

    const pathForProject = projectId !== "" ? `/${projectId}` : ""


    const sidebarEntries = PAGENAMES[projectType] === undefined ? PAGENAMES["CDM2015Project"] : PAGENAMES[projectType]

    return (
        <div className='chooser-section col-xl-2 col-lg-3 col-md-3 col-sm-3'>
          <div className='sidebar'>
            {
              Object.keys(sidebarEntries).map(key => (
                <ListItem
                  key={sidebarEntries[key].name + "item"}
                  pageName={sidebarEntries[key].name}
                  linkTo={`${sidebarEntries[key].linkTo}${pathForProject}`}
                  selected={this.props.location.pathname.startsWith(sidebarEntries[key].linkTo)}
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
