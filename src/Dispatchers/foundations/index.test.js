
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

it('SelfSignFile - Success', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(expectedResponse)
  const actualResponse = await Dispatchers.selfSignFile("1234", "Design", 1)
  expect(actualResponse).toEqual(expectedResponse);
})


it('RejectSignatureRequest - Success', async () => {
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
