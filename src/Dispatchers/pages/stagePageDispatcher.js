import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';

// Fixed values for the API request
const apiName = process.env.REACT_APP_API_NAME

const testPageDataFetch = [
  {
    "id": "TestStandard1v1",
    "name": "CDM 2015",
    "fields": [
      {
        "default": true,
        "editable": true,
        "type": "file",
        "title": "Title for Test Standard 1 Field 1",
        "description": "Description for Test Standard 1 Field 1",
        "id": "TestStandard1v1_1",
        "fileDetails": []
      },
      {
        "default": true,
        "editable": true,
        "type": "file",
        "title": "Title for Test Standard 1 Field 2",
        "description": "Description for Test Standard 1 Field 2",
        "id": "TestStandard1v1_2",
        "fileDetails": []
      }
    ]
  },
  {
    "id": "TestStandard2v1",
    "name": "NESMA Process",
    "fields": [
      {
        "default": true,
        "editable": true,
        "type": "file",
        "title": "Title for Test Standard 2 Field 1",
        "description": "Description for Test Standard 2 Field 1",
        "id": "TestStandard2v1_1",
        "fileDetails": []
      },
      {
        "default": true,
        "editable": true,
        "type": "file",
        "title": "Title for Test Standard 2 Field 2",
        "description": "Description for Test Standard 2 Field 2",
        "id": "TestStandard2v1_2",
        "fileDetails": []
      }
    ]
  },
  {
    "id": "CustomFields",
    "name": "Custom Fields",
    "fields": [
      {
        "description": "Description for Custom Field 1",
        "default": false,
        "editable": true,
        "fieldDetails": {},
        "id": "CustomField_1",
        "title": "File field",
        "type": "file",
        "fileDetails": []
      },
      {
        "description": "Description for Custom Field 2",
        "default": false,
        "editable": true,
        "fieldDetails": {},
        "id": "CustomField_2",
        "title": "File field",
        "type": "file",
        "fileDetails": []
      }
    ]
  }
]



async function StagePageFetch(projectId, pageName) {

  // Build path for request
  const path = `/project/${projectId}/page/${pageName}`

  // Get the current session and the identity jwtToken
  const identityToken = await Auth.currentSession()
    .then(credentials => {
        return credentials.idToken.jwtToken
      })

  return new Promise((resolve, reject) => {

    // If this is the test page, show the test page data (hard coded)
    if (pageName === "test") {
      console.log("Returning fake data for the test page")
      resolve({
        body: testPageDataFetch
      })
      return
    }

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
        resolve(response)
      })
      .catch(error => {
        console.log(error.response);
        reject(error)
     })
   })
}

export default StagePageFetch
