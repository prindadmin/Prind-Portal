import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';

const PROJECTTEMPLATES = [
  {
    id: "ukOnly",
    name: "UK Templates",
    templates: [
      {
        id: "cdm2015",
        name: "Construction Design and Management (2015)",
        selected: true,
        current: true
      },
      {
        id: "approvedDocumentB2020",
        name: "Approved Document B (2019 with 2020 changes)",
        selected: true,
        current: false
      },
      {
        id: "governmentSoftLandings2016",
        name: "Government Soft Landings (2016)",
        selected: false,
        current: true
      }
    ]
  },
  {
    id: "international",
    name: "International Templates",
    templates: [
      {
        id: "icms2019",
        name: "International Construction Measurement Standards (2019)",
        selected: false,
        current: true
      }
    ]
  }
]

async function FetchProjectDetails(projectId) {

  // Fixed values for the API request
  const apiName = process.env.REACT_APP_API_NAME

  // Build path for request
  const path = `/project/${projectId}`

  // Get the current session and the identity jwtToken
  const identityToken = await Auth.currentSession()
    .then(credentials => {
        return credentials.idToken.jwtToken
      })

  return new Promise((resolve, reject) => {

    // Create the header for the request
    const myInit = {
        headers: {
          Authorization: identityToken
        },
        response: false,
    }

    // Send the request
    API.get(apiName, path, myInit)
      .then(response => {
        if (response.Error) {
          reject(response)
          return;
        }

        // TODO: Remove this once feature is implemented in back end
        if (process.env.REACT_APP_FEATURE_0001 ===  "True") {
          var modifiedResponse = JSON.parse(JSON.stringify(response))
          modifiedResponse.body.projectTemplates = PROJECTTEMPLATES
          resolve(modifiedResponse)
          return
        }

        resolve(response)
      })
      .catch(error => {
        console.log(error.response);
        reject(error)
     })
   })
}

export default FetchProjectDetails
