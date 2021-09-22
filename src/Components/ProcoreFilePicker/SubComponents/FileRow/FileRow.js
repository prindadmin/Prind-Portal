import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classes from './FileRow.module.css'

// Data
import * as Strings from '../../../../Data/Strings'

// Functions
//import * as Functions from '../../../../Functions'

// Components
//import LoadingSpinner from '../../../LoadingSpinner'

// TODO: FUTURE: Add icon to the beginning of the file name depending on type
export class FileRow extends Component {
  static propTypes = {
    user: PropTypes.shape({
      foundationsId: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    doc: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      file_versions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        anchor: PropTypes.shape({
          entry_hash: PropTypes.string
        }),
        signatures: PropTypes.arrayOf(PropTypes.shape({
          entry_hash: PropTypes.string
        })),
      })).isRequired,
    }),
    procore: PropTypes.shape({
      companyId: PropTypes.string.isRequired,
      projectId: PropTypes.string.isRequired,
    }).isRequired,
    onFileSelected: PropTypes.func.isRequired
  }


  getLatestFileVersion = (doc) => {
    // Find if of the latest version of the file uploaded
    const latestVersion = doc.file_versions.reduce(function(prev, current) {
      return (Date.parse(prev.created_at) > Date.parse(current.created_at)) ? prev : current
    })
    return latestVersion
  }


  // TODO: BUG: Test this because it seems to open with the url appended to the current address bar content
  fileDownloadButton = (doc, index) => {
    const id = `filedownloadbutton-${index}`

    const latestVersion = this.getLatestFileVersion(doc)
    return (
      <button id={id} type="submit" className={ classes.iconButton } >
        <img className={classes.img} src='/images/icons/download.svg' onClick={(e) => window.open(latestVersion.url, "_blank")} alt={Strings.BUTTON_DOWNLOAD} />
      </button>
    )
  }


  fileSelectButton = (doc, index) => {
    const id = `filesignbutton-${index}`

    return (
      <button id={id} type="submit" className={ classes.textButton } onClick={(e) => this.fileSelected(doc)} >
        { Strings.BUTTON_SELECT_FILE }
      </button>
    )
  }


  fileSelected = (doc) => {
    this.props.onFileSelected(doc)
  }

  render() {
    const { index, doc } = this.props
    const isEven = index % 2 === 0
    const style = isEven ? { backgroundColor: "var(--prind-palette-color-9)" } : {}
    return (
      <React.Fragment>
        <div key={`file-${index}-document-name`} className={classes.field} style={style}>{doc.name}</div>
        <div key={`file-${index}-document-description`} className={classes.field} style={style}>{doc.description}</div>
        <div key={`file-${index}-document-download-button`} className={classes.field} style={style}>{this.fileDownloadButton(doc, index)}</div>
        <div key={`file-${index}-document-select-button`} className={classes.field} style={style}>{this.fileSelectButton(doc, index)}</div>
      </React.Fragment>
    )
  }
}

export default FileRow
