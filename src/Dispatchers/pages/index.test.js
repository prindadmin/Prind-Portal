
import * as Dispatchers from './index'
import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';
jest.mock('@aws-amplify/api')
jest.mock('aws-amplify')

// TODO: Add toHaveBeenCalledWith to all the mocked Auth calls
// TODO: Test all the error catchers as well

const authReturn = {
  idToken: {
    jwtToken: "id-token-1234"
  }
}

it('getPageContent - Success', async () => {
  const expectedResponse = {
    statusCode: 200,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(expectedResponse)
  const actualResponse = await Dispatchers.getPageContent("1234", "design")
  expect(actualResponse).toEqual(expectedResponse);
})

it('getPageContent - Error on server', async () => {
  const expectedResponse = {
    statusCode: 400,
    Error: {
      ErrorCode: "0001",
      message: "Whoops"
    }
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(expectedResponse)
  try {
    const actualResponse = await Dispatchers.getPageContent("1234", "design")
  } catch (e) {
    expect(e).toEqual(expectedResponse);
  }
})
