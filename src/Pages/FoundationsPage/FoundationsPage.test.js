import React from 'react';
import { shallow } from 'enzyme';
import ReactGA from 'react-ga';

import Component from './FoundationsPage'

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
  global.open = jest.fn()
});

it('Foundations Page - Should render', () => {
  const props = {
    location: {
      pathname: "foundations"
    }
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Foundations Page - Should render and click android buttons', () => {
  const props = {
    location: {
      pathname: "foundations"
    }
  };
  const component = shallow(<Component {...props} />);
  const androidButton = component.find('img[alt="Android Logo"]')
  androidButton.simulate('click')
  expect(global.open).toHaveBeenCalledWith("https://play.google.com/store/apps/details?id=com.buildingim.foundations", "_blank")
});

it('Foundations Page - Should render and click iOS buttons', () => {
  const props = {
    location: {
      pathname: "foundations"
    }
  };
  const component = shallow(<Component {...props} />);
  const iosButton = component.find('img[alt="iOS Logo"]')
  iosButton.simulate('click')
  expect(global.open).toHaveBeenCalledWith("https://apps.apple.com/us/app/foundations/id1499177355#?platform=iphone", "_blank")
});
