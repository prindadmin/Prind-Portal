import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ListItem from '../Common/page-tile'
import PAGENAMES from '../../Data/pageNames'

// TODO: Combine sidebars into one root component folder

export class SideBar extends Component {
  static propTypes = {
    projects: PropTypes.shape({
      chosenProject: PropTypes.shape({
        projectId: PropTypes.string.isRequired,
        projectType: PropTypes.string,
      })
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }


  pageAllowedCheck = (pageName, sidebarEntries, pageRequested) => {
    // If the page doesn't exist in this project
    if (pageRequested === undefined ) {
      // and so long as the page isn't a common page, navigate to the first available page
      if (!PAGENAMES.CommonPages.includes(pageName)) {
        const pageToLoad = sidebarEntries[Object.keys(sidebarEntries)[0]].linkTo
        //console.log(`loading page: ${pageToLoad}`)
        this.props.history.push(`${pageToLoad}`)
      }
    }
  }


  render() {

    const { location, projects } = this.props
    const { chosenProject } = projects
    const { projectId } = chosenProject

    const pathForProject = projectId !== "" ? `/${projectId}` : ""
    // Removed to allow separate DHSF and CDM2015 project portals
    //const sidebarEntries = PAGENAMES[projectType] === undefined ? PAGENAMES["CDM2015Project"] : PAGENAMES[projectType]
    const sidebarEntries = PAGENAMES[process.env.REACT_APP_PORTAL]

    // If the current page isn't found in the current type (such as when changing projects)
    // Go to the first entry in the sidebarEntries
    const pageName = location.pathname.split("/")[1]
    //console.log("page requested: ", pageName)

    const pageRequested = sidebarEntries[pageName]
    //console.log(`Sidebar page requested`, pageRequested)

    // Check that the requested page can be loaded
    this.pageAllowedCheck(pageName, sidebarEntries, pageRequested)

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
