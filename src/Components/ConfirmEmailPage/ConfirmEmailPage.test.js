
import { shallow } from 'enzyme';
import Component from './ConfirmEmailPage'
import ReactGA from 'react-ga';

var props;

beforeEach(() => {
  ReactGA.initialize('dummy', { testMode: true });
  props = {
    confirmUser: jest.fn(),
    location: {
      search: "?user_name=1234567890&confirmation_code=abcdef",
      pathname: '/confirm-email'
    },
    history: {
      push: jest.fn()
    }
  };
});

it('ConfirmEmailPage - Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('ConfirmEmailPage - Should render but no search terms were provided', () => {
  props.location.search = ""
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('ConfirmEmailPage - Should confirm user', () => {
  const mockConfirmUser = jest.fn((parameters, resolve, reject) => {
    resolve()
  })
  props.confirmUser = mockConfirmUser
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('ConfirmEmailPage - Should reject confirmation of user', () => {
  const mockConfirmUser = jest.fn((parameters, resolve, reject) => {
    reject()
  })
  props.confirmUser = mockConfirmUser
  const component = shallow(<Component {...props} />);
  expect(mockConfirmUser).toHaveBeenCalledWith({ user_name: "1234567890", confirmation_code: "abcdef" }, expect.any(Function), expect.any(Function))
  expect(mockConfirmUser).toHaveBeenCalledTimes(1)
  expect(component).toMatchSnapshot();
});

it('ConfirmEmailPage - Should reject confirmation of user then retry', () => {
  const mockConfirmUser = jest.fn((parameters, resolve, reject) => {
    reject()
  })
  props.confirmUser = mockConfirmUser
  const component = shallow(<Component {...props} />);
  expect(mockConfirmUser).toHaveBeenCalledWith({ user_name: "1234567890", confirmation_code: "abcdef" }, expect.any(Function), expect.any(Function))
  expect(mockConfirmUser).toHaveBeenCalledTimes(1)
  const retryButton = component.find('#retry-button')
  retryButton.simulate('click')
  expect(mockConfirmUser).toHaveBeenCalledTimes(2)
  expect(component).toMatchSnapshot();
});
