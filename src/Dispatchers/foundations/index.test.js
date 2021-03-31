
import * as Dispatchers from './index'
import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';
jest.mock('@aws-amplify/api')
jest.mock('aws-amplify')

beforeAll(() => {
  process.env = Object.assign(process.env, {
    REACT_APP_API_NAME: "PrinDFrontEndAPI",
  });
})

const authReturn = {
  idToken: {
    jwtToken: "id-token-1234"
  }
}

const serverErrorReturn = {
  statusCode: 400,
  Error: {
    ErrorMessage: "Some user presentable error text",
    ErrorCode: "ERROR_CODE",
    ErrorNumber: "0001"
  }
}

const connectionFailureReturn = new Error({
  statusCode: 400,
  message: "Cannot connect to server"
});

it('Foundations Dispatchers - SelfSignFile - Success', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(expectedResponse)
  const actualResponse = await Dispatchers.selfSignFile("1234", "Design", 1)
  expect(API.post).toHaveBeenCalledWith(
    "PrinDFrontEndAPI",
    "/document/1234/Design/1/sign-on-foundations",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      response: false,
    }
  )
  expect(actualResponse).toEqual(expectedResponse);
})


it('Foundations Dispatchers - SelfSignFile - Server Error', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(serverErrorReturn)
  try {
    const actualResponse = await Dispatchers.selfSignFile("1234", "Design", 1)
  } catch(error) {
    expect(error).toEqual(serverErrorReturn);
  }
})

/*
// TODO: Create connection failure tests
it('Foundations Dispatchers - SelfSignFile - Connection Failure', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(connectionFailureReturn)
  try {
    const actualResponse = await Dispatchers.selfSignFile("1234", "Design", 1)
  } catch(error) {
    expect(error).toEqual(connectionFailureReturn);
  }
})
*/

it('Foundations Dispatchers - RejectSignatureRequest - Success', async () => {
  const expectedResponse = {
    statusCode: 200,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(expectedResponse)
  const actualResponse = await Dispatchers.rejectSignatureRequest({
    projectID: "1234",
    pageName: "Design",
    fieldID: 1
  })
  expect(actualResponse).toEqual(expectedResponse);
})


it('Foundations Dispatchers - RejectSignatureRequest - Server Error', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(serverErrorReturn)
  try {
    const actualResponse = await Dispatchers.rejectSignatureRequest({
      projectID: "1234",
      pageName: "Design",
      fieldID: 1
    })
  } catch(error) {
    expect(error).toEqual(serverErrorReturn);
  }
})

/*
it('Foundations Dispatchers - RejectSignatureRequest - Connection Failure', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(connectionFailureReturn)
  try {
    const actualResponse = await Dispatchers.rejectSignatureRequest({
      projectID: "1234",
      pageName: "Design",
      fieldID: 1
    })
  } catch(error) {
    expect(error).toEqual(connectionFailureReturn);
  }
})
*/
