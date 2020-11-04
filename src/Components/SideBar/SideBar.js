import React, { Component } from 'react'
import ListItem from '../common/page-tile'

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
                <a key={key} href={`${pageNames[key].linkTo}${pathForProject}`}>

                  <ListItem
                    key={pageNames[key].name + "item"}
                    pageName={pageNames[key].name}
                    selected={this.props.location.pathname.startsWith(pageNames[key].linkTo)}
                    onClick={(e) => {
                      e.stopProprogation()
                      console.log("link clicked")
                      this.props.history.push(`${pageNames[key].linkTo}${pathForProject}`)
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


export default SideBar
