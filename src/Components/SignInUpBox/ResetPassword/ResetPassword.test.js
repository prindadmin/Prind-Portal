
import { shallow, mount } from 'enzyme';
import Component from './ResetPassword';
import * as States from '../../../States'
import * as Endpoints from '../../../Data/Endpoints'
import ReactGA from 'react-ga';

import CanUseWebP from '../../../Functions/CheckIfWebpSupported'
jest.mock('../../../Functions/CheckIfWebpSupported')


it('Should render', () => {
  ReactGA.initialize('dummy', { testMode: true });
  const mockToggleVisibleForm = jest.fn()
  const mockSetNewPassword = jest.fn()
  const mockHistoryPush = jest.fn()
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    setNewPassword: mockSetNewPassword,
    history: {
      push: mockHistoryPush,
    },
    location: {
      search: "client_id=fbss4knsc8gmgct526ci8kp3a&user_name=892107a6-b223-4774-8dff-0b6fe5414ffe&confirmation_code=587828",
      pathname: "reset-password?",
    }
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('Should render with webp', () => {
  CanUseWebP.mockReturnValue(true)
  ReactGA.initialize('dummy', { testMode: true });
  const mockToggleVisibleForm = jest.fn()
  const mockSetNewPassword = jest.fn()
  const mockHistoryPush = jest.fn()
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    setNewPassword: mockSetNewPassword,
    history: {
      push: mockHistoryPush,
    },
    location: {
      search: "client_id=fbss4knsc8gmgct526ci8kp3a&user_name=892107a6-b223-4774-8dff-0b6fe5414ffe&confirmation_code=587828",
      pathname: "reset-password?",
    }
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('Submit password change', () => {
  ReactGA.initialize('dummy', { testMode: true });
  const mockToggleVisibleForm = jest.fn()
  const mockSetNewPassword = jest.fn()
  const mockHistoryPush = jest.fn()
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    setNewPassword: mockSetNewPassword,
    history: {
      push: mockHistoryPush,
    },
    location: {
      search: "client_id=fbss4knsc8gmgct526ci8kp3a&user_name=892107a6-b223-4774-8dff-0b6fe5414ffe&confirmation_code=587828",
      pathname: "reset-password",
    }
  }
  const component = shallow(<Component {...props} />);
  component.find('#password').simulate('change', {target: {name: 'password', value: 'Password123!'}})
  component.find('#confirmPassword').simulate('change', {target: {name: 'confirmPassword', value: 'Password123!'}})
  component.find('#submit').simulate('click', { preventDefault: () => {}} )
  expect(mockSetNewPassword).toHaveBeenCalledWith(
    {
      password: "Password123!",
      client_id: "fbss4knsc8gmgct526ci8kp3a",
      user_name: "892107a6-b223-4774-8dff-0b6fe5414ffe",
      confirmation_code: "587828"
    },
    expect.any(Function),
    expect.any(Function)
  );
  expect(component).toMatchSnapshot();
});


it('Submit password change but passwords don\'t match', () => {
  ReactGA.initialize('dummy', { testMode: true });
  const mockToggleVisibleForm = jest.fn()
  const mockSetNewPassword = jest.fn()
  const mockHistoryPush = jest.fn()
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    setNewPassword: mockSetNewPassword,
    history: {
      push: mockHistoryPush,
    },
    location: {
      search: "client_id=fbss4knsc8gmgct526ci8kp3a&user_name=892107a6-b223-4774-8dff-0b6fe5414ffe&confirmation_code=587828",
      pathname: "reset-password",
    }
  }
  const component = shallow(<Component {...props} />);
  component.find('#password').simulate('change', {target: {name: 'password', value: 'These do'}})
  component.find('#confirmPassword').simulate('change', {target: {name: 'confirmPassword', value: 'not match'}})
  component.find('#submit').simulate('click', { preventDefault: () => {}} )
  expect(component).toMatchSnapshot();
});


it('Submit password change and respond with success', () => {
  ReactGA.initialize('dummy', { testMode: true });
  const mockToggleVisibleForm = jest.fn()
  const mockSetNewPassword = jest.fn((values, resolve, reject) => { resolve() })
  const mockHistoryPush = jest.fn()
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    setNewPassword: mockSetNewPassword,
    history: {
      push: mockHistoryPush,
    },
    location: {
      search: "client_id=fbss4knsc8gmgct526ci8kp3a&user_name=892107a6-b223-4774-8dff-0b6fe5414ffe&confirmation_code=587828",
      pathname: "reset-password",
    }
  }
  const component = shallow(<Component {...props} />);
  component.find('#password').simulate('change', {target: {name: 'password', value: 'Password123!'}})
  component.find('#confirmPassword').simulate('change', {target: {name: 'confirmPassword', value: 'Password123!'}})
  component.find('#submit').simulate('click', { preventDefault: () => {}} )
  expect(mockSetNewPassword).toHaveBeenCalledWith(
    {
      password: "Password123!",
      client_id: "fbss4knsc8gmgct526ci8kp3a",
      user_name: "892107a6-b223-4774-8dff-0b6fe5414ffe",
      confirmation_code: "587828"
    },
    expect.any(Function),
    expect.any(Function)
  );
  expect(component).toMatchSnapshot();
});


it('Submit password change and respond with failure', () => {
  ReactGA.initialize('dummy', { testMode: true });
  const mockToggleVisibleForm = jest.fn()
  const mockSetNewPassword = jest.fn((values, resolve, reject) => { reject({ result: { message: "failed"} }) } )
  const mockHistoryPush = jest.fn()
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    setNewPassword: mockSetNewPassword,
    history: {
      push: mockHistoryPush,
    },
    location: {
      search: "client_id=fbss4knsc8gmgct526ci8kp3a&user_name=892107a6-b223-4774-8dff-0b6fe5414ffe&confirmation_code=587828",
      pathname: "reset-password",
    }
  }
  const component = shallow(<Component {...props} />);
  component.find('#password').simulate('change', {target: {name: 'password', value: 'Password123!'}})
  component.find('#confirmPassword').simulate('change', {target: {name: 'confirmPassword', value: 'Password123!'}})
  component.find('#submit').simulate('click', { preventDefault: () => {}} )
  expect(mockSetNewPassword).toHaveBeenCalledWith(
    {
      password: "Password123!",
      client_id: "fbss4knsc8gmgct526ci8kp3a",
      user_name: "892107a6-b223-4774-8dff-0b6fe5414ffe",
      confirmation_code: "587828"
    },
    expect.any(Function),
    expect.any(Function)
  );
  expect(component).toMatchSnapshot();
});


it('Click form to get test coverage', () => {
  ReactGA.initialize('dummy', { testMode: true });
  const mockToggleVisibleForm = jest.fn()
  const mockSetNewPassword = jest.fn((values, resolve, reject) => { reject({ result: { message: "failed"} }) } )
  const mockHistoryPush = jest.fn()
  const mockPreventDefault = jest.fn()
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    setNewPassword: mockSetNewPassword,
    history: {
      push: mockHistoryPush,
    },
    location: {
      search: "client_id=fbss4knsc8gmgct526ci8kp3a&user_name=892107a6-b223-4774-8dff-0b6fe5414ffe&confirmation_code=587828",
      pathname: "reset-password",
    }
  }
  const component = shallow(<Component {...props} />);
  component.find('#reset-password-form').simulate('submit', { preventDefault: mockPreventDefault } )
  expect(mockPreventDefault).toHaveBeenCalled()
});


it('Click sign in form text', () => {
  ReactGA.initialize('dummy', { testMode: true });
  const mockToggleVisibleForm = jest.fn()
  const mockSetNewPassword = jest.fn((values, resolve, reject) => { resolve() })
  const mockHistoryPush = jest.fn()
  const mockPreventDefault = jest.fn()
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    setNewPassword: mockSetNewPassword,
    history: {
      push: mockHistoryPush,
    },
    location: {
      search: "client_id=fbss4knsc8gmgct526ci8kp3a&user_name=892107a6-b223-4774-8dff-0b6fe5414ffe&confirmation_code=587828",
      pathname: "reset-password",
    }
  }
  const component = shallow(<Component {...props} />);
  component.find('#password').simulate('change', {target: {name: 'password', value: 'Password123!'}})
  component.find('#confirmPassword').simulate('change', {target: {name: 'confirmPassword', value: 'Password123!'}})
  component.find('#submit').simulate('click', { preventDefault: () => {}} )
  expect(mockSetNewPassword).toHaveBeenCalledWith(
    {
      password: "Password123!",
      client_id: "fbss4knsc8gmgct526ci8kp3a",
      user_name: "892107a6-b223-4774-8dff-0b6fe5414ffe",
      confirmation_code: "587828"
    },
    expect.any(Function),
    expect.any(Function)
  );
  component.find('#submit').simulate('click', { preventDefault: mockPreventDefault } )
  expect(mockHistoryPush).toHaveBeenCalledWith(Endpoints.SIGNINPAGE)
});
