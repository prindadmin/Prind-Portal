import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import Footer from '../common/footer'

import FileDetailPopover from "../common/ProjectDataFields/FileUpload/subelements/FileDetailPopover"

const fileDetails = [
  {
    "ver": 0,
    "uploadName": "file-v002.txt",
    "uploadedDateTime": "2020-01-30T12:04:59",
    "uploadedBy": "Jim Moriaty",
    "hash": "6c434ff047a8baff01375d4f744fd7508b68f36b19fa9111692504f6b2df9baf",
    "proofLink": "https://explorer.factoid.org/entry?hash=6c434ff047a8baff01375d4f744fd7508b68f36b19fa9111692504f6b2df9baf",
    "signatures": [
      {
        "signedBy": "did:did:74yw1upt9eeyy21sa3g4",
        "signerName": "Jim Moriaty",
        "signatureDateTime": "2020-01-30T13:52:08",
        "proofLink": "https://explorer.factoid.org/entry?hash=741f9d15ec73b9d2282a10956c946c24117ee69a7360cee0790d470c85f88d6b"
      },
      {
        "signedBy": "did:did:74yw1upt9eeyy21sa3g5",
        "signerName": "Irene Adler",
        "signatureDateTime": "2020-01-30T15:53:26",
        "proofLink": "https://explorer.factoid.org/entry?hash=4e52b2c5229244bec7517cd7505faca1d6fd0291a69b40d27f79cfb638f65ed5"
      }
    ]
  },
  {
    "ver": 1,
    "uploadName": "file-v001.txt",
    "uploadedDateTime": "2020-01-29T12:04:59",
    "uploadedBy": "Jim Moriaty",
    "hash": "ee78b5ad676d1855fff856a2cfae44ca41e84aaebd9ecca20cc975ea0c1b8c21",
    "proofLink": "https://explorer.factoid.org/entry?hash=ee78b5ad676d1855fff856a2cfae44ca41e84aaebd9ecca20cc975ea0c1b8c21",
    "signatures": [
      {
        "signedBy": "did:did:74yw1upt9eeyy21sa3g4",
        "signerName": "Jim Moriaty",
        "signatureDateTime": "2020-01-29T13:52:08",
        "proofLink": "https://explorer.factoid.org/entry?hash=6f08b7c0820ba73f75f61af8176236c0575565d07827951eb52956e06d5e158f"
      }
    ]
  },
  {
    "ver": 2,
    "uploadName": "file-v002.txt",
    "uploadedDateTime": "2020-01-30T12:04:59",
    "uploadedBy": "Jim Moriaty",
    "hash": "6c434ff047a8baff01375d4f744fd7508b68f36b19fa9111692504f6b2df9baf",
    "proofLink": "https://explorer.factoid.org/entry?hash=6c434ff047a8baff01375d4f744fd7508b68f36b19fa9111692504f6b2df9baf",
    "signatures": [
      {
        "signedBy": "did:did:74yw1upt9eeyy21sa3g4",
        "signerName": "Jim Moriaty",
        "signatureDateTime": "2020-01-30T13:52:08",
        "proofLink": "https://explorer.factoid.org/entry?hash=741f9d15ec73b9d2282a10956c946c24117ee69a7360cee0790d470c85f88d6b"
      },
      {
        "signedBy": "did:did:74yw1upt9eeyy21sa3g5",
        "signerName": "Irene Adler",
        "signatureDateTime": "2020-01-30T15:53:26",
        "proofLink": "https://explorer.factoid.org/entry?hash=4e52b2c5229244bec7517cd7505faca1d6fd0291a69b40d27f79cfb638f65ed5"
      }
    ]
  }
]



export class Page extends Component {
  static propTypes = {
    pageContent: PropTypes.object,
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  onClosePopup = () => {
    console.log("popup close request")
  }


  loadTestElement = () => {

    const latestFileDetails = fileDetails[0]
    const chosenFileDetails = fileDetails[1]
    const nextFileDetails = fileDetails[2]
    const previousFileDetails = {}


    return(
      <div id="test-page">
        <div className="center-container">
          <FileDetailPopover
            latestFileDetails={latestFileDetails}
            chosenFileDetails={chosenFileDetails}
            nextFileDetails={nextFileDetails}
            previousFileDetails={previousFileDetails}
            projectID={"ProjectNumberFour"}
            pageName={"inception"}
            fieldID={"1"}
            onClosePopover={this.onClosePopup}
          />
        </div>
      </div>
    )
  }



  render() {

    return (
      <div id='tender-page'>
        <div className="App-header">
          <HeaderBar />
        </div>

        <div className='content-with-sidebar full-height row'>

          <PageChooserSection />

          <div className='page-content-section col-xl-10 col-lg-9 col-md-9 col-sm-9'>
            {this.loadTestElement()}
          </div>

          <Footer />
        </div>
      </div>
    )
  }
}

export default Page
