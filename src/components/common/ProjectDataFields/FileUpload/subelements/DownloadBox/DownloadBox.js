import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ItemIcon from '../../../../ItemIcon'
import * as strings from '../../../../../../Data/Strings'

export class Element extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    projectID: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    fieldID: PropTypes.string.isRequired,
    fileVersionDetails: PropTypes.object.isRequired,
    onDownloadSuccess: PropTypes.func.isRequired,
    onDownloadFailure: PropTypes.func.isRequired,
  }


  componentWillUnmount() {
    this.props.resetDownloadURL()
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

    const { auth, projectID, pageName, fieldID, fileVersionDetails, downloadFile } = this.props

    this.setState({
      fetchError: false,
    })

    downloadFile(
      auth.info.idToken.jwtToken,
      projectID,
      pageName,
      fieldID,
      fileVersionDetails.ver,
      this.downloadResolve,
      this.downloadReject,
    )

  }

  render () {

    return (
      <div className="download-box" onClick={(e) => this.downloadFile(e)}>
        <div>
          <ItemIcon size='4x' type='download' />
          {strings.DOWNLOAD}
        </div>
      </div>
    )

  }
}

export default Element
