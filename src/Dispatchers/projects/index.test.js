
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


it('Projects Dispatchers - Server Error - getAccessibleProjects', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.getAccessibleProjects()
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('Projects Dispatchers - Success - createNewProject', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.createNewProject({ projectId: "123" })
  expect(API.post).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/project/create",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      body: { projectId: "123" },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('Projects Dispatchers - Server Error - createNewProject', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.createNewProject({ projectId: "123" })
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('Projects Dispatchers - Success - updateProjectDetails', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.updateProjectDetails("123", { projectName: "Test Project 1" })
  expect(API.post).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/project/123/update",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      body: { projectName: "Test Project 1" },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('Projects Dispatchers - Server Error - updateProjectDetails', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.updateProjectDetails("123", { projectName: "Test Project 1" })
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('Projects Dispatchers - Success - fetchProjectDetails', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.fetchProjectDetails("123")
  expect(API.get).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/project/123",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('Projects Dispatchers - Server Error - fetchProjectDetails', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.fetchProjectDetails("123")
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('Projects Dispatchers - Success - getCurrentMembers', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.getCurrentMembers("123")
  expect(API.get).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/project/123/members",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('Projects Dispatchers - Server Error - getCurrentMembers', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.getCurrentMembers("123")
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('Projects Dispatchers - Success - uploadFile', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.uploadFile({
    projectID: "123",
    pageName: "design",
    fieldID: 1,
    fileDetails: {
      detail: "test"
    },
    fieldType: "file"
  })
  expect(API.post).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/project/123/design/1",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      body: {
        fieldDetails: {
          tags: [],
          detail: "test"
        },
        type: "file"
      },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('Projects Dispatchers - Server Error - uploadFile', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.uploadFile({
      projectID: "123",
      pageName: "design",
      fieldID: 1,
      fileDetails: {
        detail: "test"
      },
      fieldType: "file"
    })
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('Projects Dispatchers - Success - downloadFile', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.downloadFile({
    projectID: "123",
    pageName: "design",
    fieldID: 1,
    version: "abc"
  })
  expect(API.get).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/project/123/design/1/abc/get-file-url",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('Projects Dispatchers - Server Error - downloadFile', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.get.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.downloadFile({
      projectID: "123",
      pageName: "design",
      fieldID: 1,
      version: "abc"
    })
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('Projects Dispatchers - Success - createField', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.createField({
    projectID: "123",
    pageName: "design",
    fieldDetails: {
      fieldName: "Test"
    }
  })
  expect(API.post).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/project/123/page/design/create-field",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      body: {
        fieldName: "Test"
      },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('Projects Dispatchers - Server Error - createField', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.createField({
      projectID: "123",
      pageName: "design",
      fieldDetails: {
        fieldName: "Test"
      }
    })
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('Projects Dispatchers - Success - updateField', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.updateField({
    projectID: "123",
    pageName: "design",
    fieldID: 1,
    fieldDetails: {
      fieldName: "Test"
    }
  })
  expect(API.post).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/project/123/design/1",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      body: {
        fieldName: "Test"
      },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('Projects Dispatchers - Server Error - updateField', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.updateField({
      projectID: "123",
      pageName: "design",
      fieldID: 1,
      fieldDetails: {
        fieldName: "Test"
      }
    })
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('Projects Dispatchers - Success - requestSignature', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.requestSignature({
    projectID: "123",
    pageName: "design",
    fieldID: 1,
    members: ["abc", "def"]
  })
  expect(API.post).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/project/123/design/1/request-signature",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      body: {
        signingUsernames: ["abc", "def"]
      },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('Projects Dispatchers - Server Error - requestSignature', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.requestSignature({
      projectID: "123",
      pageName: "design",
      fieldID: 1,
      members: ["abc", "def"]
    })
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})


it('Projects Dispatchers - Success - deleteProject', async () => {
  const expectedResponse = {
    statusCode: 201,
    body: "success"
  }
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(expectedResponse)
  const actualResult = await Dispatchers.deleteProject("123")
  expect(API.post).toHaveBeenCalledWith(
    process.env.REACT_APP_API_NAME,
    "/project/123/delete",
    {
      headers: {
        Authorization: "id-token-1234"
      },
      response: false,
    }
  )
  expect(actualResult).toEqual(expectedResponse);
})


it('Projects Dispatchers - Server Error - deleteProject', async () => {
  Auth.currentSession.mockResolvedValue(authReturn)
  API.post.mockResolvedValue(serverErrorReturn)
  try {
    const actualResult = await Dispatchers.deleteProject("123")
  } catch (error) {
    expect(error).toEqual(serverErrorReturn);
  }
})
