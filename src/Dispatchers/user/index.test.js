
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


it('User Dispatchers - Success - getS3ProjectFileUploadToken', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.getS3ProjectFileUploadToken("123", "design")
  expect(API.get).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/project/123/page/design/get-sts",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('Projects Dispatchers - Server Error - getS3ProjectFileUploadToken', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.getS3ProjectFileUploadToken("123", "design")
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('User Dispatchers - Success - getS3UserFileUploadToken', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.getS3UserFileUploadToken("file")
  expect(API.get).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/user/get-sts/file",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('User Dispatchers - Server Error - getS3UserFileUploadToken', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.getS3UserFileUploadToken("file")
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('User Dispatchers - Success - getUserDetails', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.getUserDetails()
  expect(API.get).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/user/profile",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('User Dispatchers - Server Error - getUserDetails', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.getUserDetails()
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('User Dispatchers - Success - getProjectInvitations', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.getProjectInvitations()
  expect(API.get).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/user/get-project-invitations",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('User Dispatchers - Server Error - getProjectInvitations', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.getProjectInvitations()
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('User Dispatchers - Success - respondToProjectInvitation', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.respondToProjectInvitation("123", true)
  expect(API.post).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/project/123/respond-to-invitation",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      body: {
        accepted: true
      },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('User Dispatchers - Server Error - respondToProjectInvitation', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.respondToProjectInvitation("123", true)
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('User Dispatchers - Success - getSignatureRequests', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.getSignatureRequests()
  expect(API.get).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/user/get-signature-requests",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('User Dispatchers - Server Error - getSignatureRequests', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.getSignatureRequests()
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('User Dispatchers - Success - respondToSignatureRequest', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.respondToSignatureRequest({
    projectID: "123",
    pageName: "design",
    fieldID: 1,
    response: false
  })
  expect(API.post).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/project/123/design/1/sign",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      body: {
        accepted: false
      },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('User Dispatchers - Server Error - respondToSignatureRequest', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.respondToSignatureRequest({
      projectID: "123",
      pageName: "design",
      fieldID: 1,
      response: false
    })
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('User Dispatchers - Success - getHistory', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.getHistory()
  expect(API.get).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/user/history",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('User Dispatchers - Server Error - getHistory', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.getHistory()
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})
