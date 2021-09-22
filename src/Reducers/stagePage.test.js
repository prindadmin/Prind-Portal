
import * as Functions from './stagePage'
import * as Actions from '../Actions'
import * as States from '../States'
import * as Strings from '../Data/Strings'

const defaultPageState = {
  fetching: false,
  fields: [],
  error: null,
}

let defaultState = {
  inception: {
    ...defaultPageState
  },
  feasibility: {
    ...defaultPageState
  },
  design: {
    ...defaultPageState
  },
  tender: {
    ...defaultPageState
  },
  construction: {
    ...defaultPageState
  },
  handover: {
    ...defaultPageState
  },
  occupation: {
    ...defaultPageState
  },
  refurbishment: {
    ...defaultPageState
  },
  test: {
    ...defaultPageState
  },
}


it('Stage Page Reducer - init ', () => {
  const returnValue = {
    type: Actions.PAGE_INIT,
    payload: defaultState
  }
  const result = Functions.init()
  expect(result).toEqual(returnValue);
});


it('Stage Page Reducer - getPageContent ', () => {
  const projectID = "123"
  const pageName = "design"
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PAGE_GET_CONTENT_REQUESTED,
    payload: {
      projectID,
      pageName,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.getPageContent("123", "design", mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('test reducer handler with get content request action', () => {
  const action = {
    type: Actions.PAGE_GET_CONTENT_REQUESTED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with init action', () => {
  const action = {
    type: Actions.PAGE_INIT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with set state action', () => {
  const action = {
    type: Actions.PAGE_SET_STATE,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get content request action', () => {
  const action = {
    type: Actions.PAGE_GET_CONTENT_REQUESTED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});
