
import { shallow, mount } from 'enzyme';
import Component from './ForgotPasswordBox';
import * as States from '../../../States'

import * as Functions from '../../../Functions'
//jest.mock('../../../Functions/CheckIfWebpSupported')


it('Should render', () => {
  const mockToggleVisibleForm = jest.fn()
  const mockResetPassword = jest.fn()
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    resetPassword: mockResetPassword,
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('Submit password change', () => {
  const mockToggleVisibleForm = jest.fn()
  const mockResetPassword = jest.fn()
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    resetPassword: mockResetPassword,
  }
  const component = shallow(<Component {...props} />);
  component.find('#email').simulate('change', {target: {name: 'email', value: 'testing@buildingim.com'}})
  component.find('#submit').simulate('click', { preventDefault: () => {}} )
  expect(mockResetPassword).toHaveBeenCalledWith('testing@buildingim.com', expect.any(Function), expect.any(Function))
  expect(component).toMatchSnapshot();
});


it('Submit password change and respond with success', () => {
  const mockToggleVisibleForm = jest.fn()
  const mockResetPassword = jest.fn((emailAddress, resolve, reject) => {
    resolve("success")
  })
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    resetPassword: mockResetPassword,
  }
  const component = shallow(<Component {...props} />);
  component.find('#email').simulate('change', {target: {name: 'email', value: 'testing@buildingim.com'}})
  component.find('#submit').simulate('click', { preventDefault: () => {}} )
  expect(mockResetPassword).toHaveBeenCalledWith('testing@buildingim.com', expect.any(Function), expect.any(Function))
  component.find('#submit').simulate('click', { preventDefault: () => {}} )
  expect(mockToggleVisibleForm).toHaveBeenCalledWith(States.SIGNINFORM)
  expect(component).toMatchSnapshot();
});


it('Submit password change and respond with failure', () => {
  const mockToggleVisibleForm = jest.fn()
  const mockResetPassword = jest.fn((emailAddress, resolve, reject) => {
    reject({ message: "failed" })
  })
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    resetPassword: mockResetPassword,
  }
  const component = shallow(<Component {...props} />);
  component.find('#email').simulate('change', {target: {name: 'email', value: 'testing@buildingim.com'}})
  component.find('#submit').simulate('click', { preventDefault: () => {}} )
  expect(mockResetPassword).toHaveBeenCalledWith('testing@buildingim.com', expect.any(Function), expect.any(Function))
  expect(component).toMatchSnapshot();
});


it('Click form to get test coverage', () => {
  const mockToggleVisibleForm = jest.fn()
  const mockResetPassword = jest.fn()
  const mockPreventDefault = jest.fn()
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    resetPassword: mockResetPassword,
  }
  const component = shallow(<Component {...props} />);
  component.find('#forgot-password-form').simulate('submit', { preventDefault: mockPreventDefault } )
  expect(mockPreventDefault).toHaveBeenCalled()
  expect(component).toMatchSnapshot();
});


it('Click sign in form text', () => {
  const mockToggleVisibleForm = jest.fn()
  const mockResetPassword = jest.fn()
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    resetPassword: mockResetPassword,
  }
  const component = shallow(<Component {...props} />);
  component.find('#sign-in-form-text').simulate('click')
  expect(mockToggleVisibleForm).toHaveBeenCalledWith(States.SIGNINFORM)
  expect(component).toMatchSnapshot();
});

/*
it('Should render without webp', () => {
  const mockToggleVisibleForm = jest.fn()
  const mockResetPassword = jest.fn()
  Functions.checkIfWebpSupported = jest.fn().mockReturnValue(false)
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    resetPassword: mockResetPassword,
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
*/
