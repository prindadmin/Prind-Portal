import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    }).isRequired
  }

  onFolderClick = () => {
    console.log("folder clicked with id:", this.props.folder.id)
    console.log(this.props.history.location)
    var historyState = this.props.history.location.state
    if (!historyState) {
      historyState = {}
    }
    historyState[this.props.folder.id] = this.props.folder.name
    this.props.history.push(`${this.props.location.pathname}/${this.props.folder.id}`, historyState)
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
      <div id='folder-name-holder' onClick={this.onFolderClick}>
        <img src={this.folderIcon()} alt='' />
        { name }
      </div>
    )
  }

  render() {
    const { index, folder } = this.props
    const isEven = index % 2 === 0
    const style = isEven ? { backgroundColor: "var(--palette-color-9)" } : {}

    // If this folder isn't accessible, don't show it
    if(folder.is_deleted || folder.is_recycle_bin) {
      return null
    }

    return (
      <React.Fragment key={`react-fragment-folder-${index}`}>
        <div key={`folder-${index}-name`}                           className='field' style={style}>{this.getNameDiv(folder.name)}</div>
        <div key={`folder-${index}-document-description`}           className='field center' style={style}></div>
        <div key={`folder-${index}-document-versions`}              className='field center' style={style}></div>
        <div key={`folder-${index}-document-anchor-button`}         className='field center' style={style}></div>
        <div key={`folder-${index}-document-sign-button`}           className='field center' style={style}></div>
        <div key={`folder-${index}-document-view-versions-button`}  className='field center' style={style}></div>
      </React.Fragment>
    )
  }
}

export default FolderRow
