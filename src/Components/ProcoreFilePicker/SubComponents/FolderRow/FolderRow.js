import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classes from './FolderRow.module.css'

export class FolderRow extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    folder: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      name_with_path: PropTypes.string.isRequired,
      parent_id: PropTypes.number.isRequired,
      is_deleted: PropTypes.bool.isRequired,
      is_recycle_bin: PropTypes.bool.isRequired,
      has_children: PropTypes.bool.isRequired,
      has_children_files: PropTypes.bool.isRequired,
      has_children_folders: PropTypes.bool.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    procore: PropTypes.shape({
      currentFolder: PropTypes.number,
      folderHistory: PropTypes.shape({
        chain: PropTypes.arrayOf(PropTypes.number).isRequired
      }).isRequired,
    }).isRequired,
    updateFolderHistory: PropTypes.func.isRequired,
    updateCurrentFolder: PropTypes.func.isRequired
  }

  onFolderClick = () => {
    console.log("folder clicked with id:", this.props.folder.id)
    var folderHistory = this.props.procore.folderHistory
    folderHistory[this.props.folder.id] = this.props.folder.name
    const newChain = folderHistory.chain.concat(this.props.folder.id)
    folderHistory.chain = newChain
    this.props.updateFolderHistory(folderHistory)
    this.props.updateCurrentFolder(this.props.folder.id)
  }

  // Replace folder icon depending on content
  folderIcon = () => {
    if (this.props.folder.has_children) {
      return '/images/icons/folder-with-children.svg'
    }
    return '/images/icons/folder.svg'
  }

  getNameDiv = (name) => {
    return (
      <div id='folder-name-holder' className={classes.folderNameHolder} onClick={this.onFolderClick}>
        <img className={classes.folderNameHolderImg} src={this.folderIcon()} alt='' />
        { name }
      </div>
    )
  }

  render() {
    const { index, folder } = this.props
    const isEven = index % 2 === 0
    const style = isEven ? { backgroundColor: "var(--prind-palette-color-9)" } : {}

    // If this folder isn't accessible, don't show it
    if(folder.is_deleted || folder.is_recycle_bin) {
      return null
    }

    return (
      <React.Fragment key={`react-fragment-folder-${index}`}>
        <div key={`folder-${index}-name`}                           className={classes.field} style={style}>{this.getNameDiv(folder.name)}</div>
        <div key={`folder-${index}-document-description`}           className={classes.fieldCenter} style={style}></div>
        <div key={`folder-${index}-document-download-button`}       className={classes.fieldCenter} style={style}></div>
        <div key={`folder-${index}-document-select-button`}         className={classes.fieldCenter} style={style}></div>
      </React.Fragment>
    )
  }
}

export default FolderRow
