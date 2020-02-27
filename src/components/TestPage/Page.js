import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import Footer from '../common/footer'

//import FileDetailPopover from "../common/ProjectDataFields/FileUpload/subelements/FileDetailPopover"

//import CreatingProjectPopover from "../NewProjectPage/elements/CreatingProjectPopover"
import {
  ProjectInvitationTile
} from "../ProfilePage/elements/requestsTab/elements"

const details = {
  "requestedBy": "a0c1bf48-52d0-4eb8-97ba-ed6cbaaff9ea",
  "requestedAt": "1582729783",
  "projectId": "BenTest12020-02-26",
  "roleId": "projectConsultant",
  "projectName": "Ben Test 1",
  "requestedByUser": "1d28cb63-d052-442a-ba82-4943b3ffe62f"
}

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

    return(
      <div id="test-page">
        <div className="center-container">
          <ProjectInvitationTile requestDetails={details}/>
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
