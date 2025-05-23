import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classes from './DownloadBox.module.css'

import ItemIcon from '../../../../Common/ItemIcon'
import * as Strings from '../../../../../Data/Strings'

const MOBILE_WIDTH_BREAKPOINT = 992;

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
    resetDownloadURL: PropTypes.func.isRequired,
    style: PropTypes.object,
    size: PropTypes.string
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
    const isMobileSize = this.state.width < MOBILE_WIDTH_BREAKPOINT || this.props.size === 'small'
    const itemSize = isMobileSize ? "3x" : "4x"

    var style = {}
    if (this.props.style) {
      style = Object.assign(this.props.style, style)
    }

    return (
      <div id='download-box' className={classes.downloadBox} style={style} onClick={(e) => this.downloadFile(e)}>
        <div>
          <ItemIcon size={this.props.size === 'small' ? "1x" : itemSize} type='download' />
          {
            isMobileSize ? null : <p>{Strings.DOWNLOAD}</p>
          }
        </div>
      </div>
    )

  }
}

export default DownloadBox
