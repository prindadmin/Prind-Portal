import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'
import classes from './ProcoreFilePicker.module.css'
import Popover from '../Popover'

import LoadingSpinner from '../LoadingSpinner'
import ErrorBoundary from '../ErrorBoundary'

import * as Strings from '../../Data/Strings'
import * as ComponentStates from '../ComponentStates'

// Components
import ProcoreBreadcrumbs from '../ProcoreBreadcrumbs'
const FullScreenTile = lazy(() => import('../FullScreenTile'));
const FileRow = lazy(() => import('./SubComponents/FileRow'));
const FolderRow = lazy(() => import('./SubComponents/FolderRow'));


export class ProcoreFilePicker extends Component {
  static propTypes = {
    procore: PropTypes.shape({
      companyId: PropTypes.string.isRequired,
      projectId: PropTypes.string.isRequired,
      currentFolder: PropTypes.number,
      folderHistory: PropTypes.shape().isRequired,
      searchTerm: PropTypes.string.isRequired,
      folders: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          name_with_path: PropTypes.string.isRequired,
          parent_id: PropTypes.number.isRequired,
          is_deleted: PropTypes.bool.isRequired,
          is_recycle_bin: PropTypes.bool.isRequired,
          has_children: PropTypes.bool.isRequired,
          has_children_files: PropTypes.bool.isRequired,
          has_children_folders: PropTypes.bool.isRequired,
        })
      ).isRequired,
      files: PropTypes.arrayOf(
        PropTypes.shape({
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
        })
      ).isRequired,
    }).isRequired,
    getProjectFilesAndFolders: PropTypes.func.isRequired,
    onFileSelected: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      state: ComponentStates.LOADING,
      width: 0,
      height: 0,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateSagas()
  }

  // Removes the screen size listener when component is removed
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentDidUpdate(prevProps) {
    if (this.props.procore.currentFolder !== prevProps.procore.currentFolder) {
      this.updateSagas()
    }
  }

  updateSagas = () => {
    const { companyId, projectId } = this.props.procore
    var payload = {
      companyId,
      projectId
    }
    if (this.props.procore.currentFolder) {
      payload.folderId = this.props.procore.currentFolder
    }
    this.props.getProjectFilesAndFolders(payload, this.onResolveGetProjectFiles, this.onRejectGetProjectFiles)
    this.props.updateSearchTerm("")
    this.setState({
      state: ComponentStates.LOADING
    })
  }


  // Stores the current screen size in the components state
  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  onResolveGetProjectFiles = (result) => {
    //console.log(result)
    setTimeout(function() {
      this.setState({
        state: ComponentStates.QUIESCENT
      })
    }.bind(this), 100);
  }

  onRejectGetProjectFiles = (error) => {
    this.setState({
      state: ComponentStates.ERROR_WHEN_LOADING
    })
  }

  getFilteredFiles = () => {
    // If the search term is blank, return the full list
    if (this.props.procore.searchTerm === "") {
      return this.props.procore.files
    }
    // Otherwise, return the filtered list
    const filteredFiles = this.props.procore.files.filter((doc) => {
      return doc.name.startsWith(this.props.procore.searchTerm)
    })
    return filteredFiles
  }

  getFilteredFolders = () => {
    // If the search term is blank, return the full list
    if (this.props.procore.searchTerm === "") {
      return this.props.procore.folders
    }
    // Otherwise, return the filtered list
    const filteredFolders = this.props.procore.folders.filter((folder) => {
      return folder.name.startsWith(this.props.procore.searchTerm)
    })
    return filteredFolders
  }

  mapFoldersToDivsDesktop = () => {
    const mappedFolders = this.getFilteredFolders().map((folder, index) => {
      return <FolderRow key={index} index={index} folder={folder} />
    })
    return mappedFolders
  }

  mapFilesToDivsDesktop = () => {
    const mappedDocuments = this.getFilteredFiles().map((doc, index) => {
      return <FileRow key={index} index={index} doc={doc} onFileSelected={this.fileSelected} />
    })
    return mappedDocuments
  }

  // TODO: FEATURE: Mobile version
  mapFilesToDivsMobile = () => {
    const mappedDocuments = this.getFilteredFiles().map((doc, index) => {
        //return <ProcoreDocumentTableMobileTile key={index} doc={doc} />
        return null
    })
    return mappedDocuments
  }


  fileSelected = (doc) => {
    this.props.onFileSelected(doc)
  }


  getPopulatedTableDesktopResolution = () => {
    return (
      <React.Fragment key={'react-fragment'}>
        <div id='document-name' className={classes.heading}>{Strings.PROCORE_DOCUMENT_NAME}</div>
        <div id='document-description' className={classes.heading}>{Strings.PROCORE_DOCUMENT_DESCRIPTION}</div>
        <div id='document-download-button' className={classes.headingCenter}>{Strings.PROCORE_DOCUMENT_DOWNLOAD}</div>
        <div id='document-select-button' className={classes.headingCenter}>{Strings.PROCORE_DOCUMENT_SELECT}</div>
        { this.mapFoldersToDivsDesktop() }
        { this.mapFilesToDivsDesktop() }
      </React.Fragment>
    )
  }

  getPopulatedTable = () => {
    const filteredLength = this.getFilteredFiles().length + this.getFilteredFolders().length
    if (filteredLength === 0 && this.props.procore.searchTerm === "") {
      return (
        <FullScreenTile text={Strings.FULL_SCREEN_NO_FILES} icon='file-search' style={{ gridColumnStart: "1", gridColumnEnd: "-1" }}/>
      )
    }
    if (filteredLength === 0) {
      return (
        <FullScreenTile text={Strings.FULL_SCREEN_FILTER_TOO_HARSH} icon='file-search' style={{ gridColumnStart: "1", gridColumnEnd: "-1" }}/>
      )
    }
    if (this.state.width < 1024) {
      return this.mapFilesToDivsMobile()
    }
    return this.getPopulatedTableDesktopResolution()
  }

  getErrorMessage = () => {
    return (
      <FullScreenTile text={Strings.ERROR_FETCHING_DATA} icon='times-circle' >
        <button className={classes.retryButton} onClick={this.updateSagas} >{Strings.BUTTON_RETRY}</button>
      </FullScreenTile>
    )
  }

  render () {
    return (
      <Popover handleClose={this.props.handleClose} style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
        <div className={classes.container}>
          <img className={ classes.closeButton }src='/images/icons/times-circle.svg' onClick={(e) => this.props.handleClose()} alt={Strings.BUTTON_CLOSE} />
          {
            this.state.state === ComponentStates.LOADING ? <LoadingSpinner style={{ margin: "auto" }} /> : null
          }
          {
            this.state.state === ComponentStates.ERROR_WHEN_LOADING ? this.getErrorMessage() : null
          }
          {
            this.state.state === ComponentStates.QUIESCENT ?
              <ErrorBoundary onRetry={this.updateSagas}>
                <ProcoreBreadcrumbs />
                <div className={classes.navTable}>
                  { this.getPopulatedTable() }
                </div>
              </ErrorBoundary> :
              null
          }
        </div>
      </Popover>
    )
  }
}

export default ProcoreFilePicker
