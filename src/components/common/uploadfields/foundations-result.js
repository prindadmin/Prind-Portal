import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class FoundationsResult extends Component {
  static propTypes = {
    resultDetails: PropTypes.object,
  }

  render() {

    // TODO: Update LAMBDA to return the right data
    // TODO: Make this format the correctly returned data

    const { resultDetails } = this.props

    var pattern = new RegExp(" ", "g")

    var hrefTarget = "FactomExplorer.html?entryHash=" + resultDetails.entryHash
    hrefTarget += "&docName=" + resultDetails.docName.replace(pattern, "%20")
    hrefTarget += "&entryDate=" + resultDetails.entryDate.replace(pattern, "%20")

    return (
      <div className='result-section'>
        <div className='result-details'>
          <b><h3>Data received:</h3></b>
          <span key={"hash"}><b>Document Hash:</b> {resultDetails.entryHash}<br/></span>
          <span key={"name"}><b>Document Name:</b> {resultDetails.docName}<br/></span>
          <span key={"date"}><b>Entry Date:</b> {resultDetails.entryDate} UTC<br/></span>
          <span><br/></span>
          <span key={"link"}><h2><a href={hrefTarget} target="_blank" rel="noopener noreferrer">See Entry in Blockchain</a></h2><br/></span>
        </div>
      </div>
    )
  }

}

export default FoundationsResult
