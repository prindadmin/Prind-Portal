import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify';
import classes from './FileRow.module.css'

// Data
import * as Strings from '../../../../Data/Strings'

// Functions
import * as Functions from '../../../../Functions'

// Components
//import VersionTable from '../../../ProcoreDocumentVersionTable'
const LoadingSpinner = lazy(() => import('../../../LoadingSpinner'))

// TODO: Implement anchor and sign functionality
// TODO: Add icon to the beginning of the file name depending on type
export class FileRow extends Component {
  static propTypes = {
    user: PropTypes.shape({
      foundationsId: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    doc: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      file_versions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        anchor: PropTypes.shape({
          entryHash: PropTypes.string
        }).isRequired,
        signatures: PropTypes.arrayOf(PropTypes.shape({
          entryHash: PropTypes.string
        })).isRequired,
      })).isRequired,
    }),
    procore: PropTypes.shape({
      companyId: PropTypes.string.isRequired,
      projectId: PropTypes.string.isRequired,
    }).isRequired,
    getProjectFilesAndFolders: PropTypes.func.isRequired,
    requestDocumentAnchor: PropTypes.func.isRequired,
    requestDocumentSelfSignature: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      isShowingVersions: false,
      anchoring: false,
      signing: false,
    }
  }

  refreshData = () => {
    const { companyId, projectId } = this.props.procore
    var payload = {
      companyId,
      projectId
    }
    const lastElement = this.props.location.pathname.split("/").slice(-1)[0]
    if (lastElement !== "documents") {
      payload.folderId = lastElement
    }
    this.props.getProjectFilesAndFolders(payload)
  }


  getLatestFileVersion = (doc) => {
    // Find if of the latest version of the file uploaded
    const latestVersion = doc.file_versions.reduce(function(prev, current) {
      return (Date.parse(prev.created_at) > Date.parse(current.created_at)) ? prev : current
    })
    return latestVersion
  }


  fileAnchorButton = (doc, index) => {
    const id = `fileanchorbutton-${index}`
    const latestFileVersion = this.getLatestFileVersion(doc)

    if (this.state.anchoring) {
      return (
        <button id={id} type="submit" className={classes.submitButton} >
          <LoadingSpinner size={20} color="white" />
        </button>
      )
    }

    // If the latest file version doesn't have an anchor, return the request anchor button
    if (latestFileVersion.anchor.entryHash === undefined) {
      return (
        <input
          id={id}
          type="submit"
          value={ Strings.BUTTON_ANCHOR }
          className="submit-button"
          onClick={(e) => this.anchorDocument(doc)} />
      )
    }

    // If the latest file version does have an anchor, return the view anchor button
    return (
      <input
        id={id}
        type="submit"
        value={ Strings.BUTTON_VIEW_ANCHOR }
        className="submit-button"
        onClick={(e) => window.open(`${process.env.REACT_APP_FACTOM_EXPLORER_SITE}/${latestFileVersion.anchor.entryHash}`, "_blank")} />
    )
  }

  anchorDocument = (doc) => {
    //console.log("anchor document requested")
    const { companyId, projectId } = this.props.procore
    const fileId = this.getLatestFileVersion(doc).file_id
    // Build the payload
    const payload = {
      companyId,
      projectId,
      fileId
    }
    // Send id to reducer
    this.props.requestDocumentAnchor(payload, this.onSuccessAnchoring, this.onFailedAnchoring)
    this.setState({
      anchoring: true
    })
  }

  // TODO: Remove this delay
  onSuccessAnchoring = (result) => {
    //console.log(result)
    setTimeout(function (){
      this.setState({
        anchoring: false
      })
      this.refreshData()
    }.bind(this), 1000);
    toast.dark(Strings.ERROR_ANCHORING_FAILED)
  }

  onFailedAnchoring = (result) => {
    //console.error(result)
    this.setState({
      anchoring: false,
    })
    toast.dark(Strings.ERROR_ANCHORING_FAILED)
  }


  fileSignButton = (doc, index) => {
    const id = `filesignbutton-${index}`

    if (this.state.signing) {
      return (
        <button id={id} type="submit" className={classes.submitButton} >
          <LoadingSpinner size={20} color="white" />
        </button>
      )
    }

    return (
      <input
        id={id}
        type="submit"
        disabled={!Functions.checkIfCanSign(this.props.user)}
        value={ Strings.BUTTON_SIGN }
        className="submit-button"
        onClick={(e) => this.signDocument(doc)} />
    )
  }

  signDocument = (doc) => {
    //console.log("sign document requested")
    const { companyId, projectId } = this.props.procore
    const fileId = this.getLatestFileVersion(doc).file_id
    // Build the payload
    const payload = {
      companyId,
      projectId,
      fileId
    }
    // Send id to reducer
    this.props.requestDocumentSelfSignature(payload, this.onSuccessSigning, this.onFailedSigning)
    this.setState({
      signing: true
    })
  }

  // TODO: Remove this delay
  onSuccessSigning = (result) => {
    //console.log(result)
    setTimeout(function (){
      this.setState({
        signing: false
      })
      this.refreshData()
    }.bind(this), 1000);
  }

  onFailedSigning = (result) => {
    //console.error(result)
    this.setState({
      signing: false
    })
    toast.dark(Strings.ERROR_SIGNING_FAILED)
  }

  fileViewVersionsButton = (doc, index) => {
    const id = `fileversionsbutton-${index}`
    return (
      <input
        id={id}
        type="submit"
        value={ this.state.isShowingVersions ? Strings.BUTTON_CLOSE_VERSIONS : Strings.BUTTON_VIEW_VERSIONS }
        className="submit-button"
        onClick={(e) => this.setState({ isShowingVersions: !this.state.isShowingVersions })} />
    )
  }

  render() {
    const { index, doc } = this.props
    const isEven = index % 2 === 0
    const style = isEven ? { backgroundColor: "var(--palette-color-9)" } : {}
    return (
      <React.Fragment>
        <div key={`file-${index}-document-name`} className='field' style={style}>{doc.name}</div>
        <div key={`file-${index}-document-description`} className='field' style={style}>{doc.description}</div>
        <div key={`file-${index}-document-versions`} className='field' style={style}>{doc.file_versions.length}</div>
        <div key={`file-${index}-document-anchor-button`} className='field' style={style}>{this.fileAnchorButton(doc, index)}</div>
        <div key={`file-${index}-document-sign-button`} className='field' style={style}>{this.fileSignButton(doc, index)}</div>
        <div key={`file-${index}-document-view-versions-button`} className='field' style={style}>{this.fileViewVersionsButton(doc, index)}</div>
        { /*
          this.state.isShowingVersions ?
          <div key={`file-${index}-document-view-versions-table`} className='sub-table' style={style}>
             <VersionTable doc={ doc }/>
          </div>: null
        */}
      </React.Fragment>
    )
  }
}

export default FileRow
