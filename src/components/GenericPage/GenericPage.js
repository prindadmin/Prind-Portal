import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { FileInput, Button } from '@blueprintjs/core'

import Hash from './elements/hash'
import SpinnerSection from './elements/spinner'
import FoundationsSuccess from './elements/foundations-result'
import StatusSection from './elements/status'

var hash = require('hash.js')

export class GenericPage extends Component {
  static propTypes = {
    pageDetails: PropTypes.object,
  }

  constructor() {
    super();
    this.state = {
      status: "missing"
    }
  }

  componentDidMount () {
    this.setState({
      questions: this.props.pageDetails.questions
    })
  }


  fileChosen = (e, id) => {
    // Update the text inside the file picker

    var questions = this.state.questions

    questions[id].prompt = e.target.value
    questions[id].hasChosen = true

    this.setState({
      questions: questions
    })
  }

  submitFile = (e, id) => {
    // Once the user clicks the submit button, send the data to the Blockchain
    // NOTE: For now, this doesn't send the data anywhere.

    var questions = this.state.questions

    var hashResult = hash.sha256().update(questions[id].prompt).digest('hex')

    questions[id].hasHash = true
    questions[id].hash = hashResult
    questions[id].hasSubmitted = true
    questions[id].status = "signature"

    this.setState({
      questions: questions
    })

    this.receivedResult(hashResult, id)
  }

  receivedResult = (hashResult, id) => {
    // Once the result is received, update the state with the data

    var currentDate = new Date()
    var docName = this.state.questions[id].prompt

    docName = docName.split("\\")

    currentDate = this.formatDate(currentDate)

    const result = {
      entryHash: hashResult,
      docName: docName[docName.length - 1],
      entryDate: currentDate,
    }

    var questions = this.state.questions

    questions[id].hasReceived = true;
    questions[id].hasSuccess = true;
    questions[id].dataReceived = result;

    this.setState({
      questions: questions
    })
  }


  formatDate = (d) => {
    // return the date in the correct format

    return d.toISOString().slice(0,19).replace("T", " ")
  }


  onRequestSignatureClick = (id) => {
    this.startTimerUntilComplete(id)
  }


  startTimerUntilComplete = (id) => {
    setTimeout(function() {

      var questions = this.state.questions

      questions[id].status = "complete"

      this.setState({
        questions: questions
      })
    }.bind(this), 54 * 1000)
  }

  startProject = (e) => {
    console.log("should go to inception page")
    window.location.pathname = `/Inception`
  }


  render() {

    const { pageDetails } = this.props

    var classNameForFilePicker = "field bp3-fill"

    if (this.state.hasChosen) {
      classNameForFilePicker += " bp3-file-input-has-selection"
    }

    return(
      <div id='generic-page'>
        <div className='page-title'>
          <h1>{pageDetails.title}</h1>
          <span>{pageDetails.description}</span>
        </div>

        {
          this.state.questions != null ? this.state.questions.map((singleQuestion) => {

              return (
                <div className='form' key={singleQuestion.id}>
                  <h2>{singleQuestion.title}</h2>
                  <div className='row'>
                    <label className="bp3-fill bp3-file-input col-md-9 col-margin">
                      <FileInput
                        className={classNameForFilePicker}
                        ref='fileInput'
                        onInputChange={(e) => this.fileChosen(e, singleQuestion.id)}
                        text={singleQuestion.prompt}
                      />
                    </label>

                    <label className="bp3-fill bp3-file-input button col-md-3 col-margin">
                      <Button
                        className='submit-button bp3-intent-primary'
                        ref='submitButton'
                        onClick={(e) => this.submitFile(e, singleQuestion.id)}
                        text='Upload File'
                      />
                    </label>
                  </div>
                  {/* Load the hash value if data has been hashed */}
                  { singleQuestion.hasHash ? <Hash id={ singleQuestion.id } hashValue={ singleQuestion.hash } signatureListener={ this.onRequestSignatureClick } /> : null }
                  {/* Load a spinner if data is still being fetched */}
                  { singleQuestion.hasSubmitted && !singleQuestion.hasReceived ? <SpinnerSection /> : null }
                  {/* Load the result if the data has been fetched */}
                  { singleQuestion.hasSuccess ? <FoundationsSuccess resultDetails={singleQuestion.dataReceived} /> : null}
                  {/* Show the status of the document */}
                  <StatusSection status={singleQuestion.status}/>
                  <hr />
                </div>
              )
            }

          ) : null
        }
        {
          pageDetails.name === "Welcome" ?
          <Button
            className='submit-button bp3-intent-primary'
            ref='submitButton'
            onClick={(e) => this.startProject(e)}
            text='Start a Project'
          /> : null
        }

        </div>
    )
  }
}

export default GenericPage
