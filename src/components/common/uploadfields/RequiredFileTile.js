import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { FileInput, Button } from '@blueprintjs/core'

import HashSection from './hash'
import SpinnerSection from './spinner'
import FoundationsSuccess from './foundations-result'
import StatusSection from './status'

var hash = require('hash.js')

export class RequiredFileTile extends Component {
  static propTypes = {
    details: PropTypes.object,
  }

  componentDidMount() {
    this.setState({
      details: this.props.details
    })
  }


  fileChosen = (e) => {
    // Update the text inside the file picker

    var details = this.state.details

    details.prompt = e.target.value.replace("C:\\fakepath\\", "")
    details.hasChosen = true

    this.setState({
      details: details
    })
  }

  submitFile = (e) => {
    // Once the user clicks the submit button, send the data to Foundations
    // TODO: For now, this doesn't send the data anywhere.

    var details = this.state.details

    var hashResult = hash.sha256().update(details.prompt).digest('hex')

    details.hasHash = true
    details.hash = hashResult
    details.hasSubmitted = true
    details.status = "signature"

    this.setState({
      details: details
    })

  }



  render() {

    var classNameForFilePicker = "field bp3-fill"
    const details = this.state != null ? this.state.details : this.props.details

    return (
        <div className='required-field' key={details.id}>
          <h2>{details.title}</h2>
          <div className='row'>
            <label className="bp3-fill bp3-file-input col-xl-9 col-lg-9 col-md-8 col-sm-7 col-margin">
              <FileInput
                className={classNameForFilePicker}
                ref='fileInput'
                onInputChange={(e) => this.fileChosen(e)}
                text={details.prompt}
              />
            </label>

            <label className="bp3-fill bp3-file-input button col-xl-3 col-lg-3 col-md-4 col-sm-5 col-margin">
              <Button
                className='submit-button bp3-intent-primary'
                ref='submitButton'
                onClick={(e) => this.submitFile(e)}
                text='Upload File'
              />
            </label>
          </div>
          {/* Load the hash value if data has been hashed */}
          { details.hasHash ? <HashSection id={ details.id } hashValue={ details.hash } signatureListener={ this.onRequestSignatureClick } /> : null }
          {/* Load a spinner if data is still being fetched */}
          { details.hasSubmitted && !details.hasReceived ? <SpinnerSection /> : null }
          {/* Load the result if the data has been fetched */}
          { details.hasSuccess ? <FoundationsSuccess resultDetails={details.dataReceived} /> : null}
          {/* Show the status of the document */}
          <StatusSection status={ details.status }/>
          <hr />
        </div>
    )
  }

}

export default RequiredFileTile
