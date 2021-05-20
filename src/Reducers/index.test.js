import { createStore } from 'redux';
import reducers from './index'
import * as AuthFunctions from './auth';
import * as FoundationsFunctions from './foundations';
import * as MemberFunctions from './members';
import * as ProjectsFunctions from './projects';
import * as PageContentFunctions from './stagePage';
import * as UserFunctions from './user';
import * as Endpoints from '../Data/Endpoints'
import * as Strings from '../Data/Strings'
import * as States from '../States'

const defaultPageState = {
  fetching: false,
  fields: [],
  error: null,
}


it('does combines reducers', () => {

  const store = createStore(reducers);
  const auth = AuthFunctions.init();
  const foundations = FoundationsFunctions.init();
  const member = MemberFunctions.init();
  const projects = ProjectsFunctions.init();
  const pageContent = PageContentFunctions.init();
  const user = UserFunctions.init();


  store.dispatch(auth);
  store.dispatch(foundations);
  store.dispatch(member);
  store.dispatch(projects);
  store.dispatch(pageContent);
  store.dispatch(user);

  const actualAuth = store.getState().auth;
  const expectedAuth = {
    isSignedIn: States.AUTH_UNKNOWN,
    isConfirmed: States.AUTH_UNKNOWN,
    hasSignedUp: States.AUTH_UNKNOWN,
    hasSentCode: States.AUTH_UNKNOWN,
    hasChangedPassword: States.AUTH_UNKNOWN,
    passwordResetRequired: States.AUTH_UNKNOWN
  };

  const actualFoundations = store.getState().foundations;
  const expectedFoundations = {
    fetching: false,
  };


  const actualMembers = store.getState().members;
  const expectedMembers = {
    fetching: false,
    currentMember: {
      username: null,
      accreditations: []
    },
    roles: [],
  };


  const actualProjects = store.getState().projects;
  const expectedProjects = {
    accessibleProjects: {
      projectCreator: [],
      projectRole: []
    },
    chosenProject: {
      projectName: Strings.NO_PROJECT_SELECTED,
      projectId: "",
      projectType: ""
    },
    memberList: [],
    downloadURL: "",
    fileDetails: {},
    fetching: false,
    error: null,
  };


  const actualStageContent = store.getState().pageContent;
  const expectedStageContent = {
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
  };


  const actualUser = store.getState().user;
  const expectedUser = {
    fetching: false,
    details: {},
    history: {},
    projectInvitations: [],
    signatureRequests: [],
    projectS3Token: {},
    userS3Token: {},
    currentRoute: Endpoints.DEFAULTLOGGEDINPAGE,
  };


  expect(actualAuth).toEqual(expectedAuth);
  expect(actualFoundations).toEqual(expectedFoundations);
  expect(actualMembers).toEqual(expectedMembers);
  expect(actualProjects).toEqual(expectedProjects);
  expect(actualStageContent).toEqual(expectedStageContent);
  expect(actualUser).toEqual(expectedUser);
}); 
