import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classes from './ProcoreBreadcrumbs.module.css'

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
    }).isRequired,
    procore: PropTypes.shape({
      folderHistory: PropTypes.shape({
        chain: PropTypes.array.isRequired
      }).isRequired,
    }).isRequired
  }

  onCrumbClick = (folder) => {
    //var folderHistory = this.props.procore.folderHistory

    // If the root folder is sent, do something special
    var folderHistory = this.props.procore.folderHistory
    if (folder.root) {
      this.props.updateCurrentFolder()
      folderHistory.chain = []
      this.props.updateFolderHistory(folderHistory)
      return;
    }
    // Otherwise, go back to the requested crumb
    this.props.updateCurrentFolder(folder.id)
    var newChain = [...folderHistory.chain]
    newChain = newChain.slice(0, newChain.indexOf(folder.id) + 1)
    folderHistory.chain = newChain
    this.props.updateFolderHistory(folderHistory)
  }


  getCrumbs = () => {
    const folders = this.props.procore.folderHistory.chain
    // Create the root folder crumb
    const rootCrumb = (
      <div key="root-crumb" id="root" className={classes.crumb} onClick={(e) => this.onCrumbClick({ root: true })}>
        { "> root" }
      </div>
    )
    // Map all the folders in the address bar to crumbs
    const crumbs = folders.map((folder, index) => {
      const crumbName = this.props.procore.folderHistory[folder]
      return (
        <div key={index} id={crumbName.replace(" ", "")} className={classes.crumb} onClick={(e) => this.onCrumbClick({ id: folder, name: crumbName })}>
          { `> ${crumbName}` }
        </div>
      )
    })
    // Return the crumbs
    return <Fragment>{ rootCrumb }{ crumbs }</Fragment>
  }

  render() {
    return (
      <div className={classes.breadcrumbTable}>
        { this.getCrumbs() }
      </div>
    )
  }
}

export default ProcoreBreadcrumbs
