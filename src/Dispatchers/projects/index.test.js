
import * as Dispatchers from './index'
import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';
jest.mock('@aws-amplify/api')
jest.mock('aws-amplify')

const authReturn = {
  idToken: {
    jwtToken: "id-token-1234"
  }
}

// TODO: Add toHaveBeenCalledWith to all the mocked Auth calls
it('Projects Dispatchers - Success - getAccessibleProjects', async () => {
  const expectedResponse = {
    statusCode: 200,
    body: [
      {
        projectId: "123"
      }
    ]
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.getAccessibleProjects()
  expect(actualResult).toEqual(expectedResponse);
})


it('Projects Dispatchers - Server Fail - getAccessibleProjects', async () => {
  const expectedResponse = {
    statusCode: 400,
    errorMessage: "it broken"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(expectedResponse)
  try {
    const actualResult = await Dispatchers.getAccessibleProjects()
  } catch (error) {
    expect(error).toEqual(expectedResponse);
  }
})
