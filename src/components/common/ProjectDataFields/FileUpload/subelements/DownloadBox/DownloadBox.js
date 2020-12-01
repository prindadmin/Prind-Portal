import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ItemIcon from '../../../../ItemIcon'
import * as strings from '../../../../../../Data/Strings'

export class Element extends Component {
  static propTypes = {
    projectID: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    fieldID: PropTypes.string.isRequired,
    fileVersionDetails: PropTypes.object.isRequired,
    onDownloadSuccess: PropTypes.func.isRequired,
    onDownloadFailure: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      width: 0,
      height: 0,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }


  // Stores the current screen size in the components state
  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }


  componentWillUnmount() {
    this.props.resetDownloadURL()
    window.removeEventListener('resize', this.updateWindowDimensions);
  }


  downloadResolve = (url) => {
    const { onDownloadSuccess } = this.props
    window.open(url, "_blank")
    onDownloadSuccess()
  }


  downloadReject = () => {
    const { onDownloadFailure } = this.props
    onDownloadFailure()
  }


  downloadFile = (e) => {

    const { projectID, pageName, fieldID, fileVersionDetails, downloadFile } = this.props

    this.setState({
      fetchError: false,
    })

    downloadFile(
      projectID,
      pageName,
      fieldID,
      fileVersionDetails.ver,
      this.downloadResolve,
      this.downloadReject,
    )

  }

  render () {

    var itemSize = "4x"

    this.state.width < 992 ? itemSize = "3x" : itemSize = "4x"

    return (
      <div className="download-box" onClick={(e) => this.downloadFile(e)}>
        <div>
          <ItemIcon size={itemSize} type='download' />
          <p>{strings.DOWNLOAD}</p>
        </div>
      </div>
    )

  }
}

export default Element
