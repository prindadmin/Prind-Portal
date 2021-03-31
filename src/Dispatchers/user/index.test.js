
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
