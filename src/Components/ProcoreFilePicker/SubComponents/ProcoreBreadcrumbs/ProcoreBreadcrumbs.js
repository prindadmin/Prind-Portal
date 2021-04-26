import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as Endpoints from '../../Data/Endpoints'

export class ProcoreBreadcrumbs extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      location: PropTypes.shape({
        state: PropTypes.shape.isRequired
      }).isRequired
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }

  componentDidMount() {
    // If the user deep linked to this folder, push them to the top of the folder tree
    if (!this.props.history.location.state) {
      this.props.history.push(Endpoints.PROJECTDOCUMENTSPAGE)
    }
  }

  onCrumbClick = (folder) => {
    const historyState = this.props.history.location.state
    // If the root folder is sent, do something special
    if (folder.root) {
      this.props.history.push(Endpoints.PROJECTDOCUMENTSPAGE, historyState)
      return;
    }
    // Otherwise, go back to the requested crumb
    const splitPathname = this.props.location.pathname.split('/')
    const folders = splitPathname.slice(2)
    const folderIndex = folders.findIndex((element) => element === folder.id)
    const newFolders = folders.slice(0, folderIndex + 1)
    const newPath = `${Endpoints.PROJECTDOCUMENTSPAGE}/${newFolders.join('/')}`
    this.props.history.push(`${newPath}`, historyState)
  }


  getCrumbs = () => {
    const splitPathname = this.props.location.pathname.split('/')
    const folders = splitPathname.slice(2)
    // Create the root folder crumb
    const rootCrumb = (
      <div key="root-crumb" id="root" className='crumb' onClick={(e) => this.onCrumbClick({ root: true })}>
        { "> root" }
      </div>
    )
    // If the user deep linked to this folder, show only the root crumb
    if (!this.props.history.location.state) {
      return <React.Fragment>{ rootCrumb }</React.Fragment>
    }
    // Map all the folders in the address bar to crumbs
    const crumbs = folders.map((folder, index) => {
      const crumbName = this.props.history.location.state[folder]
      return (
        <div key={index} id={crumbName.replace(" ", "")} className='crumb' onClick={(e) => this.onCrumbClick({ id: folder, name: crumbName })}>
          { `> ${crumbName}` }
        </div>
      )
    })
    // Return the crumbs
    return <React.Fragment>{ rootCrumb }{ crumbs }</React.Fragment>
  }

  render() {
    return (
      <div id='breadcrumb-table'>
        { this.getCrumbs() }
      </div>
    )
  }
}

export default ProcoreBreadcrumbs
