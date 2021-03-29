
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

it('addMemberToProject - Success', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(expectedResponse)
  const actualResponse = await Dispatchers.addMemberToProject("1234", {
    username: 'aaaa-aaaa-aaaaaaaa-aaaa-aaaa'
  })
  expect(actualResponse).toEqual(expectedResponse);
})


it('removeMemberFromProject - Success', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(expectedResponse)
  const actualResponse = await Dispatchers.removeMemberFromProject("1234", {
    username: 'aaaa-aaaa-aaaaaaaa-aaaa-aaaa'
  })
  expect(actualResponse).toEqual(expectedResponse);
})


it('getRoles - Success', async () => {
  const expectedResponse = {
    statusCode: 200,
    body: [
      {
        roleId: "1",
        roleName: "Project Manager"
      },
      {
        roleId: "2",
        roleName: "Client"
      }
    ]
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(expectedResponse)
  const actualResponse = await Dispatchers.getRoles("1234")
  expect(actualResponse).toEqual(expectedResponse);
})
