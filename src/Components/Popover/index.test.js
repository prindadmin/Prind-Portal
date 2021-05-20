
import Component from './index'
import { mount } from 'enzyme';

import { JSDOM } from "jsdom"

var props;

beforeAll(() => {
  document.body.innerHTML =
    '<div id="root">' +
    '</div>' +
    '<div id="popOver">' +
    '</div>';
});

beforeEach(() => {
  props = {
    children: [<div key='1' id='hello-dom' />],
    handleClose: jest.fn()
  }
});

it('Popover - Should render', () => {
  const component = mount(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Popover - Should click container and do nothing', () => {
  const mockStopPropagation = jest.fn()
  const component = mount(<Component {...props} />);
  const container = component.find('#popover-container')
  container.simulate('click', { stopPropagation: mockStopPropagation })
  expect(mockStopPropagation).toHaveBeenCalledTimes(2);
});

it('Popover - Should click greyer and close', () => {
  const mockStopPropagation = jest.fn()
  const component = mount(<Component {...props} />);
  const greyer = component.find('#popover-greyer')
  greyer.simulate('click', { stopPropagation: mockStopPropagation })
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  expect(props.handleClose).toHaveBeenCalledTimes(1);
});
