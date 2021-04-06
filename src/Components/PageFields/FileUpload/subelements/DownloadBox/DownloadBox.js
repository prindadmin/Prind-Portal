import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ItemIcon from '../../../../Common/ItemIcon'
import * as Strings from '../../../../../Data/Strings'

export class DownloadBox extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    fieldID: PropTypes.string.isRequired,
    fileVersionDetails: PropTypes.shape({
      ver: PropTypes.string.isRequired
    }).isRequired,
    onDownloadSuccess: PropTypes.func.isRequired,
    onDownloadFailure: PropTypes.func.isRequired,
    downloadFile: PropTypes.func.isRequired,
    resetDownloadURL: PropTypes.func.isRequired
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

    const { projectId, pageName, fieldID, fileVersionDetails, downloadFile } = this.props

    this.setState({
      fetchError: false,
    })

    downloadFile(
      projectId,
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
      <div id='download-box' className="download-box" onClick={(e) => this.downloadFile(e)}>
        <div>
          <ItemIcon size={itemSize} type='download' />
          <p>{Strings.DOWNLOAD}</p>
        </div>
      </div>
    )

  }
}

export default DownloadBox
