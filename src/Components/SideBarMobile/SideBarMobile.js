import React, { Component } from 'react'
import ItemIcon from '../Common/ItemIcon'

import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

import PAGENAMES from '../../Data/pageNames'

// TODO: work out why the popover arrow isn't pointing to the menu button

export class SideBar extends Component {

  handleElementSelect = (query) => {
    console.log(query)
    console.log('linkTo: ', query.linkTo);

    const { history, projects } = this.props
    const { projectId } = projects.chosenProject
    var projectRoute = ''

    // Get the current project (if present)
    if(projectId !== "") {
      projectRoute = `/${projectId}`
    }

    history.push(`${query.linkTo}${projectRoute}`)
  }

  // Render each item in the list
  itemRenderer = (item) => {
    return (
      <MenuItem
        key={item.name}
        onClick={(e) => this.handleElementSelect(item)}
        text={item.name}
        shouldDismissPopover
      />
    )
  }

  pageNamesToList = () => {

    const { chosenProject } = this.props.projects
    const { projectType } = chosenProject

    const menuEntries = PAGENAMES[projectType] === undefined ? PAGENAMES["CDM2015Project"] : PAGENAMES[projectType]

    const pageNameList = Object.keys(menuEntries).map(page => {
      return {
        name: menuEntries[page].name,
        linkTo: menuEntries[page].linkTo
      }
    })

    return pageNameList
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
    const { projectType } = projects.chosenProject

    const sidebarEntries = PAGENAMES[projectType] === undefined ? PAGENAMES["CDM2015Project"] : PAGENAMES[projectType]

    // If the current page isn't found in the current type (such as when changing projects)
    // Go to the first entry in the sidebarEntries
    const pageName = location.pathname.split("/")[1]
    //console.log("page requested: ", pageName)

    const pageRequested = sidebarEntries[pageName]
    //console.log(`Sidebar page requested`, pageRequested)

    // Check that the requested page can be loaded
    this.pageAllowedCheck(pageName, sidebarEntries, pageRequested)

    return (
        <div className='chooser-section col-12'>
          <div className='sidebar'>
            <Select
              items={this.pageNamesToList()}
              itemRenderer={this.itemRenderer}
              filterable={false}
              >
              <Button icon={<ItemIcon size='1x' type='burger' />} />
            </Select>
          </div>
        </div>
    )
  }
}


export default SideBar
