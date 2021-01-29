import React from 'react';
import { shallow } from 'enzyme';

import ProjectTypeTile from './ProjectTypeTile'

it('Should render', () => {
  const props = {
      id: "1",
      icon: "home",
      name: "Name 1234",
      description: "description 1234",
      onSelect: function() {}
  }
  const component = shallow(<ProjectTypeTile {...props} />);
  expect(component).toMatchSnapshot();
});


it('Should attempt to create project', () => {
  const mockFunction = jest.fn();
  const props = {
      id: "1",
      icon: "home",
      name: "Name 1234",
      description: "description 1234",
      onSelect: mockFunction
  }
  const component = shallow(<ProjectTypeTile {...props} />);
  const tile = component.find('div[id="project-type-tile"]')
  tile.simulate('click');
  expect(mockFunction).toHaveBeenCalledWith("1");
});
