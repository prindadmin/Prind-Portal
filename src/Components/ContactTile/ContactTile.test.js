
import { shallow } from 'enzyme';
import Component from './ContactTile'
import ReactGA from 'react-ga';

var props;

beforeAll(() => {
  process.env = Object.assign(process.env, {
    REACT_APP_AWS_S3_USER_AVATAR_ENDPOINT: "https://prind-portal-user-profiles-dev.s3-eu-west-1.amazonaws.com/profile-avatar",
    REACT_APP_FUNCTIONALITY_USER_ACCREDITATIONS_LIST_V1: "True"
  });
})

beforeEach(() => {
  ReactGA.initialize('dummy', { testMode: true });
  props = {
    user: {
      username: "aaaa-aaaaaaaa-aaaa-aaaa-aaaa"
    },
    projects: {
      accessibleProjects: {
        projectCreator: [],
        projectRole: []
      },
      chosenProject: {
        projectName: "Test Project 1",
        projectId: "TestProjectID",
        projectType: "CDM2015",
      },
      memberList: {
        confirmed: [
          {
            username: "aaaa-aaaaaaaa-aaaa-aaaa-aaaa",
            roleID: 'creator',
          }
        ]
      },
      downloadURL: "",
      fileDetails: {},
      fetching: false,
      error: null,
    },
    memberDetails: {
      username: "bbbb-bbbbbbbb-bbbb-bbbb-bbbb",
      emailAddress: "testy.mctesterson@prind.tech",
      firstName: "Testy",
      lastName: "McTesterson",
    },
    onMemberRemove: jest.fn(),
    removeMember: jest.fn(),
    confirmed: false
  };
});

it('ContactTile - Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('ContactTile - Should render with confirmed user', () => {
  props.confirmed = true
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('ContactTile - Should render without username', () => {
  props.memberDetails.username = undefined
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('ContactTile - Should render without first and last name', () => {
  props.memberDetails.firstName = undefined
  props.memberDetails.lastName = undefined
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

/*
it('ContactTile - Should render then unmount', () => {
  const component = shallow(<Component {...props} />);
  component.instance().componentWillUnmount()
  expect(component.state('loadingImage')).toEqual(expect.any(Function))
});
*/

it('ContactTile - Should remove member successfully', () => {
  const mockRemoveMember = jest.fn((projectId, username, resolve, reject) => {
    resolve()
  })
  const mockOnRemoveMember = jest.fn()
  props.removeMember = mockRemoveMember
  props.onMemberRemove = mockOnRemoveMember

  const component = shallow(<Component {...props} />);
  const removeButton = component.find('#remove-member-button')
  removeButton.simulate('click')
  expect(mockRemoveMember).toHaveBeenCalledTimes(1)
  expect(mockRemoveMember).toHaveBeenCalledWith("TestProjectID", "bbbb-bbbbbbbb-bbbb-bbbb-bbbb", expect.any(Function), expect.any(Function))
  expect(mockOnRemoveMember).toHaveBeenCalledTimes(1)
});

it('ContactTile - Should remove member failed', () => {
  const mockRemoveMember = jest.fn((projectId, username, resolve, reject) => {
    reject()
  })
  const mockOnRemoveMember = jest.fn()
  props.removeMember = mockRemoveMember
  props.onMemberRemove = mockOnRemoveMember

  const component = shallow(<Component {...props} />);
  const removeButton = component.find('#remove-member-button')
  removeButton.simulate('click')
  expect(mockRemoveMember).toHaveBeenCalledTimes(1)
  expect(mockRemoveMember).toHaveBeenCalledWith("TestProjectID", "bbbb-bbbbbbbb-bbbb-bbbb-bbbb", expect.any(Function), expect.any(Function))
  expect(mockOnRemoveMember).toHaveBeenCalledTimes(0)
});

it('ContactTile - Should click contact tile and show details', () => {
  const component = shallow(<Component {...props} />);
  const userTile = component.find('#contact-tile')
  userTile.simulate('click', { stopPropagation: jest.fn() })
  expect(component.state('showUserDetailsPopover')).toEqual(true)
});
