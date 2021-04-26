
import * as ProcoreFunctions from './procore'
import * as Actions from '../Actions'
import * as Endpoints from '../Data/Endpoints'

let defaultState = {
  fetching: false,
  companyId: "28592",
  companyName: "",
  projectId: "1234",
  projectName: "",
  folders: [],
  files: [],
  error: {},
  searchTerm: ""
}

it('init', () => {
  const returnValue = {
    type: Actions.PROCORE_INIT,
    payload: defaultState
  }
  const result = ProcoreFunctions.init()
  expect(result).toEqual(returnValue);
});


it('getProjectFilesAndFolders', () => {
  const payload = {
    companyId: "12345",
    projectId: "12345"
  }
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROCORE_GET_PROJECT_FILES_AND_FOLDERS,
    payload: {
      payload,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = ProcoreFunctions.getProjectFilesAndFolders(payload, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('test reducer handler with set state action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.PROCORE_SET_STATE,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = ProcoreFunctions.reducer({}, action)
  expect(result).toEqual(action.payload);
});
