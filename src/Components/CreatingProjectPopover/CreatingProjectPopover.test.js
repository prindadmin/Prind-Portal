
import { shallow } from 'enzyme';

import Component from './CreatingProjectPopover'

var props = {}

it('CreatingProjectPopover - should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('CreatingProjectPopover - should render and click clickable elements', () => {
  const component = shallow(<Component {...props} />);
  const mockStopPropagation = jest.fn()

  const greyer = component.find('#popup-greyer')
  greyer.simulate('click', { stopPropagation: mockStopPropagation })
  expect(mockStopPropagation).toHaveBeenCalledTimes(1)

  const container = component.find('.project-creation-popover-container')
  container.simulate('click', { stopPropagation: mockStopPropagation })
  expect(mockStopPropagation).toHaveBeenCalledTimes(2)
});
