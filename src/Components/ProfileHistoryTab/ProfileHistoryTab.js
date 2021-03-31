import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as Strings from '../../Data/Strings'

import {
  ProjectCreate,
  ProjectJoin,
  DocumentUpload,
  DocumentSigned,
} from './elements'

export class ProfileHistoryTab extends Component {
  static propTypes = {
    user: PropTypes.shape({
      history: PropTypes.shape({
        documentVersions: PropTypes.arrayOf(
          PropTypes.shape({
            type: PropTypes.string.isRequired,
            projectName: PropTypes.string.isRequired,
            dateTime: PropTypes.string,
            signedAt: PropTypes.string,
          })
        ),
        projects: PropTypes.shape({
          projectCreator: PropTypes.arrayOf(
            PropTypes.shape({
              type: PropTypes.string.isRequired,
              projectName: PropTypes.string.isRequired,
              dateTime: PropTypes.string.isRequired
            })
          ).isRequired,
          projectRole: PropTypes.arrayOf(
            PropTypes.shape({
              type: PropTypes.string.isRequired,
              projectName: PropTypes.string.isRequired,
              dateTime: PropTypes.string.isRequired
            })
          ).isRequired
        }),
        signedDocuments: PropTypes.arrayOf(
          PropTypes.shape({
            type: PropTypes.string.isRequired,
            filename: PropTypes.string.isRequired,
            projectName: PropTypes.string.isRequired,
            signedAt: PropTypes.string,
            dateTime: PropTypes.string
          })
        ),
      })
    }).isRequired,
  }

  orderHistoryChronologically = () => {

    const { history } = this.props.user

    var orderedHistory = []

    // If the history fetch worked for projects
    if (history.projects !== undefined) {

      // Add the projects the user created
      orderedHistory = orderedHistory.concat(history.projects.projectCreator.map((projectDetails) => {
        var updatedProjectDetails = projectDetails

        updatedProjectDetails.type = "PROJECT_CREATED"

        return updatedProjectDetails
      }))

      // Add the projects the user joined
      orderedHistory = orderedHistory.concat(history.projects.projectRole.map((projectDetails) => {
        var updatedProjectDetails = projectDetails

        updatedProjectDetails.type = "PROJECT_JOINED"

        return updatedProjectDetails
      }))
    }


    // If the history fetch worked for signatures
    if (history.signedDocuments !== undefined) {

      // Add the projects the user created
      orderedHistory = orderedHistory.concat(history.signedDocuments.map((details) => {
        var updatedDetails = details

        updatedDetails.type = "DOCUMENT_SIGNED"

        if (details.dateTime === undefined) {
          updatedDetails.dateTime = details.signedAt
        }

        return updatedDetails
      }))
    }


    // If the history fetch worked for uploaded documents
    if (history.documentVersions !== undefined) {

      // Add the projects the user created
      orderedHistory = orderedHistory.concat(history.documentVersions.map((details) => {
        var updatedDetails = details

        updatedDetails.type = "DOCUMENT_UPLOADED"

        if (details.dateTime === undefined) {
          updatedDetails.dateTime = details.signedAt
        }

        return updatedDetails
      }))
    }





    return orderedHistory.sort((a,b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()).reverse();

  }



  render() {

    const orderedHistory = this.orderHistoryChronologically()

    return(
      <div className="tab-pane active">
        <div id="history-tab-container">
          <div className="history-list row">
            {
              orderedHistory.length !== 0 ?
              orderedHistory.map((historyEvent, index) => {
                return (
                  <div key={index} className="col-md-12 col-lg-6 col-xl-4">
                    {
                      historyEvent.type === "PROJECT_CREATED" ?
                      <ProjectCreate details={historyEvent} /> :
                      null
                    }
                    {
                      historyEvent.type === "PROJECT_JOINED" ?
                      <ProjectJoin details={historyEvent} /> :
                      null
                    }
                    {
                      historyEvent.type === "DOCUMENT_UPLOADED" ?
                      <DocumentUpload details={historyEvent} /> :
                      null
                    }
                    {
                      historyEvent.type === "DOCUMENT_SIGNED" ?
                      <DocumentSigned details={historyEvent} /> :
                      null
                    }
                  </div>
                )
              }) : Strings.NO_HISTORY_YET
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileHistoryTab
