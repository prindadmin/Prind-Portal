import React from 'react';
import { shallow } from 'enzyme';

import Component from './ProjectTypeSelector'

it('Should render', () => {
  const props = {
    closePopup: function() {},
    history: {
      push: function() {},
    },
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('Should create new project', () => {
  const mockClosePopup = jest.fn()
  const mockHistoryPush = jest.fn()
  const props = {
    closePopup: mockClosePopup,
    history: {
      push: mockHistoryPush,
    },
  };
  const component = shallow(<Component {...props} />);
  component.find('#DHSFProject').simulate('select', 'DHSFProject')
  expect(mockHistoryPush).toHaveBeenCalled()
  expect(mockClosePopup).toHaveBeenCalled()
});
