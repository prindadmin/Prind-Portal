import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Status extends Component {
  static propTypes = {
    status: PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      status: null,
    }
  }

  componentDidMount () {
    this.setState({
      status: this.props.status
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props.status !== prevProps.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {

    var classNameForMissing = null;
    var classNameForSignature = null;
    var classNameForCompleted = null;

    const status = this.state.status;

    status === "missing" ? classNameForMissing = "status-circle missing-active" : classNameForMissing = "status-circle not-active"
    status === "signature" ? classNameForSignature = "status-circle signature-active" : classNameForSignature = "status-circle not-active"
    status === "complete" ? classNameForCompleted = "status-circle completed-active" : classNameForCompleted = "status-circle not-active"

    return(
      <div className='status-section'>
        <div className='status-circles'>
          <div className={classNameForMissing} />
          <div className={classNameForSignature} />
          <div className={classNameForCompleted} />
        </div>
      </div>
    )
  }

}

export default Status
